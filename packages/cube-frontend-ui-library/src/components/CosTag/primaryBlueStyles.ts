import { twMerge } from 'tailwind-merge'
import { Compound, compoundsCreator } from './styleUtils'

const primaryBlueFilled = compoundsCreator('primary-blue', 'filled', [
  // Base
  {
    disabled: false,
    className: twMerge(
      'bg-primary-200 hover:bg-primary-150',
      'text-functional-text',
    ),
  },
  {
    disabled: true,
    className: twMerge('bg-primary-50', 'text-functional-disable-text'),
  },
  // Close button
  {
    hasCloseButton: true,
    disabled: false,
    className: twMerge(
      '[&>svg]:text-grey-0 [&>svg]:hover:text-functional-text',
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

const primaryBlueStroke = compoundsCreator('primary-blue', 'stroke', [
  // Base
  {
    disabled: false,
    className: twMerge(
      'bg-primary-0 hover:bg-primary-50',
      'text-functional-text',
      'border border-primary-200',
    ),
  },
  {
    disabled: true,
    className: twMerge(
      'bg-primary-0',
      'text-functional-disable-text',
      'border border-primary-50',
    ),
  },
  // Close button
  {
    hasCloseButton: true,
    disabled: false,
    className: twMerge(
      '[&>svg]:text-primary-200 [&>svg]:hover:text-functional-text',
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
    className: twMerge('[&>svg]:text-primary-200'),
  },
  {
    hasIcon: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
])

export const createPrimaryBlueStyles = (): Compound[] =>
  primaryBlueFilled().concat(primaryBlueStroke())
