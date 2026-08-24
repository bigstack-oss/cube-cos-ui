import { GPUResourceType } from '@cube-frontend/api'
import { CosTooltip } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { useTranslation } from 'react-i18next'
import { getUnmeasurableReasonKey } from './utils'

export type UnmeasurableValueProps = {
  resourceType: GPUResourceType
}

/**
 * A GPU number the host cannot read comes back as `null`, not `0`. Say the
 * number is unavailable instead of printing a dash nobody can interpret, and
 * name the hardware reason when the reader hovers the info icon.
 */
export const UnmeasurableValue = (props: UnmeasurableValueProps) => {
  const { resourceType } = props

  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-x-2 text-functional-text-light">
      <span>{t('nodes.details.gpuList.unmeasurable.label')}</span>
      <CosTooltip
        hoverContent={{ message: t(getUnmeasurableReasonKey(resourceType)) }}
        placement="top-left"
      >
        <InformationCircle className="icon-md shrink-0" />
      </CosTooltip>
    </div>
  )
}
