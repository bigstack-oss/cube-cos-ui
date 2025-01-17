import { ComponentType } from 'react'
import { CosCubeSpinner } from './Spinners/CosCubeSpinner'
import { CosDotSpinner120 } from './Spinners/CosDotSpinner120'
import { CosDotSpinner45 } from './Spinners/CosDotSpinner45'

export type CosLoadingSpinnerProps = {
  variant: CosLoadingSpinnerVariant
}

export type CosLoadingSpinnerVariant = 'dot45' | 'dot120' | 'cube'

const spinnerComponents: Record<
  CosLoadingSpinnerVariant,
  ComponentType<unknown>
> = {
  dot45: CosDotSpinner45,
  dot120: CosDotSpinner120,
  cube: CosCubeSpinner,
}

export const CosLoadingSpinner = (props: CosLoadingSpinnerProps) => {
  const { variant } = props

  const Component = spinnerComponents[variant]

  return <Component />
}
