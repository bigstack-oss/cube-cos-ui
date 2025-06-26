import ChevronLeft from '@cube-frontend/ui-library/icons/monochrome/chevron_left.svg?react'
import {
  ComponentType,
  createElement,
  MouseEvent,
  PropsWithChildren,
  useContext,
} from 'react'
import { CosButton } from '../CosButton/CosButton'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { CosBackButtonContext } from './cosBackButtonContext'

export type BackButtonProps<ContainerProps extends PropsWithChildren> = {
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  backButtonContainer?: {
    Component: ComponentType<ContainerProps>
    props: ContainerProps
  }
}

export const BackButton = <ContainerProps extends PropsWithChildren>(
  props: BackButtonProps<ContainerProps>,
) => {
  const { href, onClick, backButtonContainer } = props

  const { isLoading } = useContext(CosBackButtonContext)

  if (!href && !onClick && !backButtonContainer) {
    console.warn(
      'CosBackButton: At least one of `href`, `onClick`, or `backButtonContainer` must be provided',
    )
  }

  if (isLoading) {
    return <CosSkeleton className="size-[34px]" />
  }

  const backButton = (
    <CosButton type="ghost" usage="icon-only" Icon={ChevronLeft} />
  )

  if (backButtonContainer) {
    const { Component, props } = backButtonContainer
    return createElement(Component, props, backButton)
  }

  return (
    <a href={href} onClick={onClick}>
      {backButton}
    </a>
  )
}
