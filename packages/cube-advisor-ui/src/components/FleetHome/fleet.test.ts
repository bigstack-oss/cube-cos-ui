import { describe, expect, it } from 'vitest'
import type { TenantNode } from '../ScopeSwitcher/scope'
import {
  channelOf,
  fleetCounts,
  groupFleet,
  isPackStale,
  STALE_PACK_DAYS,
  type ClusterRow,
} from './fleet'

const tenants: TenantNode[] = [
  { id: 'bigstack', name: 'Bigstack', path: 'bigstack', tier: 'vendor' },
  {
    id: 'northwind',
    name: 'NorthWind',
    path: 'bigstack.northwind',
    tier: 'partner',
  },
  {
    id: 'acme',
    name: 'Acme Corp',
    path: 'bigstack.northwind.acme',
    tier: 'customer',
  },
  {
    id: 'eastgate',
    name: 'EastGate',
    path: 'bigstack.eastgate',
    tier: 'partner',
  },
  {
    id: 'globex',
    name: 'Globex',
    path: 'bigstack.eastgate.globex',
    tier: 'customer',
  },
  {
    id: 'initech',
    name: 'Initech',
    path: 'bigstack.initech',
    tier: 'customer',
  },
]

const cluster = (
  id: string,
  tenantPath: string,
  over: Partial<ClusterRow> = {},
): ClusterRow => ({
  id,
  name: id,
  tenantPath,
  tunnelConnected: true,
  health: 'ok',
  version: '3.1.10',
  knowledgePack: { version: '2026.08', ageDays: 3 },
  advisoryPack: { version: '2026.08', ageDays: 3 },
  openInsights: 0,
  activeWatches: 0,
  access: 'access',
  ...over,
})

const clusters: ClusterRow[] = [
  cluster('acme-prod-01', 'bigstack.northwind.acme'),
  cluster('acme-prod-02', 'bigstack.northwind.acme', { access: 'visibility' }),
  cluster('globex-prod-01', 'bigstack.eastgate.globex'),
  cluster('initech-01', 'bigstack.initech', {
    tunnelConnected: false,
    lastSeen: '2026-08-18T10:00:00Z',
  }),
]

describe('channelOf', () => {
  it('tags a customer sold to directly as direct', () => {
    const initech = tenants.find((t) => t.id === 'initech')!
    expect(channelOf(initech, tenants)).toEqual({ kind: 'direct' })
  })

  it('names the partner a customer is reached through', () => {
    const acme = tenants.find((t) => t.id === 'acme')!
    expect(channelOf(acme, tenants)).toEqual({
      kind: 'via',
      partner: 'NorthWind',
    })
  })
})

describe('groupFleet', () => {
  // Same reasoning as the scope switcher: a sibling partner's clusters must
  // never reach the component that draws rows.
  it('never includes clusters outside the viewer subtree', () => {
    const groups = groupFleet('bigstack.northwind', tenants, clusters)
    const ids = groups.flatMap((p) =>
      p.customers.flatMap((c) => c.clusters.map((x) => x.id)),
    )
    expect(ids).toEqual(['acme-prod-01', 'acme-prod-02'])
    expect(ids).not.toContain('globex-prod-01')
    expect(ids).not.toContain('initech-01')
  })

  it('nests customers under partners for a vendor viewer', () => {
    const groups = groupFleet('bigstack', tenants, clusters)
    const partnerNames = groups.map((g) => g.tenant?.name ?? null)
    expect(partnerNames).toContain('NorthWind')
    expect(partnerNames).toContain('EastGate')
    // Direct customers sit in the unparented bucket, not under a partner.
    const direct = groups.find((g) => g.tenant === null)
    expect(direct?.customers.map((c) => c.tenant.id)).toEqual(['initech'])
  })

  // A partner is already inside their own subtree; repeating their name above
  // every row says nothing.
  it('does not nest a partner viewer under their own name', () => {
    const groups = groupFleet('bigstack.northwind', tenants, clusters)
    expect(groups).toHaveLength(1)
    expect(groups[0].tenant).toBeNull()
  })

  it('is stable in order', () => {
    const once = groupFleet('bigstack', tenants, clusters)
    const twice = groupFleet('bigstack', tenants, [...clusters].reverse())
    expect(JSON.stringify(once)).toBe(JSON.stringify(twice))
  })
})

describe('fleetCounts', () => {
  // The conflation the brief calls "the main way this screen goes wrong".
  it('reports access and visibility separately, never as one total', () => {
    const counts = fleetCounts(
      groupFleet('bigstack.northwind', tenants, clusters),
    )
    expect(counts.total).toBe(2)
    expect(counts.accessible).toBe(1)
    expect(counts.visibleOnly).toBe(1)
    // The two must not be summed into "accessible".
    expect(counts.accessible).not.toBe(counts.total)
  })

  it('counts disconnected tunnels', () => {
    const counts = fleetCounts(groupFleet('bigstack', tenants, clusters))
    expect(counts.disconnected).toBe(1)
  })
})

describe('isPackStale', () => {
  it('is false at the threshold and true past it', () => {
    expect(isPackStale({ version: 'x', ageDays: STALE_PACK_DAYS })).toBe(false)
    expect(isPackStale({ version: 'x', ageDays: STALE_PACK_DAYS + 1 })).toBe(
      true,
    )
  })
})
