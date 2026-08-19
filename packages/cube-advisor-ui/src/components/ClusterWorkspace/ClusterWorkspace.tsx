import classNames from 'classnames'

import {
  citationLabel,
  commandBadge,
  coverageLabel,
  isGrounded,
  isLayerConflict,
  type AnswerSegment,
  type Citation,
  type CommandBlock,
  type Conflict,
  type Coverage,
} from './answer'

const layerClass: Record<Citation['layer'], string> = {
  bigstack: 'text-status-neutral',
  partner: 'text-status-paused',
}

/**
 * A citation chip.
 *
 * The layer is in the text and in the colour, because the brief requires
 * provenance to be distinguishable at a glance rather than on hover.
 */
export const CitationChip = (props: {
  citation: Citation
  onOpen?: (ref: string) => void
}) => {
  const { citation, onOpen } = props
  return (
    <button
      type="button"
      onClick={() => onOpen?.(citation.ref)}
      className={classNames(
        'rounded border border-functional-border-divider px-1 text-xs',
        layerClass[citation.layer],
      )}
      data-testid="citation-chip"
      data-layer={citation.layer}
    >
      {citationLabel(citation)}
    </button>
  )
}

/**
 * The coverage meter.
 *
 * Partial coverage is stated prominently and the unread entries are listed —
 * and that list has already been filtered to what this viewer may see, so it
 * cannot disclose that an internal entry exists.
 */
export const CoverageMeter = (props: { coverage: Coverage }) => {
  const { coverage } = props
  return (
    <div
      className={classNames(
        'text-xs',
        coverage.complete
          ? 'text-functional-text-light'
          : 'text-status-warning',
      )}
      data-testid="coverage-meter"
      data-complete={coverage.complete}
    >
      {coverageLabel(coverage)}
      {!coverage.complete && coverage.unread.length > 0 && (
        <span>
          {' '}
          · not consulted: {coverage.unread.map((e) => e.title).join(', ')}
        </span>
      )}
    </div>
  )
}

/**
 * One segment of an answer.
 *
 * An uncited segment renders visibly differently. Absence of a citation is a
 * claim about the answer, so it must not look the same as a grounded one.
 */
export const Segment = (props: {
  segment: AnswerSegment
  onOpen?: (ref: string) => void
}) => {
  const { segment, onOpen } = props
  const grounded = isGrounded(segment)
  return (
    <p
      className={classNames(
        'text-sm',
        grounded
          ? 'text-functional-text'
          : 'border-l-2 border-status-warning pl-2 text-status-warning',
      )}
      data-testid="answer-segment"
      data-grounded={grounded}
    >
      {segment.text}
      {!grounded && <span className="ml-1 text-xs">(ungrounded)</span>}
      {segment.citations.map((c) => (
        <CitationChip key={`${c.kind}:${c.ref}`} citation={c} onOpen={onOpen} />
      ))}
    </p>
  )
}

/**
 * A conflict between knowledge layers.
 *
 * Both sides, with provenance, and no winner. An operator mid-incident is
 * exactly who needs to see the disagreement rather than one side of it — which
 * is why this is a first-class card and not an error state.
 */
export const ConflictCard = (props: { conflict: Conflict }) => {
  const { conflict } = props
  if (!isLayerConflict(conflict)) return null
  return (
    <div
      className="flex flex-col gap-y-1 rounded border border-status-warning p-2"
      data-testid="conflict-card"
    >
      <span className="text-xs text-status-warning">
        Sources disagree — both shown, neither preferred
      </span>
      {conflict.sides.map((side) => (
        <div key={side.citation.ref} className="flex flex-col gap-y-0.5">
          <CitationChip citation={side.citation} />
          <span className="text-sm text-functional-text">{side.claim}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * A recommended command.
 *
 * The badge is always present. A command block with no badge reads as endorsed,
 * so an unsupported command must say so rather than say nothing.
 */
export const CommandRecommendation = (props: { block: CommandBlock }) => {
  const { block } = props
  return (
    <div className="flex flex-col gap-y-0.5" data-testid="command-block">
      <code className="rounded bg-functional-hover-grey px-1 text-sm">
        {block.command}
      </code>
      <span
        className={classNames(
          'text-xs',
          block.supported ? 'text-status-positive-text' : 'text-status-warning',
        )}
      >
        {block.supported ? '✅' : '⚠️'} {commandBadge(block)}
      </span>
    </div>
  )
}
