import Notification from '@cube-frontend/ui-library/icons/monochrome/notification.svg?react'
import { Ref } from 'react'
import { twMerge } from 'tailwind-merge'

type OverflowMenuTriggerProps = {
  ref?: Ref<HTMLDivElement>
  onClick?: () => void
}

export const OverflowMenuTrigger = (props: OverflowMenuTriggerProps) => {
  const { ref, onClick } = props

  return (
    <div
      ref={ref}
      className={twMerge(
        'group flex size-[34px] items-center justify-center',
        'cursor-pointer rounded-[5px]',
        'transition-colors hover:bg-functional-hover-secondary',
      )}
      onClick={onClick}
    >
      <Notification className="icon-md text-cosmos-primary group-hover:text-functional-hover-primary" />
    </div>
  )
}
