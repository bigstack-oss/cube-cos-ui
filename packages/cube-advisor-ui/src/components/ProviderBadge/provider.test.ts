import { describe, expect, it } from 'vitest'
import {
  applyCloudPolicy,
  badgeText,
  isCloudMode,
  resolveCloudPolicy,
  type Model,
  type TierPolicy,
} from './provider'

const sonnet: Model = {
  id: 's',
  name: 'Claude Sonnet 4.5',
  class: 'balanced',
  mode: 'pooled',
}
const ownKey: Model = {
  id: 'o',
  name: 'Claude Opus 4',
  class: 'deep',
  mode: 'own-key',
}
const local: Model = {
  id: 'l',
  name: 'gpt-oss-120b',
  class: 'fast',
  mode: 'local-pack',
}

describe('badgeText', () => {
  // The badge answered "which model" before ADR 0007. Model alone no longer
  // tells an operator where their cluster's data went.
  it('always names the mode alongside the model', () => {
    expect(badgeText(sonnet)).toBe('Claude Sonnet 4.5 · Bigstack-hosted')
    expect(badgeText(ownKey)).toBe('Claude Opus 4 · your key')
    expect(badgeText(local)).toBe('gpt-oss-120b · local pack')
  })

  it('never renders a model name on its own', () => {
    for (const m of [sonnet, ownKey, local]) {
      expect(badgeText(m)).not.toBe(m.name)
      expect(badgeText(m)).toContain('·')
    }
  })
})

describe('isCloudMode', () => {
  it('treats only the local pack as staying on the cluster', () => {
    expect(isCloudMode('pooled')).toBe(true)
    expect(isCloudMode('own-key')).toBe(true)
    expect(isCloudMode('local-pack')).toBe(false)
  })
})

describe('resolveCloudPolicy', () => {
  const bigstack: TierPolicy = { tenant: 'Bigstack', cloudAllowed: true }
  const partner: TierPolicy = { tenant: 'NorthWind', cloudAllowed: true }
  const customerDenies: TierPolicy = {
    tenant: 'Acme Corp',
    cloudAllowed: false,
  }

  // ADR 0007: a partner cannot loosen cloud-allowed:no for their customer.
  it('lets a deny anywhere in the chain win over any allow', () => {
    expect(resolveCloudPolicy([bigstack, partner, customerDenies])).toEqual({
      cloudAllowed: false,
      setBy: 'Acme Corp',
    })
    // And the same when the denier is the ancestor rather than the leaf — a
    // nearer tier must not be able to re-permit it.
    expect(
      resolveCloudPolicy([
        { tenant: 'Bigstack', cloudAllowed: false },
        partner,
      ]),
    ).toEqual({ cloudAllowed: false, setBy: 'Bigstack' })
  })

  // The UI must say WHICH tier disabled it, not merely that it is disabled.
  it('names the tenant whose policy decided', () => {
    expect(resolveCloudPolicy([bigstack, customerDenies]).setBy).toBe(
      'Acme Corp',
    )
  })

  it('allows when a tier says so and nobody denies', () => {
    expect(resolveCloudPolicy([bigstack, partner])).toEqual({
      cloudAllowed: true,
      setBy: 'Bigstack',
    })
  })

  it('defaults to allowed with no attribution when nobody has an opinion', () => {
    expect(resolveCloudPolicy([{ tenant: 'Acme Corp' }])).toEqual({
      cloudAllowed: true,
      setBy: '',
    })
    expect(resolveCloudPolicy([])).toEqual({ cloudAllowed: true, setBy: '' })
  })
})

describe('applyCloudPolicy', () => {
  const models = [sonnet, ownKey, local]

  it('leaves everything selectable when cloud egress is allowed', () => {
    const out = applyCloudPolicy(models, {
      cloudAllowed: true,
      setBy: 'Bigstack',
    })
    expect(out.every((m) => m.selectable)).toBe(true)
    expect(out.every((m) => m.pinnedReason === undefined)).toBe(true)
  })

  // "absent or pinned with a reason, not silently missing" — a shorter list
  // reads as the product lacking the model, not as a policy excluding it.
  it('pins cloud models rather than dropping them', () => {
    const out = applyCloudPolicy(models, {
      cloudAllowed: false,
      setBy: 'Acme Corp',
    })
    expect(out).toHaveLength(models.length)
    const pinned = out.filter((m) => !m.selectable)
    expect(pinned.map((p) => p.model.id).sort()).toEqual(['o', 's'])
  })

  it('names the deciding tier in the pinned reason', () => {
    const out = applyCloudPolicy(models, {
      cloudAllowed: false,
      setBy: 'Acme Corp',
    })
    const pinned = out.find((m) => !m.selectable)
    expect(pinned?.pinnedReason).toContain('Acme Corp')
    expect(pinned?.pinnedReason).toMatch(/data-egress/i)
  })

  it('keeps the local pack selectable when cloud is denied', () => {
    const out = applyCloudPolicy(models, {
      cloudAllowed: false,
      setBy: 'Acme Corp',
    })
    const localOut = out.find((m) => m.model.id === 'l')
    expect(localOut?.selectable).toBe(true)
    expect(localOut?.pinnedReason).toBeUndefined()
  })
})
