import classNames from 'classnames'

import {
  badgeText,
  isCloudMode,
  modeLabel,
  type Model,
  type ModelAvailability,
} from './provider'

export type ProviderBadgeProps = {
  model: Model
  /** Shown when pooled inference has degraded to the local pack. */
  degraded?: boolean
  className?: string
}

const modeClass: Record<Model['mode'], string> = {
  pooled: 'text-status-neutral',
  'own-key': 'text-functional-text',
  'local-pack': 'text-status-positive-text',
}

/**
 * Which brain is active, and who pays for it.
 *
 * The mode is not decoration. Before ADR 0007 the badge answered "which model";
 * with a pooled credential, "which model" alone no longer tells an operator
 * where their cluster's data went.
 */
export const ProviderBadge = (props: ProviderBadgeProps) => {
  const { model, degraded, className } = props
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-x-1 whitespace-nowrap text-sm',
        className,
      )}
      data-testid="provider-badge"
      title={badgeText(model)}
    >
      <span className="text-functional-title">{model.name}</span>
      <span aria-hidden className="text-functional-text-light">
        ·
      </span>
      <span className={modeClass[model.mode]}>{modeLabel[model.mode]}</span>
      {isCloudMode(model.mode) && (
        <span className="sr-only">(prompts leave the cluster)</span>
      )}
      {degraded && (
        // Visible, because a silent fallback means an operator believes they
        // are talking to a model they are not.
        <span className="text-status-paused">
          · gateway unavailable, degraded
        </span>
      )}
    </span>
  )
}

export type PinnedControlProps = {
  /** The one-line reason, which must name the tier that decided. */
  reason: string
  children: React.ReactNode
  className?: string
}

/**
 * A control the viewer cannot exercise because it belongs to another tier.
 *
 * Rendered visibly pinned with its reason, never hidden and never greyed out
 * with no explanation. "Only Acme Corp can revoke enrollment" is the honest
 * state, and it reassures the customer reading over a partner's shoulder.
 */
export const PinnedControl = (props: PinnedControlProps) => {
  const { reason, children, className } = props
  return (
    <span
      className={classNames('inline-flex flex-col gap-y-0.5', className)}
      data-testid="pinned-control"
    >
      <span className="opacity-60" aria-disabled>
        {children}
      </span>
      <span className="text-xs text-status-paused">🔒 {reason}</span>
    </span>
  )
}

export type ModelOptionProps = {
  availability: ModelAvailability
  onSelect?: (id: string) => void
}

/**
 * One row of the bounded model picker.
 *
 * A model the tenant may not use stays in the list, pinned with its reason. A
 * silently shorter list reads as the product lacking the model rather than a
 * policy excluding it, which is the wrong thing for an operator to conclude.
 */
export const ModelOption = (props: ModelOptionProps) => {
  const { availability, onSelect } = props
  const { model, selectable, pinnedReason } = availability

  const label = (
    <span className="inline-flex items-center gap-x-2">
      <span className="text-functional-title">{model.name}</span>
      <span className="text-xs text-functional-text-light">{model.class}</span>
      <span className="text-xs">{modeLabel[model.mode]}</span>
    </span>
  )

  if (!selectable) {
    return (
      <PinnedControl reason={pinnedReason ?? 'Unavailable'}>
        {label}
      </PinnedControl>
    )
  }
  return (
    <button
      type="button"
      className="text-left"
      onClick={() => onSelect?.(model.id)}
    >
      {label}
    </button>
  )
}
