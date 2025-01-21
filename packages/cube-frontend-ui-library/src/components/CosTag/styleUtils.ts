import { ClassValue } from 'class-variance-authority/types'
import { CosTagColor, CosTagVariant } from './CosTag'

export type Compound = {
  color: CosTagColor
  variant: CosTagVariant
  hasCloseButton?: boolean
  hasIcon?: boolean
  disabled?: boolean
  className: ClassValue
}

export const compoundsCreator = (
  color: CosTagColor,
  variant: CosTagVariant,
  entries: Omit<Compound, 'color' | 'variant'>[],
): (() => Compound[]) => {
  return () =>
    entries.map((entry) => ({
      color,
      variant,
      ...entry,
    }))
}
