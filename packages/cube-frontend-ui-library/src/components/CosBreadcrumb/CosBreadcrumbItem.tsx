import { ComponentType, MouseEvent, PropsWithChildren, ReactNode } from 'react'
import { CosHyperlink } from '../CosHyperlink/CosHyperlink'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'

export type CosBreadcrumbItemProps<
  ContainerProps extends PropsWithChildren = PropsWithChildren,
> = {
  label: string
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  itemContainer?: {
    Component: ComponentType<ContainerProps>
    props: ContainerProps
  }
}

export const CosBreadcrumbItem = <ContainerProps extends PropsWithChildren>(
  props: CosBreadcrumbItemProps<ContainerProps>,
) => {
  const { label, href, onClick, itemContainer } = props

  const isLink = Boolean(href || onClick || itemContainer)

  let breadcrumbItem: ReactNode

  const hyperlink = (
    <CosHyperlink
      color="primary"
      variant="text-only"
      href={href}
      onClick={onClick}
      disabled={false}
      className="primary-body3"
    >
      {label}
    </CosHyperlink>
  )

  if (isLink) {
    if (itemContainer) {
      const { Component, props: containerProps } = itemContainer
      breadcrumbItem = <Component {...containerProps}>{hyperlink}</Component>
    } else {
      breadcrumbItem = hyperlink
    }
  } else {
    breadcrumbItem = (
      <div className="primary-body3 font-medium text-functional-text">
        {label}
      </div>
    )
  }

  return (
    <div className="group flex items-center gap-3">
      {breadcrumbItem}
      <ChevronRight className="icon-lg text-functional-text-light group-last:hidden" />
    </div>
  )
}
