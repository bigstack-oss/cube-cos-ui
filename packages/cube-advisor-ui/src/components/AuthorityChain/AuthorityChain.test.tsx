import { describe, expect, it } from 'vitest'
import { formatParty, summariseChain, type AuthorityParty } from './formatChain'

const acme: AuthorityParty = { name: 'Acme Corp', tier: 'customer' }
const northwind: AuthorityParty = { name: 'NorthWind', tier: 'partner' }
const bigstack: AuthorityParty = {
  name: 'Bigstack',
  tier: 'vendor',
  role: 'L3',
}

describe('formatParty', () => {
  // A partner is always named as one. "Acme ← NorthWind" reads as direct
  // support by a company called NorthWind, which is the misreading this whole
  // element exists to prevent.
  it('always labels a partner as a partner', () => {
    expect(formatParty(northwind)).toContain('Partner:')
  })

  it('does not label the data owner or the vendor as partners', () => {
    expect(formatParty(acme)).not.toContain('Partner:')
    expect(formatParty(bigstack)).not.toContain('Partner:')
  })

  it('keeps the role qualifier', () => {
    expect(formatParty(bigstack)).toBe('Bigstack L3')
  })
})

describe('summariseChain', () => {
  it('renders a direct two-party relationship in full', () => {
    expect(summariseChain([acme, bigstack])).toBe('Acme Corp ← Bigstack L3')
  })

  // The constraint the redraw states outright: a three-party chain may
  // truncate visually, but must never truncate to something that READS as a
  // two-party relationship.
  it('never collapses three parties into a two-party reading', () => {
    const summary = summariseChain([acme, northwind, bigstack])
    expect(summary).toContain('Acme Corp')
    expect(summary).toContain('Bigstack L3')
    // The hop must survive in some form.
    expect(summary).toMatch(/partner/i)
    // And it must not look like the direct case.
    expect(summary).not.toBe(summariseChain([acme, bigstack]))
  })

  it('counts the hops rather than dropping them as the chain grows', () => {
    const two: AuthorityParty = { name: 'EastGate', tier: 'partner' }
    expect(summariseChain([acme, northwind, two, bigstack])).toContain(
      '2 partners',
    )
  })

  it('shows a single party as itself, with no relationship implied', () => {
    expect(summariseChain([acme])).toBe('Acme Corp')
    expect(summariseChain([acme])).not.toContain('←')
  })

  it('is empty for an empty chain rather than rendering a stray arrow', () => {
    expect(summariseChain([])).toBe('')
  })

  // The data owner is always first and whoever is acting is always last. If
  // that ordering slipped, the banner would name the wrong party as the
  // tenant whose data is being read.
  it('puts the data owner first and the acting party last', () => {
    const summary = summariseChain([acme, northwind, bigstack])
    expect(summary.indexOf('Acme Corp')).toBeLessThan(
      summary.indexOf('Bigstack'),
    )
  })
})
