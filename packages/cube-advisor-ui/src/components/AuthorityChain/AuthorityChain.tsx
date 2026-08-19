import classNames from 'classnames'

import {
  formatParty,
  summariseChain,
  type AuthorityChainProps,
  type AuthorityParty,
} from './formatChain'

/**
 * The persistent banner shown while anyone is acting inside a tenant they do
 * not own.
 *
 * Whoever is acting reads the same chain the data owner reads. There is no
 * viewer for whom a party is omitted — an authority chain that renders
 * differently per audience is not an audit trail.
 */
/**
 * Colours come from cubeTheme.ts, not from this file. A partner is the tier a
 * reader most needs to notice, so it takes the one accent here; the other two
 * stay in the ordinary text ramp so the chain reads as one sentence.
 */
const tierClass: Record<AuthorityParty['tier'], string> = {
  customer: 'text-functional-title',
  partner: 'text-status-paused',
  vendor: 'text-functional-text',
}

export const AuthorityChain = (props: AuthorityChainProps) => {
  const { parties, expiresIn, onViewChain, className } = props

  if (parties.length === 0) return null

  return (
    <div
      className={classNames(
        'flex flex-wrap items-center gap-x-2 gap-y-1 text-sm',
        className,
      )}
      data-testid="authority-chain"
      /* The full chain is always in the accessibility tree, whatever the
         viewport shows. */
      aria-label={summariseChain(parties)}
    >
      <span aria-hidden className="shrink-0">
        🔗
      </span>

      {/* Wide viewports: every party, in order. */}
      <span className="hidden items-center gap-x-2 md:inline-flex">
        {parties.map((party, i) => (
          <span
            key={`${party.tier}-${party.name}`}
            className="inline-flex items-center gap-x-2"
          >
            {i > 0 && (
              <span aria-hidden className="text-functional-text-light">
                ←
              </span>
            )}
            <span
              className={classNames('whitespace-nowrap', tierClass[party.tier])}
            >
              {formatParty(party)}
            </span>
          </span>
        ))}
      </span>

      {/* Narrow viewports: the summary, which still names the hop. */}
      <span className="inline md:hidden" data-testid="authority-chain-summary">
        {summariseChain(parties)}
      </span>

      {expiresIn && (
        <span className="shrink-0 text-functional-text-light">
          · support access · expires in {expiresIn}
        </span>
      )}

      {onViewChain && (
        <button
          type="button"
          onClick={onViewChain}
          className="shrink-0 underline underline-offset-2"
        >
          view chain
        </button>
      )}
    </div>
  )
}
