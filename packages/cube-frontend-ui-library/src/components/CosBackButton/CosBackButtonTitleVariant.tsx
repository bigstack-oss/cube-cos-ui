import { PropsWithChildren } from 'react'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { BackLink, BackLinkProps, BackLinkSkeleton } from './BackLink'

type CosBackButtonTitleVariantProps<
  BackLinkContainerProps extends PropsWithChildren,
> = {
  /**
   * @default false
   */
  isLoading?: boolean
  title: string
  backLinkProps: BackLinkProps<BackLinkContainerProps>
} & Omit<TitleVariantProps, 'variant'>

export type TitleVariantProps = {
  variant: 'title'
  details?: string
}

export const CosBackButtonTitleVariant = <
  BackLinkContainerProps extends PropsWithChildren,
>(
  props: CosBackButtonTitleVariantProps<BackLinkContainerProps>,
) => {
  const { isLoading = false, title, backLinkProps, details } = props

  if (isLoading) {
    return (
      <div className="flex items-center">
        <BackLinkSkeleton />
        <CosSkeleton className="ml-2 h-6 w-[92px]" />
        {details && <CosSkeleton className="ml-3 h-[22px] w-[49px]" />}
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <BackLink {...backLinkProps} />
      <div className="primary-h3 ml-2 text-functional-title">{title}</div>
      {details && (
        <span className="primary-body1 ml-3 text-functional-text-light">
          {details}
        </span>
      )}
    </div>
  )
}
