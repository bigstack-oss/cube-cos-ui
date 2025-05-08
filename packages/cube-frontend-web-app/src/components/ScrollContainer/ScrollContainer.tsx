import { PropsWithClassName } from '@cube-frontend/utils'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type ScrollContainerProps = PropsWithClassName & PropsWithChildren

const ScrollContainer = (props: ScrollContainerProps) => {
  const { children, className: classNameProp } = props

  return (
    <div
      className={twMerge(
        classNameProp,
        'overflow-auto',
        /**
         * Workaround: prevents the box-shadow of child elements from being cut off.
         * Reference: https://stackoverflow.com/questions/70802682/parents-overflowhidden-doesnt-show-childs-box-shadow
         */
        'm-[-16px] p-[16px]',
      )}
    >
      {children}
    </div>
  )
}

export default ScrollContainer
