/**
 * The grounding vocabulary of an answer: citations, coverage, conflicts and
 * command validation.
 *
 * The product's commercial risk is a confident wrong answer, so the UI's job is
 * to make reliability inspectable rather than to hide the machinery. Everything
 * here is a pure function over an answer so the claims the screen makes can be
 * tested without a browser.
 */

/** Which knowledge layer a citation came from (ADR 0006). */
export type SourceLayer = 'bigstack' | 'partner'

/** Who may read a knowledge entry. */
export type Audience = 'internal' | 'client'

export type Citation = {
  kind: 'kb' | 'tool'
  /** Entry slug or tool call id, e.g. `ceph-slow-ops` or `cluster check @14:02`. */
  ref: string
  layer: SourceLayer
  /** Partner name, when layer is `partner`. */
  layerName?: string
  /** Absent for tool observations, which are always the viewer's own cluster. */
  audience?: Audience
}

/** A knowledge entry in the topic outline a broad question should cover. */
export type OutlineEntry = {
  slug: string
  title: string
  layer: SourceLayer
  audience: Audience
}

export type ViewerRole = 'bigstack' | 'partner' | 'customer'

/**
 * Whether a viewer may see an entry at all.
 *
 * Internal entries are for Bigstack staff. Everyone else must not learn they
 * exist — the brief is explicit that internal titles must never reach customer
 * roles "even in 'not consulted' lists", which is why filtering happens here
 * rather than in the renderer.
 */
export const canSee = (entry: OutlineEntry, role: ViewerRole): boolean =>
  entry.audience === 'client' || role === 'bigstack'

/**
 * The label a citation chip renders.
 *
 * The layer is part of the chip text, not a hover affordance: the brief
 * requires provenance to be distinguishable at a glance.
 */
export const citationLabel = (c: Citation): string => {
  const source =
    c.layer === 'partner' ? `Partner: ${c.layerName ?? 'partner'}` : 'Bigstack'
  return `${c.kind}: ${c.ref} · ${source}`
}

export type Coverage = {
  read: number
  total: number
  byLayer: Record<SourceLayer, number>
  /** Entries the viewer may see and the answer did not read. */
  unread: OutlineEntry[]
  complete: boolean
}

/**
 * Coverage of a topic outline, from the viewer's point of view.
 *
 * Both numerator and denominator count only entries this viewer may see. The
 * same question can therefore legitimately show different coverage to different
 * roles — that is correct, not a bug: reporting 5/7 to a customer whose two
 * unseen entries are internal would disclose that two internal entries exist.
 */
export const coverageOf = (
  outline: OutlineEntry[],
  citations: Citation[],
  role: ViewerRole,
): Coverage => {
  const visible = outline.filter((e) => canSee(e, role))
  const cited = new Set(
    citations.filter((c) => c.kind === 'kb').map((c) => c.ref),
  )
  const read = visible.filter((e) => cited.has(e.slug))
  const byLayer: Record<SourceLayer, number> = { bigstack: 0, partner: 0 }
  for (const entry of read) byLayer[entry.layer] += 1
  return {
    read: read.length,
    total: visible.length,
    byLayer,
    unread: visible.filter((e) => !cited.has(e.slug)),
    complete: read.length === visible.length,
  }
}

/** `Based on 5/7 · 3 Bigstack · 2 Partner` */
export const coverageLabel = (c: Coverage): string => {
  const parts = [`Based on ${c.read}/${c.total}`]
  if (c.byLayer.bigstack > 0) parts.push(`${c.byLayer.bigstack} Bigstack`)
  if (c.byLayer.partner > 0) parts.push(`${c.byLayer.partner} Partner`)
  return parts.join(' · ')
}

export type AnswerSegment = {
  text: string
  citations: Citation[]
}

/**
 * Whether a segment is backed by anything.
 *
 * An uncited segment is rendered visibly differently rather than silently — the
 * whole point is that an ungrounded claim should not look like a grounded one.
 */
export const isGrounded = (segment: AnswerSegment): boolean =>
  segment.citations.length > 0

/**
 * A disagreement between the base pack and a partner overlay.
 *
 * Deliberately has no winner field. The brief requires both sides shown with
 * their provenance and no winner picked — an operator mid-incident is exactly
 * who needs to see the disagreement rather than one side of it.
 */
export type Conflict = {
  question: string
  sides: { citation: Citation; claim: string }[]
}

/**
 * Whether a set of sources actually constitutes a conflict worth a card.
 *
 * Two claims from the same layer are a knowledge-base inconsistency for
 * Bigstack or the partner to fix, not a layering conflict for the operator to
 * adjudicate. A card needs at least two distinct layers.
 */
export const isLayerConflict = (conflict: Conflict): boolean => {
  const layers = new Set(conflict.sides.map((s) => s.citation.layer))
  return conflict.sides.length >= 2 && layers.size >= 2
}

/** A command the answer recommends, with its validation verdict. */
export type CommandBlock = {
  command: string
  /** `true` only when the command is in the supported CubeCOS surface. */
  supported: boolean
}

/**
 * The badge a recommended command carries.
 *
 * Unsupported is stated, never omitted. A command block with no badge reads as
 * endorsed, so absence of a warning is itself a claim.
 */
export const commandBadge = (block: CommandBlock): string =>
  block.supported ? 'valid CubeCOS command' : 'not a CubeCOS-supported command'
