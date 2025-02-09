import { CosHyperlink } from '../CosHyperlink/CosHyperlink'
import ChevronLeft from '../CosIcon/monochrome/chevron_left.svg?react'
import { CosBackButtonSkeleton } from './CosBackButtonSkeleton'

export type CosBackButtonProps = {
  details?: string
  loading?: boolean
  href?: string
  onClick?: () => void
  children: string
}

export const CosBackButton = (props: CosBackButtonProps) => {
  const { details, loading = false, href, onClick, children } = props

  if (!href && !onClick) {
    console.warn('CosBackButton: Either href or onClick is required')
  }

  if (loading) {
    return <CosBackButtonSkeleton hasDetails={!!details} />
  }

  const ClickTag = href ? 'a' : 'div'

  return (
    <div className="flex items-center gap-x-3">
      <ClickTag
        className="group/back-button flex cursor-pointer items-center gap-x-3"
        onClick={onClick}
        {...(ClickTag === 'a' && { href })}
      >
        <ChevronLeft className="icon-lg text-functional-text" />
        <CosHyperlink
          color="primary"
          size="md"
          variant="text-only"
          className="group-hover/back-button:text-functional-hover-primary"
        >
          {children}
        </CosHyperlink>
      </ClickTag>
      <span className="primary-body3 text-functional-text-light">
        {details}
      </span>
    </div>
  )
}
