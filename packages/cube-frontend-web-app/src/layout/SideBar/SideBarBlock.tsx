import { PropsWithClassName } from '@cube-frontend/utils'
import { PropsWithChildren } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

const borderClass = twJoin('border-b border-functional-border-divider')

type SideBarBlockProps = PropsWithClassName & PropsWithChildren

export const SideBarBlock = (props: SideBarBlockProps) => {
  const { children, className } = props
  return <div className={twMerge(borderClass, className)}>{children}</div>
}
