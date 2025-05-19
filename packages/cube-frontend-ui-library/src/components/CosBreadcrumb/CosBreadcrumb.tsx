import { PropsWithClassName } from '@cube-frontend/utils'
import { CosBreadcrumbItem } from './CosBreadcrumbItem'
import { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosBreadcrumbSkeleton } from './CosBreadcrumbSkeleton'

export const MAX_BREADCRUMB_ITEMS = 5

export type CosBreadcrumbProps = PropsWithClassName & {
  isLoading?: boolean
  children:
    | ReactElement<typeof CosBreadcrumbItem>[]
    | ReactElement<typeof CosBreadcrumbItem>
}

export const CosBreadcrumb = (props: CosBreadcrumbProps) => {
  const { className, children, isLoading } = props

  if (Array.isArray(children) && children.length > 5) {
    console.warn(
      'CosBreadcrumb: The number of items in the breadcrumb should not exceed 5.',
    )
  }

  /**
   * There is a maximum of 5 items in the breadcrumb
   */
  const skeletonCount = Array.isArray(children)
    ? Math.min(children.length, MAX_BREADCRUMB_ITEMS)
    : MAX_BREADCRUMB_ITEMS

  if (isLoading) {
    return <CosBreadcrumbSkeleton length={skeletonCount} />
  }

  return (
    <div className={twMerge('flex w-fit items-center gap-3 py-1', className)}>
      {children}
    </div>
  )
}

CosBreadcrumb.Item = CosBreadcrumbItem
