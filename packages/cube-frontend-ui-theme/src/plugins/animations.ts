import { KeyValuePair } from 'tailwindcss/types/config'

const skeletonAnimations = {
  'cos-skeleton': 'cos-skeleton 1.5s ease-in-out infinite',
} satisfies KeyValuePair

export const cosAnimations = {
  ...skeletonAnimations,
} satisfies KeyValuePair
