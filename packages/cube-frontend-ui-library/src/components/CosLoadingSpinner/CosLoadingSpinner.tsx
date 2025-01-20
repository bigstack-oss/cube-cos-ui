import { ComponentType } from 'react'
import { CosCubeSpinner } from './Spinners/CosCubeSpinner'
import { CosDotSpinner120 } from './Spinners/CosDotSpinner120'
import { CosDotSpinner45 } from './Spinners/CosDotSpinner45'
import { PropsWithClassName } from '@cube-frontend/utils'

export type CosLoadingSpinnerProps = PropsWithClassName & {
  variant: CosLoadingSpinnerVariant
}

export type CosLoadingSpinnerVariant = 'dot45' | 'dot120' | 'cube'

const spinnerComponents: Record<
  CosLoadingSpinnerVariant,
  ComponentType<PropsWithClassName>
> = {
  dot45: CosDotSpinner45,
  dot120: CosDotSpinner120,
  cube: CosCubeSpinner,
}

export const CosLoadingSpinner = (props: CosLoadingSpinnerProps) => {
  const { variant, className } = props

  const Component = spinnerComponents[variant]

  return <Component className={className} />
}
