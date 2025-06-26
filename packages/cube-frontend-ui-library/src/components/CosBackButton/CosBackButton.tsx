import { PropsWithChildren, ReactNode } from 'react'
import { BackButton, BackButtonProps } from './BackButton'
import { BarChart } from './BarChart'
import { CosBackButtonContextProvider } from './CosBackButtonContextProvider'
import { Details } from './Details'
import { Divider } from './Divider'
import { Link } from './Link'
import { Title } from './Title'

export type CosBackButtonProps<
  BackButtonContainerProps extends PropsWithChildren,
> = {
  /**
   * Title.
   */
  children: string
  /**
   * @default false
   */
  isLoading?: boolean
  titleRightContent?: ReactNode
  titleBottomContent?: ReactNode
} & BackButtonProps<BackButtonContainerProps>

export const CosBackButton = <
  BackButtonContainerProps extends PropsWithChildren,
>(
  props: CosBackButtonProps<BackButtonContainerProps>,
) => {
  const {
    children,
    isLoading = false,
    titleRightContent,
    titleBottomContent,
    // Back link props.
    href,
    onClick,
    backButtonContainer,
  } = props

  const getBackButtonProps = (): BackButtonProps<BackButtonContainerProps> => {
    return {
      href,
      onClick,
      backButtonContainer,
    }
  }

  return (
    <CosBackButtonContextProvider isLoading={isLoading}>
      <div className="flex items-center gap-x-2">
        <BackButton {...getBackButtonProps()} />
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-3">
            <Title>{children}</Title>
            {titleRightContent}
          </div>
          {titleBottomContent && (
            <div className="flex items-center gap-x-3">
              {titleBottomContent}
            </div>
          )}
        </div>
      </div>
    </CosBackButtonContextProvider>
  )
}

CosBackButton.BarChart = BarChart
CosBackButton.Details = Details
CosBackButton.Divider = Divider
CosBackButton.Link = Link
