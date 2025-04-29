import ChevronLeft from '@cube-frontend/ui-library/icons/monochrome/chevron_left.svg?react'
import {
  ComponentType,
  createElement,
  MouseEvent,
  PropsWithChildren,
} from 'react'
import { CosButton } from '../CosButton/CosButton'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

export type BackLinkProps<ContainerProps extends PropsWithChildren> = {
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  backLinkContainer?: {
    Component: ComponentType<ContainerProps>
    props: ContainerProps
  }
}

export const BackLink = <ContainerProps extends PropsWithChildren>(
  props: BackLinkProps<ContainerProps>,
) => {
  const { href, onClick, backLinkContainer } = props

  if (!href && !onClick && !backLinkContainer) {
    console.warn(
      'CosBackButton: At least one of `href`, `onClick`, or `backLinkContainer` must be provided',
    )
  }

  const backButton = (
    <CosButton type="ghost" usage="icon-only" Icon={ChevronLeft} />
  )

  if (backLinkContainer) {
    const { Component, props } = backLinkContainer
    return createElement(Component, props, backButton)
  }

  return (
    <a href={href} onClick={onClick}>
      {backButton}
    </a>
  )
}

export const BackLinkSkeleton = () => {
  return <CosSkeleton className="size-[34px]" />
}
