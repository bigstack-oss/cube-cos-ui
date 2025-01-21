import { PropsWithChildren, useContext } from 'react'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosDropdownFilter } from './CosDropdownFilter'
import { CosDropdownContext } from './cosDropdownUtils'
import { twMerge } from 'tailwind-merge'
import { content } from './cosDropdownStyles'

type CosDropdownContentProps = PropsWithChildren<PropsWithClassName>

export const CosDropdownContent = (props: CosDropdownContentProps) => {
  const { isOpen, variant } = useContext(CosDropdownContext)
  const { children, className } = props

  if (!isOpen) return null

  return (
    <div className={twMerge(content({ variant }), className)}>
      {variant === 'filter' && <CosDropdownFilter />}
      {children}
    </div>
  )
}
