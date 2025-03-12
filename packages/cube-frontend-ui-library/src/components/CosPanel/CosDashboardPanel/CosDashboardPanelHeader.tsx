import pluralize from 'pluralize'
import { CosSkeleton } from '../../CosSkeleton/CosSkeleton'
import {
  CosHyperlink,
  CosHyperlinkProps,
} from '../../CosHyperlink/CosHyperlink'
import ChevronRightIcon from '../..//CosIcon/monochrome/chevron_right.svg?react'
import WarningAltFilledIcon from '../../CosIcon/monochrome/warning_alt_filled.svg?react'

export type CosDashboardPanelHeaderProps = {
  title: string
  errorCount?: number
  time?: string | null
  /**
   * @default false
   */
  isTimeLoading?: boolean
  hyperLinkProps?: Pick<
    CosHyperlinkProps,
    'href' | 'disabled' | 'target' | 'onClick'
  >
}

// TODO: Replace this with i18n.
const pluralizeError = (count: number): string => {
  return `${count} ${pluralize('error', count)}`
}

export const CosDashboardPanelHeader = (
  props: CosDashboardPanelHeaderProps,
) => {
  const {
    title,
    errorCount = 0,
    time,
    isTimeLoading = false,
    hyperLinkProps,
  } = props

  const renderTime = () => {
    if (isTimeLoading) return <CosSkeleton className="h-[13px] w-[97px]" />
    if (!time) return null

    return (
      <span className="secondary-body5 text-functional-text-light">{time}</span>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <span className="secondary-body1 text-primary">{title}</span>
        {errorCount > 0 && (
          <div className="flex items-center gap-x-1 text-status-negative">
            <WarningAltFilledIcon className="icon-md" />
            <span className="primary-body3">{pluralizeError(errorCount)}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-2.5">
        {renderTime()}
        {hyperLinkProps && (
          <CosHyperlink
            variant="icon-right"
            size="sm"
            Icon={ChevronRightIcon}
            {...hyperLinkProps}
          >
            View All
          </CosHyperlink>
        )}
      </div>
    </div>
  )
}
