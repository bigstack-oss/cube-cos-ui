import { CosHyperlink } from '../CosHyperlink/CosHyperlink'
import ChevronLeft from '../CosIcon/monochrome/chevron_left.svg?react'
import { CosBackButtonSkeleton } from './CosBackButtonSkeleton'

export type CosBackButtonProps = {
  details?: string
  loading?: boolean
  children: string
  onClick?: () => void
}

export const CosBackButton = (props: CosBackButtonProps) => {
  const { details, loading = false, children, onClick } = props

  if (loading) {
    return <CosBackButtonSkeleton hasDetails={!!details} />
  }

  return (
    <div className="flex items-center gap-x-3">
      <div
        className="group/back-button flex cursor-pointer items-center gap-x-3"
        onClick={onClick}
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
      </div>
      <span className="primary-body3 text-functional-text-light">
        {details}
      </span>
    </div>
  )
}
