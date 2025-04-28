import { range } from 'lodash'
import { Fragment, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosHyperlink, CosHyperlinkProps } from '../CosHyperlink/CosHyperlink'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { BackLink, BackLinkProps, BackLinkSkeleton } from './BackLink'
import { BarChart, BarChartProps, BarChartSkeleton } from './BarChart'

type CosBackButtonBarChartVariantProps<
  BackLinkContainerProps extends PropsWithChildren,
> = {
  /**
   * @default false
   */
  isLoading?: boolean
  title: string
  backLinkProps: BackLinkProps<BackLinkContainerProps>
} & Omit<BarChartVariantProps, 'variant'>

export type BarChartVariantProps = {
  variant: 'bar-chart'
  links?: Pick<CosHyperlinkProps, 'children' | 'href' | 'target' | 'onClick'>[]
  barCharts: BarChartProps[]
  /**
   * Set to 0 to hide link skeletons.
   * @default 2
   */
  linkSkeletonCount?: number
  /**
   * Set to 0 to hide bar chart skeletons.
   * @default 3
   */
  barChartSkeletonCount?: number
}

const VerticalLine = () => {
  return <span className="h-4 w-px bg-functional-border-darker last:hidden" />
}

export const CosBackButtonBarChartVariant = <
  BackLinkContainerProps extends PropsWithChildren,
>(
  props: CosBackButtonBarChartVariantProps<BackLinkContainerProps>,
) => {
  const {
    isLoading,
    title,
    backLinkProps,
    links,
    barCharts,
    linkSkeletonCount = 2,
    barChartSkeletonCount = 3,
  } = props

  if (isLoading) {
    return (
      <div
        className={twMerge(
          'flex items-center gap-x-2',
          barChartSkeletonCount <= 0 && 'items-center',
        )}
      >
        <BackLinkSkeleton />
        <div className="flex flex-col gap-y-2">
          {/* Title & links */}
          <div className="flex items-center gap-x-3">
            <CosSkeleton className="h-6 w-[92px]" />
            {range(linkSkeletonCount).map((index) => (
              <Fragment key={index}>
                <VerticalLine />
                <CosSkeleton className="h-4 w-[60px]" />
              </Fragment>
            ))}
          </div>
          {/* Bar charts */}
          {barChartSkeletonCount > 0 && (
            <div className="flex items-center gap-x-3">
              {range(barChartSkeletonCount).map((index) => (
                <Fragment key={index}>
                  <BarChartSkeleton />
                  <VerticalLine />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const hasBarCharts = !!barCharts.length

  return (
    <div
      className={twMerge(
        'flex items-start gap-x-2',
        !hasBarCharts && 'items-center',
      )}
    >
      <BackLink {...backLinkProps} />
      <div className="flex flex-col gap-y-2">
        {/* Title & links */}
        <div className="flex items-center gap-x-3">
          <div className="primary-h3 mr-1 text-functional-title">{title}</div>
          {links?.map((hyperlinkProps) => (
            <Fragment key={hyperlinkProps.children}>
              <VerticalLine />
              <CosHyperlink {...hyperlinkProps} variant="text-only" />
            </Fragment>
          ))}
        </div>
        {/* Bar charts */}
        {hasBarCharts && (
          <div className="flex items-center gap-x-3">
            {barCharts.map((barChartProps) => (
              <Fragment key={barChartProps.label}>
                <BarChart {...barChartProps} />
                <VerticalLine />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
