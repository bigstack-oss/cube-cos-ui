import { twMerge } from 'tailwind-merge'
import { Compound, compoundsCreator } from './styleUtils'

const cyanFilled = compoundsCreator('cyan', 'filled', [
  // Base
  {
    disabled: false,
    className: twMerge(
      'bg-secondary-200 hover:bg-secondary-150',
      'text-functional-text',
    ),
  },
  {
    disabled: true,
    className: twMerge('bg-secondary-50', 'text-functional-disable-text'),
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

const cyanStroke = compoundsCreator('cyan', 'stroke', [
  // Base
  {
    disabled: false,
    className: twMerge(
      'bg-secondary-50 hover:bg-secondary-100',
      'text-functional-text',
      'border border-secondary-600',
    ),
  },
  {
    disabled: true,
    className: twMerge(
      'bg-secondary-0',
      'text-functional-disable-text',
      'border border-secondary-150',
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

export const createCyanStyles = (): Compound[] =>
  cyanFilled().concat(cyanStroke())
