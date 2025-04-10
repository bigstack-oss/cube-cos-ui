import { PropsWithClassName } from '@cube-frontend/utils'
import { CosSkeleton } from '../../CosSkeleton/CosSkeleton'
import { twMerge } from 'tailwind-merge'

type CosInlineNotificationSkeletonProps = PropsWithClassName & {
  hasIcon?: boolean
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasLink?: boolean
}

export const CosInlineNotificationSkeleton = (
  props: CosInlineNotificationSkeletonProps,
) => {
  const { hasIcon, hasTitle, hasSubtitle, hasLink, className } = props

  return (
    <div
      className={twMerge(
        'flex min-h-[44px] gap-3 rounded-[5px] border border-functional-border-divider px-4 py-[14px]',
        className,
      )}
    >
      <div className="flex flex-1 items-start gap-2">
        {hasIcon && <CosSkeleton className="size-4" />}
        {hasTitle && <CosSkeleton className="h-4 w-[97px]" />}
        {hasSubtitle && <CosSkeleton className="h-4 w-full" />}
      </div>
      <div className="flex items-center gap-2 self-start">
        {hasLink && <CosSkeleton className="h-4 w-[85px]" />}
        <CosSkeleton className="size-4" />
      </div>
    </div>
  )
}
