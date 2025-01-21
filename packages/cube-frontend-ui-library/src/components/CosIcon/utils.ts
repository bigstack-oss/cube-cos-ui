import { twMerge } from 'tailwind-merge'
import { IconSize } from './CosIcon'

const sizeClasses: Record<IconSize, Record<'container' | 'icon', string>> = {
  xs: {
    container: twMerge('icon-frame-xs'),
    icon: twMerge('icon-xs'),
  },
  sm: {
    container: twMerge('icon-frame-sm'),
    icon: twMerge('icon-sm'),
  },
  md: {
    container: twMerge('icon-frame-md'),
    icon: twMerge('icon-md'),
  },
  lg: {
    container: twMerge('icon-frame-lg'),
    icon: twMerge('icon-lg'),
  },
  xl: {
    container: twMerge('icon-frame-xl'),
    icon: twMerge('icon-xl'),
  },
}

export const getIconSizeClass = (size: IconSize) => {
  return sizeClasses[size].icon
}

export const getContainerClasses = (
  size: IconSize,
  classNameProps?: string,
) => {
  return twMerge(
    'inline-flex items-center justify-center',
    classNameProps,
    sizeClasses[size].container,
  )
}

export const getIconClasses = (size: IconSize, classNameProps?: string) => {
  return twMerge(classNameProps, getIconSizeClass(size))
}
