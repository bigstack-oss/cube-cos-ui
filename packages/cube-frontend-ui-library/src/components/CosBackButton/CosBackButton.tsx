import { PropsWithChildren, ReactNode } from 'react'
import { BackLinkProps } from './BackLink'
import {
  BarChartVariantProps,
  CosBackButtonBarChartVariant,
} from './CosBackButtonBarChartVariant'
import {
  CosBackButtonTitleVariant,
  TitleVariantProps,
} from './CosBackButtonTitleVariant'

export type CosBackButtonProps<
  BackLinkContainerProps extends PropsWithChildren,
> = {
  /**
   * @default false
   */
  isLoading?: boolean
  children: string
} & BackLinkProps<BackLinkContainerProps> &
  (TitleVariantProps | BarChartVariantProps)

export const CosBackButton = <
  BackLinkContainerProps extends PropsWithChildren = never,
>(
  props: CosBackButtonProps<BackLinkContainerProps>,
) => {
  const {
    isLoading = false,
    children,
    href,
    onClick,
    backLinkContainer,
    variant,
  } = props

  const getBackLinkProps = (): BackLinkProps<BackLinkContainerProps> => {
    return {
      href,
      onClick,
      backLinkContainer,
    }
  }

  const renderFnMap: Record<typeof variant, () => ReactNode> = {
    title: () => (
      <CosBackButtonTitleVariant
        isLoading={isLoading}
        title={children}
        backLinkProps={getBackLinkProps()}
        details={(props as TitleVariantProps).details}
      />
    ),
    'bar-chart': () => {
      const castedProps = props as BarChartVariantProps
      return (
        <CosBackButtonBarChartVariant
          isLoading={isLoading}
          title={children}
          backLinkProps={getBackLinkProps()}
          links={castedProps.links}
          barCharts={castedProps.barCharts}
          linkSkeletonCount={castedProps.linkSkeletonCount}
          barChartSkeletonCount={castedProps.barChartSkeletonCount}
        />
      )
    },
  }

  return renderFnMap[variant]()
}
