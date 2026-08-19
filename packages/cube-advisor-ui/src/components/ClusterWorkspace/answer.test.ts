import { describe, expect, it } from 'vitest'
import {
  canSee,
  citationLabel,
  commandBadge,
  coverageLabel,
  coverageOf,
  isGrounded,
  isLayerConflict,
  type Citation,
  type Conflict,
  type OutlineEntry,
} from './answer'

const outline: OutlineEntry[] = [
  {
    slug: 'ceph-recovery',
    title: 'Ceph recovery behaviour',
    layer: 'bigstack',
    audience: 'client',
  },
  {
    slug: 'ceph-slow-ops',
    title: 'Slow ops',
    layer: 'bigstack',
    audience: 'client',
  },
  {
    slug: 'internal-escalation',
    title: 'Internal escalation path',
    layer: 'bigstack',
    audience: 'internal',
  },
  {
    slug: 'nw-storage-runbook',
    title: 'NorthWind storage runbook',
    layer: 'partner',
    audience: 'client',
  },
]

const kb = (
  ref: string,
  layer: Citation['layer'] = 'bigstack',
  layerName?: string,
): Citation => ({
  kind: 'kb',
  ref,
  layer,
  layerName,
})

describe('canSee', () => {
  // Internal titles must never reach a customer role, "even in 'not consulted'
  // lists" — so this filters before anything is rendered or counted.
  it('hides internal entries from partner and customer roles', () => {
    const internal = outline[2]
    expect(canSee(internal, 'bigstack')).toBe(true)
    expect(canSee(internal, 'partner')).toBe(false)
    expect(canSee(internal, 'customer')).toBe(false)
  })

  it('shows client entries to everyone', () => {
    expect(canSee(outline[0], 'customer')).toBe(true)
  })
})

describe('citationLabel', () => {
  // Provenance must be readable at a glance, not on hover.
  it('names the layer in the chip text', () => {
    expect(citationLabel(kb('ceph-slow-ops'))).toBe(
      'kb: ceph-slow-ops · Bigstack',
    )
    expect(
      citationLabel(kb('nw-storage-runbook', 'partner', 'NorthWind')),
    ).toBe('kb: nw-storage-runbook · Partner: NorthWind')
  })

  it('never renders a bare reference with no source', () => {
    expect(citationLabel(kb('x'))).toContain('·')
  })
})

describe('coverageOf', () => {
  const citations = [
    kb('ceph-recovery'),
    kb('nw-storage-runbook', 'partner', 'NorthWind'),
  ]

  // The denominator counts only what the viewer may see. Reporting 2/4 to a
  // customer would disclose that an internal entry exists.
  it('counts only entries the viewer may see, in both numerator and denominator', () => {
    expect(coverageOf(outline, citations, 'customer').total).toBe(3)
    expect(coverageOf(outline, citations, 'bigstack').total).toBe(4)
  })

  it('never lists an internal entry as unread to a customer', () => {
    const unread = coverageOf(outline, citations, 'customer').unread
    expect(unread.map((e) => e.slug)).not.toContain('internal-escalation')
    expect(unread.map((e) => e.title).join(' ')).not.toMatch(/internal/i)
  })

  it('splits the read count by layer', () => {
    const c = coverageOf(outline, citations, 'customer')
    expect(c.byLayer).toEqual({ bigstack: 1, partner: 1 })
    // The split must account for every entry read, or the meter lies.
    expect(c.byLayer.bigstack + c.byLayer.partner).toBe(c.read)
  })

  it('reports completeness against what the viewer can see', () => {
    const all = [
      kb('ceph-recovery'),
      kb('ceph-slow-ops'),
      kb('nw-storage-runbook', 'partner', 'NW'),
    ]
    expect(coverageOf(outline, all, 'customer').complete).toBe(true)
    // The same answer is incomplete for Bigstack, who can see one more entry.
    expect(coverageOf(outline, all, 'bigstack').complete).toBe(false)
  })

  // The tool ref deliberately collides with an outline slug. A ref that
  // matched nothing would make this pass whether or not kb-only filtering
  // happens, which is no test at all.
  it('ignores tool citations even when a ref collides with an entry slug', () => {
    const tool: Citation = {
      kind: 'tool',
      ref: 'ceph-recovery',
      layer: 'bigstack',
    }
    const c = coverageOf(outline, [tool], 'customer')
    expect(c.read).toBe(0)
    expect(c.unread.map((e) => e.slug)).toContain('ceph-recovery')
  })
})

describe('coverageLabel', () => {
  it('states the split when both layers contributed', () => {
    const c = coverageOf(
      outline,
      [kb('ceph-recovery'), kb('nw-storage-runbook', 'partner', 'NW')],
      'customer',
    )
    expect(coverageLabel(c)).toBe('Based on 2/3 · 1 Bigstack · 1 Partner')
  })

  it('omits a layer that contributed nothing rather than printing a zero', () => {
    const c = coverageOf(outline, [kb('ceph-recovery')], 'customer')
    expect(coverageLabel(c)).toBe('Based on 1/3 · 1 Bigstack')
  })
})

describe('isGrounded', () => {
  it('is false for a segment with no citation', () => {
    expect(isGrounded({ text: 'probably fine', citations: [] })).toBe(false)
    expect(
      isGrounded({ text: 'osd.7 restarted', citations: [kb('ceph-recovery')] }),
    ).toBe(true)
  })
})

describe('isLayerConflict', () => {
  const across: Conflict = {
    question: 'how to remediate',
    sides: [
      { citation: kb('backup-retry-policy'), claim: 'retry once then fail' },
      {
        citation: kb('nw-backup-failover', 'partner', 'NorthWind'),
        claim: 're-run against secondary',
      },
    ],
  }

  it('is a conflict when two layers disagree', () => {
    expect(isLayerConflict(across)).toBe(true)
  })

  // Two Bigstack entries disagreeing is ours to fix, not the operator's to
  // adjudicate mid-incident.
  it('is not a conflict when both sides come from the same layer', () => {
    expect(
      isLayerConflict({
        question: 'q',
        sides: [
          { citation: kb('a'), claim: 'x' },
          { citation: kb('b'), claim: 'y' },
        ],
      }),
    ).toBe(false)
  })

  it('is not a conflict with a single side', () => {
    expect(
      isLayerConflict({
        question: 'q',
        sides: [{ citation: kb('a'), claim: 'x' }],
      }),
    ).toBe(false)
  })

  // The type must not be able to express a winner: the brief says show both and
  // do not pick one.
  it('has no notion of a winning side', () => {
    expect(Object.keys(across)).toEqual(['question', 'sides'])
  })
})

describe('commandBadge', () => {
  // Absence of a warning is itself a claim, so unsupported is stated.
  it('states unsupported rather than omitting a badge', () => {
    expect(commandBadge({ command: 'cluster x', supported: false })).toMatch(
      /not a CubeCOS/,
    )
    expect(commandBadge({ command: 'cluster check', supported: true })).toMatch(
      /valid CubeCOS/,
    )
  })
})
