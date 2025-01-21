import { twMerge } from 'tailwind-merge'
import { Compound, compoundsCreator } from './styleUtils'

const darkFilled = compoundsCreator('dark', 'filled', [
  // Base
  {
    disabled: false,
    className: twMerge('bg-dark-500 hover:bg-dark-400', 'text-grey-0'),
  },
  {
    disabled: true,
    className: twMerge('bg-functional-disable', 'text-grey-0'),
  },
  // Close button
  {
    hasCloseButton: true,
    disabled: false,
    className: twMerge('[&>svg]:text-dark-150 [&>svg]:hover:text-grey-0'),
  },
  {
    hasCloseButton: true,
    disabled: true,
    className: twMerge('[&>svg]:text-grey-0'),
  },
  // Icon
  {
    hasIcon: true,
    disabled: false,
    className: twMerge('[&>svg]:text-dark-150'),
  },
  {
    hasIcon: true,
    disabled: true,
    className: twMerge('[&>svg]:text-grey-0'),
  },
])

const darkStroke = compoundsCreator('dark', 'stroke', [
  // Base
  {
    disabled: false,
    className: twMerge(
      'bg-dark-50 hover:bg-dark-100',
      'text-functional-text',
      'border border-functional-text',
    ),
  },
  {
    disabled: true,
    className: twMerge(
      'bg-dark-0',
      'text-functional-border-divider',
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
    className: twMerge('[&>svg]:text-functional-border-divider'),
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
    className: twMerge('[&>svg]:text-functional-border-divider'),
  },
])

export const createDarkStyles = (): Compound[] =>
  darkFilled().concat(darkStroke())
