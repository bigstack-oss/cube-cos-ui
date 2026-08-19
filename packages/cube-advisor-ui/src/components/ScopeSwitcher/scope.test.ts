import { describe, expect, it } from 'vitest'
import {
  breadcrumbTo,
  depthOf,
  isSwitchable,
  isWithin,
  scopeOptions,
  type TenantNode,
} from './scope'

const tree: TenantNode[] = [
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
  // A direct customer: no partner in between.
  {
    id: 'initech',
    name: 'Initech',
    path: 'bigstack.initech',
    tier: 'customer',
  },
  // Deliberately named to be a string prefix of another partner.
  { id: 'north', name: 'North', path: 'bigstack.north', tier: 'partner' },
]

const paths = (nodes: TenantNode[]) => nodes.map((n) => n.path)

describe('isWithin', () => {
  it('includes the root itself and its descendants', () => {
    expect(isWithin('bigstack.northwind', 'bigstack.northwind')).toBe(true)
    expect(isWithin('bigstack.northwind.acme', 'bigstack.northwind')).toBe(true)
  })

  // The bug this function exists to not have. `bigstack.north` is a string
  // prefix of `bigstack.northwind`, and a naive startsWith would hand one
  // partner another partner's entire portfolio.
  it('does not treat a string prefix as an ancestor', () => {
    expect(isWithin('bigstack.northwind', 'bigstack.north')).toBe(false)
    expect(isWithin('bigstack.northwind.acme', 'bigstack.north')).toBe(false)
  })

  it('is false for an empty root rather than matching everything', () => {
    expect(isWithin('bigstack.northwind', '')).toBe(false)
  })
})

describe('scopeOptions', () => {
  it('gives the vendor the whole tree', () => {
    expect(scopeOptions('bigstack', tree)).toHaveLength(tree.length)
  })

  // The invariant the brief calls unrecoverable if it slips: partners are
  // frequently competitors, and a sibling must never be selectable.
  it('never offers a partner a sibling partner or their customers', () => {
    const options = paths(scopeOptions('bigstack.northwind', tree))
    expect(options).toEqual(['bigstack.northwind', 'bigstack.northwind.acme'])
    expect(options).not.toContain('bigstack.eastgate')
    expect(options).not.toContain('bigstack.eastgate.globex')
    expect(options).not.toContain('bigstack.north')
    // And never upward, either.
    expect(options).not.toContain('bigstack')
  })

  it('gives an end customer exactly themselves', () => {
    expect(paths(scopeOptions('bigstack.northwind.acme', tree))).toEqual([
      'bigstack.northwind.acme',
    ])
  })

  it('is stable in order, so a picker cannot reshuffle between renders', () => {
    const once = paths(scopeOptions('bigstack', tree))
    const twice = paths(scopeOptions('bigstack', [...tree].reverse()))
    expect(once).toEqual(twice)
  })

  it('returns nothing for a viewer with no scope rather than everything', () => {
    expect(scopeOptions('', tree)).toEqual([])
  })
})

describe('isSwitchable', () => {
  // An empty dropdown implies there is somewhere to go and the viewer lacks
  // permission — a different and more alarming claim than "you are here".
  it('is false for an end customer, so the control collapses to a label', () => {
    expect(isSwitchable('bigstack.northwind.acme', tree)).toBe(false)
  })

  it('is true for a partner and for the vendor', () => {
    expect(isSwitchable('bigstack.northwind', tree)).toBe(true)
    expect(isSwitchable('bigstack', tree)).toBe(true)
  })
})

describe('breadcrumbTo', () => {
  // Starts at the viewer, not the root: a partner acting inside a customer
  // must not read as acting under vendor authority.
  it('starts at the viewer rather than the root of the tree', () => {
    const trail = breadcrumbTo(
      'bigstack.northwind',
      'bigstack.northwind.acme',
      tree,
    )
    expect(paths(trail)).toEqual([
      'bigstack.northwind',
      'bigstack.northwind.acme',
    ])
    expect(paths(trail)).not.toContain('bigstack')
  })

  it('gives the vendor the full path', () => {
    expect(
      paths(breadcrumbTo('bigstack', 'bigstack.northwind.acme', tree)),
    ).toEqual(['bigstack', 'bigstack.northwind', 'bigstack.northwind.acme'])
  })

  it('is empty when the selection is outside the viewer subtree', () => {
    expect(
      breadcrumbTo('bigstack.northwind', 'bigstack.eastgate.globex', tree),
    ).toEqual([])
  })

  it('is a single entry when the viewer is the selection', () => {
    expect(
      paths(breadcrumbTo('bigstack.initech', 'bigstack.initech', tree)),
    ).toEqual(['bigstack.initech'])
  })
})

describe('depthOf', () => {
  it('counts the root as depth 1 and an empty path as 0', () => {
    expect(depthOf('bigstack')).toBe(1)
    expect(depthOf('bigstack.northwind.acme')).toBe(3)
    expect(depthOf('')).toBe(0)
  })
})
