import { CosHyperlink, CosHyperlinkProps } from '../CosHyperlink/CosHyperlink'
import ChevronRightIcon from '../CosIcon/monochrome/chevron_right.svg?react'
import WarningAltFilledIcon from '../CosIcon/monochrome/warning_alt_filled.svg?react'

export type CosPanelHeaderProps = {
  title: string
  errorCount?: number
  time?: string
  hyperLinkProps?: Pick<
    CosHyperlinkProps,
    'href' | 'disabled' | 'target' | 'onClick'
  >
}

export const CosPanelHeader = (props: CosPanelHeaderProps) => {
  const { title, errorCount = 0, time, hyperLinkProps } = props

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <span className="secondary-body1 text-primary">{title}</span>
        {errorCount > 0 && (
          <div className="flex items-center gap-x-1 text-status-negative">
            <WarningAltFilledIcon className="icon-lg" />
            <span className="primary-body3">{errorCount} errors</span>
          </div>
        )}
      </div>
      <div className="flex gap-x-2.5">
        {time && (
          // TODO: Figma uses --Functional-Color-Text, but it's a CMP design token.
          // We need to check with designers.
          <span className="secondary-body5 text-functional-text-light">
            {time}
          </span>
        )}
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
