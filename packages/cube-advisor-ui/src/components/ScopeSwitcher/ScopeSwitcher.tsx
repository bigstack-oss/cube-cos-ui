import classNames from 'classnames'

import {
  breadcrumbTo,
  isSwitchable,
  scopeOptions,
  type TenantNode,
} from './scope'

export type ScopeSwitcherProps = {
  /** The viewer's own tenant path — the top of everything they may reach. */
  viewerPath: string
  /** The tenant currently being acted in. */
  selectedPath: string
  /** Tenants known to the client. Anything outside the viewer's subtree is ignored. */
  tenants: TenantNode[]
  onSelect?: (path: string) => void
  className?: string
}

const tierLabel: Record<TenantNode['tier'], string> = {
  vendor: 'Bigstack',
  partner: 'Partner',
  customer: 'Customer',
}

/**
 * The global scope switcher and breadcrumb, present on every screen.
 *
 * It answers two questions at once: which tier the viewer is acting in, and
 * whose tenant they are inside. Options come from `scopeOptions`, which derives
 * them from the viewer's own subtree — a sibling partner is never in the data
 * this renders from, rather than being filtered out of a list that contained
 * them.
 *
 * For an end customer the control collapses to a static label. An empty
 * dropdown would imply there is somewhere to switch to and that they lack
 * permission, which is a different and more alarming claim than "you are here".
 */
export const ScopeSwitcher = (props: ScopeSwitcherProps) => {
  const { viewerPath, selectedPath, tenants, onSelect, className } = props

  const options = scopeOptions(viewerPath, tenants)
  const trail = breadcrumbTo(viewerPath, selectedPath, tenants)
  const switchable = isSwitchable(viewerPath, tenants)

  if (options.length === 0) return null

  return (
    <div
      className={classNames('flex items-center gap-x-2 text-sm', className)}
      data-testid="scope-switcher"
    >
      <nav aria-label="Tenant scope" className="flex items-center gap-x-1">
        {trail.map((node, i) => (
          <span key={node.path} className="flex items-center gap-x-1">
            {i > 0 && (
              <span aria-hidden className="text-functional-text-light">
                ›
              </span>
            )}
            <span
              className={classNames(
                'whitespace-nowrap',
                i === trail.length - 1
                  ? 'text-functional-title'
                  : 'text-functional-text-light',
              )}
              title={`${tierLabel[node.tier]}: ${node.name}`}
            >
              {node.name}
            </span>
          </span>
        ))}
      </nav>

      {switchable ? (
        <select
          aria-label="Switch tenant scope"
          className="rounded border border-functional-border-divider bg-transparent px-2 py-1"
          value={selectedPath}
          onChange={(e) => onSelect?.(e.target.value)}
        >
          {options.map((node) => (
            <option key={node.path} value={node.path}>
              {node.name}
            </option>
          ))}
        </select>
      ) : (
        // Static label, deliberately not a disabled control: there is nothing
        // being withheld, so nothing should look withheld.
        <span className="text-functional-text-light" data-testid="scope-static">
          your organisation
        </span>
      )}
    </div>
  )
}
