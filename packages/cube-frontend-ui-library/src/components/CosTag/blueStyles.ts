import { twMerge } from 'tailwind-merge'
import { Compound, compoundsCreator } from './styleUtils'

const blueFilled = compoundsCreator('blue', 'filled', [
  // Base
  {
    disabled: false,
    className: twMerge('bg-blue-200 hover:bg-blue-150', 'text-functional-text'),
  },
  {
    disabled: true,
    className: twMerge('bg-blue-50', 'text-functional-disable-text'),
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

const blueStroke = compoundsCreator('blue', 'stroke', [
  // Base
  {
    disabled: false,
    className: twMerge(
      'bg-blue-50 hover:bg-blue-100',
      'text-functional-text',
      'border border-primary-400',
    ),
  },
  {
    disabled: true,
    className: twMerge(
      'bg-blue-0',
      'text-functional-disable-text',
      'border border-primary-150',
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

export const createBlueStyles = (): Compound[] =>
  blueFilled().concat(blueStroke())
