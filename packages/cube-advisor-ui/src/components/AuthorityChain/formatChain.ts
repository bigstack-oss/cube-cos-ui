/**
 * One party in an authority chain, ordered from the tenant that owns the data
 * outward to whoever is acting.
 */
export type AuthorityParty = {
  /** Display name, e.g. "Acme Corp" or "NorthWind". */
  name: string
  /**
   * Which tier this party sits in. `customer` owns the data; `partner` is the
   * optional middle; `vendor` is Bigstack.
   */
  tier: 'customer' | 'partner' | 'vendor'
  /** Role qualifier shown after the name, e.g. "L3". */
  role?: string
}

export type AuthorityChainProps = {
  /**
   * The chain, data-owner first. A single party is a tenant acting in its own
   * cluster; two is direct support; three is support via a partner.
   */
  parties: AuthorityParty[]
  /** Human-readable remaining grant lifetime, e.g. "5h 12m". */
  expiresIn?: string
  /** Invoked by the "view chain" affordance. */
  onViewChain?: () => void
  className?: string
}

/**
 * The tier label that prefixes a party's name.
 *
 * A partner is always named as one. The redraw's hard constraint is that a
 * three-party chain must never *read* as a two-party relationship, and an
 * unlabelled middle name is exactly how that happens — "Acme ← NorthWind"
 * reads as direct support by someone called NorthWind.
 */
const tierLabel: Record<AuthorityParty['tier'], string> = {
  customer: '',
  partner: 'Partner: ',
  vendor: '',
}

export const formatParty = (party: AuthorityParty): string => {
  const role = party.role ? ` ${party.role}` : ''
  return `${tierLabel[party.tier]}${party.name}${role}`
}

/**
 * Summarises a chain for viewports too narrow to render it in full.
 *
 * Never a truncation of the party list. Dropping the middle party silently
 * turns a three-party chain into a two-party one, which is the single failure
 * this element exists to prevent — so a chain that cannot be shown whole
 * collapses to a count instead, and the count still names the hop.
 */
export const summariseChain = (parties: AuthorityParty[]): string => {
  if (parties.length === 0) return ''
  if (parties.length === 1) return formatParty(parties[0])
  const owner = parties[0]
  const acting = parties[parties.length - 1]
  const hops = parties.length - 2
  if (hops <= 0) return `${formatParty(owner)} ← ${formatParty(acting)}`
  const via = hops === 1 ? '1 partner' : `${hops} partners`
  return `${formatParty(owner)} ← via ${via} ← ${formatParty(acting)}`
}
