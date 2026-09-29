import { useTranslation } from 'react-i18next'
import {
  GPUResourceType,
  ListNodeGPUCardsResponseDataInnerAttachedInstancesInnerLinks,
} from '@cube-frontend/api'
import { CosHyperlink, CosTooltip } from '@cube-frontend/ui-library'
import { noop } from 'lodash'
import { ParseKeys } from 'i18next'
import { getInstanceHistoryLinks } from './utils'

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
 * the VM-level counterpart of the pair each GPU card reports. The card type, not
 * the API, decides which of them can open a chart; see getInstanceHistoryLinks.
 */
export const InstanceHistoryLinks = (props: InstanceHistoryLinksProps) => {
  const { resourceType, links } = props

  const { t } = useTranslation()

  const { workload, vram } = getInstanceHistoryLinks(resourceType, links)

  return (
    <>
      <InstanceHistoryLink
        label={t('nodes.details.attachedInstancesList.workloadHistory')}
        href={workload.href}
        disabledReasonKey={workload.disabledReasonKey}
      />
      <InstanceHistoryLink
        label={t('nodes.details.attachedInstancesList.vramHistory')}
        href={vram.href}
        disabledReasonKey={vram.disabledReasonKey}
      />
    </>
  )
}
