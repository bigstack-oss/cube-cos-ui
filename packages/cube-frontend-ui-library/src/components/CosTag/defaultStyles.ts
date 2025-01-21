import { twMerge } from 'tailwind-merge'
import { Compound, compoundsCreator } from './styleUtils'

const defaultFilled = compoundsCreator('default', 'filled', [
  // Base
  {
    disabled: false,
    className: twMerge(
      'bg-functional-border-divider hover:bg-grey-300',
      'text-functional-text',
    ),
  },
  {
    disabled: true,
    className: twMerge(
      'bg-functional-disable-light',
      'text-functional-disable-text',
    ),
  },
  // Close button
  {
    hasCloseButton: true,
    disabled: false,
    className: twMerge(
      '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
    ),
  },
  {
    hasCloseButton: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
  // Icon
  {
    hasIcon: true,
    disabled: false,
    className: twMerge('[&>svg]:text-functional-text-light'),
  },
  {
    hasIcon: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
])

const defaultStroke = compoundsCreator('default', 'stroke', [
  // Base
  {
    disabled: false,
    className: twMerge(
      'bg-functional-border-divider hover:bg-grey-300',
      'text-functional-text',
      'border border-functional-border-darker',
    ),
  },
  {
    disabled: true,
    className: twMerge(
      'bg-functional-disable-light',
      'text-functional-disable-text',
      'border border-functional-border-divider',
    ),
  },
  // Close button
  {
    hasCloseButton: true,
    disabled: false,
    className: twMerge(
      '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
    ),
  },
  {
    hasCloseButton: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
  // Icon
  {
    hasIcon: true,
    disabled: false,
    className: twMerge('[&>svg]:text-functional-text-light'),
  },
  {
    hasIcon: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
])

export const createDefaultStyles = (): Compound[] =>
  defaultFilled().concat(defaultStroke())
