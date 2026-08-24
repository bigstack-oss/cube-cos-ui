import { useTranslation } from 'react-i18next'
import {
  GPUResourceType,
  ListNodeGPUCardsResponseDataInnerAttachedInstancesInnerLinks,
} from '@cube-frontend/api'
import { CosHyperlink, CosTooltip } from '@cube-frontend/ui-library'
import { noop } from 'lodash'
import { ParseKeys } from 'i18next'
import { isInstanceWorkloadHistorySupported } from './utils'

type InstanceHistoryLinkProps = {
  label: string
  href: string | null
  disabledReasonKey: ParseKeys
}

const InstanceHistoryLink = (props: InstanceHistoryLinkProps) => {
  const { label, href, disabledReasonKey } = props

  const { t } = useTranslation()

  if (href) {
    return (
      <CosHyperlink size="sm" variant="text-inline" href={href} target="_blank">
        {label}
      </CosHyperlink>
    )
  }

  return (
    <CosTooltip
      hoverContent={{ message: t(disabledReasonKey) }}
      placement="top-left"
    >
      {/* CosHyperlink drops the handlers CosTooltip injects, so the tooltip
          needs an element of its own to hang off. */}
      <span>
        <CosHyperlink
          size="sm"
          variant="text-inline"
          disabled={true}
          onClick={noop}
        >
          {label}
        </CosHyperlink>
      </span>
    </CosTooltip>
  )
}

export type InstanceHistoryLinksProps = {
  resourceType: GPUResourceType
  links: ListNodeGPUCardsResponseDataInnerAttachedInstancesInnerLinks
}

/**
 * An attached instance reports one history link per panel — workload and VRAM —
 * the VM-level counterpart of the pair each GPU card reports. Both come back
 * null together when the API cannot pin the dashboard variables, which would
 * label this VM's chart with another VM.
 *
 * The workload link is disabled on a MIG-backed card even when the API sends
 * one, for the same reason the card row disables its own workload menu item:
 * the hardware reports no utilization, so the panel opens empty.
 */
export const InstanceHistoryLinks = (props: InstanceHistoryLinksProps) => {
  const { resourceType, links } = props

  const { t } = useTranslation()

  const isWorkloadCharted = isInstanceWorkloadHistorySupported(resourceType)

  return (
    <>
      <InstanceHistoryLink
        label={t('nodes.details.attachedInstancesList.workloadHistory')}
        href={isWorkloadCharted ? links.workloadHistory : null}
        disabledReasonKey={
          links.workloadHistory
            ? 'nodes.details.attachedInstancesList.workloadHistoryEmpty'
            : 'nodes.details.attachedInstancesList.historyUnavailable'
        }
      />
      <InstanceHistoryLink
        label={t('nodes.details.attachedInstancesList.vramHistory')}
        href={links.vramHistory}
        disabledReasonKey="nodes.details.attachedInstancesList.historyUnavailable"
      />
    </>
  )
}
