import classNames from 'classnames'

import {
  fleetCounts,
  groupFleet,
  isPackStale,
  type ClusterRow,
  type CustomerGroup,
} from './fleet'
import type { TenantNode } from '../ScopeSwitcher/scope'

export type FleetHomeProps = {
  viewerPath: string
  tenants: TenantNode[]
  clusters: ClusterRow[]
  onOpenCluster?: (id: string) => void
  className?: string
}

const healthClass: Record<ClusterRow['health'], string> = {
  ok: 'text-status-positive-text',
  warning: 'text-status-warning',
  critical: 'text-status-negative',
  unknown: 'text-functional-text-light',
}

const ChannelTag = (props: { channel: CustomerGroup['channel'] }) =>
  props.channel.kind === 'direct' ? (
    <span className="text-xs text-functional-text-light">direct</span>
  ) : (
    <span className="text-xs text-status-paused">
      via {props.channel.partner}
    </span>
  )

/**
 * One cluster row.
 *
 * Access and visibility are rendered as different things, not as one row with
 * a dimmer variant. A viewer who can only see that a cluster exists must not
 * be able to mistake it for one they can work on — the brief calls conflating
 * them the main way this screen goes wrong.
 */
const ClusterLine = (props: {
  row: ClusterRow
  onOpen?: (id: string) => void
}) => {
  const { row, onOpen } = props
  const actionable = row.access === 'access'
  return (
    <div
      className="flex items-center gap-x-3 py-1 text-sm"
      data-testid="cluster-row"
      data-access={row.access}
    >
      {actionable ? (
        <button
          type="button"
          className="text-functional-title underline-offset-2 hover:underline"
          onClick={() => onOpen?.(row.id)}
        >
          {row.name}
        </button>
      ) : (
        <span className="text-functional-text-light">{row.name}</span>
      )}

      {!actionable && (
        <span className="text-xs text-functional-text-light">
          visible only — no access granted
        </span>
      )}

      <span className={healthClass[row.health]}>{row.health}</span>

      <span
        className={
          row.tunnelConnected
            ? 'text-status-positive-text'
            : 'text-status-negative'
        }
      >
        {row.tunnelConnected
          ? 'connected'
          : `last seen ${row.lastSeen ?? 'unknown'}`}
      </span>

      <span className="text-functional-text-light">
        {row.version}
        {row.fixpack ? ` + ${row.fixpack}` : ''}
      </span>

      {/* Staleness is stated, not left for the reader to compute from a date. */}
      {(isPackStale(row.knowledgePack) || isPackStale(row.advisoryPack)) && (
        <span className="text-status-warning">packs stale</span>
      )}

      {row.openInsights > 0 && (
        <span className="text-functional-text">
          {row.openInsights} insights
        </span>
      )}
      {row.activeWatches > 0 && (
        <span className="text-functional-text">
          {row.activeWatches} watches
        </span>
      )}
    </div>
  )
}

/**
 * Fleet home: enrolled clusters, grouped by tier.
 *
 * Grouping is done by `groupFleet`, which drops anything outside the viewer's
 * subtree before this component sees it — a sibling partner's clusters never
 * reach the renderer.
 */
export const FleetHome = (props: FleetHomeProps) => {
  const { viewerPath, tenants, clusters, onOpenCluster, className } = props
  const groups = groupFleet(viewerPath, tenants, clusters)
  const counts = fleetCounts(groups)

  return (
    <div
      className={classNames('flex flex-col gap-y-4', className)}
      data-testid="fleet-home"
    >
      {/* Two numbers, never one. A combined total would tell a partner they
          can act on more clusters than they can. */}
      <div className="flex gap-x-4 text-sm">
        <span className="text-functional-title">
          {counts.accessible} accessible
        </span>
        {counts.visibleOnly > 0 && (
          <span className="text-functional-text-light">
            {counts.visibleOnly} visible only
          </span>
        )}
        {counts.disconnected > 0 && (
          <span className="text-status-negative">
            {counts.disconnected} disconnected
          </span>
        )}
        {counts.openInsights > 0 && (
          <span className="text-functional-text">
            {counts.openInsights} open insights
          </span>
        )}
      </div>

      {groups.map((partner) => (
        <section
          key={partner.tenant?.path ?? 'direct'}
          className="flex flex-col gap-y-2"
        >
          {partner.tenant && (
            <h2 className="text-sm text-status-paused">
              Partner: {partner.tenant.name}
            </h2>
          )}
          {partner.customers.map((customer) => (
            <div key={customer.tenant.path} className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <h3 className="text-functional-title">
                  {customer.tenant.name}
                </h3>
                <ChannelTag channel={customer.channel} />
              </div>
              {customer.clusters.map((row) => (
                <ClusterLine key={row.id} row={row} onOpen={onOpenCluster} />
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
