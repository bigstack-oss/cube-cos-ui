import { CosHyperlink, CosHyperlinkProps } from '../CosHyperlink/CosHyperlink'
import ChevronRightIcon from '../CosIcon/monochrome/chevron_right.svg?react'

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
      <div>
        <span className="secondary-body1 text-primary">{title}</span>
        {/* TODO */}
        {errorCount > 0 && (
          <span className="secondary-body3 text-status-negative">
            ({errorCount} error)
          </span>
        )}
      </div>
      <div className="flex gap-x-2.5">
        {time && (
          // TODO: checkout functional text
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
