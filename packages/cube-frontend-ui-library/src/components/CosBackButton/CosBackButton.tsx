import { noop } from 'lodash'
import { MouseEvent } from 'react'
import { CosHyperlink } from '../CosHyperlink/CosHyperlink'
import ChevronLeft from '../CosIcon/monochrome/chevron_left.svg?react'
import { CosBackButtonSkeleton } from './CosBackButtonSkeleton'

export type CosBackButtonProps = {
  details?: string
  loading?: boolean
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
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
          // Render `<a>` as a descendant of another `<a>` will lead to an
          // error in the console. Thus, we need to assign a `onClick` prop
          // for `CosHyperlink` to be rendered as a `<div>`.
          onClick={noop}
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
