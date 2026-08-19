/**
 * Tenant scoping for the global scope switcher.
 *
 * The switcher answers "which tier am I acting in, and whose tenant am I
 * inside" on every screen. Its options are *derived* from the viewer's own
 * subtree rather than filtered out of the whole tree, because the brief is
 * explicit that cross-partner selection must be structurally impossible rather
 * than validated after the fact: partners are frequently competitors, and this
 * is the screen where a slip is unrecoverable.
 *
 * The difference matters. A filter is a check someone can forget to apply, or
 * apply to the wrong list; deriving from the subtree means a sibling partner is
 * never in the data the picker renders from at all.
 */

/** Where a tenant sits in the three-tier tree (ADR 0004 caps the depth at three). */
export type TenantTier = 'vendor' | 'partner' | 'customer'

export type TenantNode = {
  id: string
  name: string
  /** Dotted path from the root, e.g. `bigstack.northwind.acme`. */
  path: string
  tier: TenantTier
}

/**
 * Whether `path` is `root` or sits beneath it.
 *
 * Compared segment by segment, never as a raw string prefix. `bigstack.north`
 * is a string prefix of `bigstack.northwind` but is not its ancestor, and a
 * naive prefix test would hand one partner another partner's whole portfolio.
 */
export const isWithin = (path: string, root: string): boolean => {
  if (root === '') return false
  if (path === root) return true
  return path.startsWith(root + '.')
}

/** Depth of a path, where the root tenant is depth 1. */
export const depthOf = (path: string): number =>
  path === '' ? 0 : path.split('.').length

/**
 * The scopes a viewer may act in: their own tenant and everything beneath it.
 *
 * Ordered by path so the result reads as a tree walk, and so the same inputs
 * always produce the same menu — a picker whose order varies between renders is
 * one an operator can misclick during an incident.
 */
export const scopeOptions = (
  viewerPath: string,
  tenants: TenantNode[],
): TenantNode[] =>
  tenants
    .filter((t) => isWithin(t.path, viewerPath))
    .sort((a, b) => a.path.localeCompare(b.path))

/**
 * Whether the switcher should render as a control at all.
 *
 * A viewer with exactly one reachable scope — an end customer — gets a static
 * label. An empty dropdown is worse than no dropdown: it implies there is
 * something to switch to and that the viewer lacks permission, which is a
 * different and more alarming statement than "you are here".
 */
export const isSwitchable = (
  viewerPath: string,
  tenants: TenantNode[],
): boolean => scopeOptions(viewerPath, tenants).length > 1

/**
 * The breadcrumb from the viewer's own tenant down to the selected one.
 *
 * Starts at the viewer, not at the root: a partner acting inside a customer
 * should read `NorthWind › Acme Corp`, not a chain that begins with Bigstack
 * and implies they are acting under vendor authority. Who is acting under whose
 * authority is the authority chain's job, and conflating the two is how a
 * viewer misreads their own permissions.
 */
export const breadcrumbTo = (
  viewerPath: string,
  selectedPath: string,
  tenants: TenantNode[],
): TenantNode[] => {
  if (!isWithin(selectedPath, viewerPath)) return []
  const byPath = new Map(tenants.map((t) => [t.path, t]))
  const segments = selectedPath.split('.')
  const trail: TenantNode[] = []
  for (let i = 1; i <= segments.length; i++) {
    const path = segments.slice(0, i).join('.')
    if (!isWithin(path, viewerPath)) continue
    const node = byPath.get(path)
    if (node) trail.push(node)
  }
  return trail
}
