/**
 * Fleet home: the enrolled clusters a viewer can see, grouped by tier.
 *
 * The brief names the way this screen goes wrong:
 *
 *   "each cluster shows whether the viewer currently *has* access or merely
 *    visibility. Those are different states and conflating them is the main way
 *    this screen goes wrong."
 *
 * So access and visibility are separate fields here, never one boolean, and the
 * counts report them separately. A single "clusters: 12" that silently mixes
 * the two tells a partner engineer they can act on twelve clusters when they
 * can act on three.
 */
import { isWithin, type TenantNode } from '../ScopeSwitcher/scope'

/**
 * Whether the viewer may act on a cluster, or only knows it exists.
 *
 * `visibility` is not a weaker access — it is the absence of access with the
 * presence of knowledge, which is exactly what a partner has over a customer
 * who has not granted them anything yet.
 */
export type AccessState = 'access' | 'visibility'

export type PackVersion = {
  version: string
  /** Days since this pack was published. Staleness has to be visible. */
  ageDays: number
}

export type ClusterRow = {
  id: string
  name: string
  /** Owning tenant's dotted path. */
  tenantPath: string
  tunnelConnected: boolean
  /** ISO timestamp; only meaningful when the tunnel is down. */
  lastSeen?: string
  health: 'ok' | 'warning' | 'critical' | 'unknown'
  version: string
  fixpack?: string
  knowledgePack: PackVersion
  advisoryPack: PackVersion
  openInsights: number
  activeWatches: number
  access: AccessState
}

/** A customer and their clusters, as one group in the list. */
export type CustomerGroup = {
  tenant: TenantNode
  /** `direct` when Bigstack sells to them, otherwise the partner's name. */
  channel: { kind: 'direct' } | { kind: 'via'; partner: string }
  clusters: ClusterRow[]
}

/** For a vendor viewer, customers are nested under their partner. */
export type PartnerGroup = {
  tenant: TenantNode | null
  customers: CustomerGroup[]
}

/** How stale a pack is allowed to be before the UI must say so. */
export const STALE_PACK_DAYS = 30

export const isPackStale = (pack: PackVersion): boolean =>
  pack.ageDays > STALE_PACK_DAYS

/**
 * The channel a customer is reached through.
 *
 * Direct sales and partner-managed must be distinguishable at a glance on this
 * screen; the brief requires a `direct` or `via NorthWind` tag on every
 * customer row.
 */
export const channelOf = (
  customer: TenantNode,
  tenants: TenantNode[],
): CustomerGroup['channel'] => {
  const segments = customer.path.split('.')
  if (segments.length <= 2) return { kind: 'direct' }
  const parentPath = segments.slice(0, -1).join('.')
  const parent = tenants.find((t) => t.path === parentPath)
  if (!parent || parent.tier !== 'partner') return { kind: 'direct' }
  return { kind: 'via', partner: parent.name }
}

/**
 * Groups the fleet for a viewer.
 *
 * Clusters outside the viewer's subtree are dropped here rather than hidden by
 * the renderer — the same reasoning as the scope switcher: a sibling partner's
 * clusters should never reach the component that draws rows.
 */
export const groupFleet = (
  viewerPath: string,
  tenants: TenantNode[],
  clusters: ClusterRow[],
): PartnerGroup[] => {
  const reachable = clusters.filter((c) => isWithin(c.tenantPath, viewerPath))
  const byPath = new Map(tenants.map((t) => [t.path, t]))

  const customers = new Map<string, CustomerGroup>()
  for (const cluster of reachable) {
    const tenant = byPath.get(cluster.tenantPath)
    if (!tenant) continue
    let group = customers.get(tenant.path)
    if (!group) {
      group = { tenant, channel: channelOf(tenant, tenants), clusters: [] }
      customers.set(tenant.path, group)
    }
    group.clusters.push(cluster)
  }

  for (const group of customers.values()) {
    group.clusters.sort((a, b) => a.name.localeCompare(b.name))
  }

  // Only a vendor viewer sees a partner level. A partner is already inside
  // their own subtree, so nesting their own name above every customer row
  // would be a level of noise that says nothing.
  const nested = tenantTierOf(viewerPath, tenants) === 'vendor'

  const partners = new Map<string, PartnerGroup>()
  for (const group of customers.values()) {
    const key =
      nested && group.channel.kind === 'via' ? group.channel.partner : ''
    let bucket = partners.get(key)
    if (!bucket) {
      bucket = {
        tenant: key
          ? (tenants.find((t) => t.tier === 'partner' && t.name === key) ??
            null)
          : null,
        customers: [],
      }
      partners.set(key, bucket)
    }
    bucket.customers.push(group)
  }

  const out = [...partners.values()]
  for (const bucket of out) {
    bucket.customers.sort((a, b) => a.tenant.path.localeCompare(b.tenant.path))
  }
  return out.sort((a, b) =>
    (a.tenant?.path ?? '').localeCompare(b.tenant?.path ?? ''),
  )
}

const tenantTierOf = (
  path: string,
  tenants: TenantNode[],
): TenantNode['tier'] | undefined => tenants.find((t) => t.path === path)?.tier

/**
 * Fleet counts.
 *
 * `accessible` and `visibleOnly` are separate numbers on purpose. One combined
 * total would tell a partner engineer they can act on more clusters than they
 * can, which is the conflation the brief warns about.
 */
export const fleetCounts = (groups: PartnerGroup[]) => {
  const clusters = groups.flatMap((p) => p.customers.flatMap((c) => c.clusters))
  return {
    total: clusters.length,
    accessible: clusters.filter((c) => c.access === 'access').length,
    visibleOnly: clusters.filter((c) => c.access === 'visibility').length,
    disconnected: clusters.filter((c) => !c.tunnelConnected).length,
    openInsights: clusters.reduce((n, c) => n + c.openInsights, 0),
  }
}
