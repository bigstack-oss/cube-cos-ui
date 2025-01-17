import { KeyValuePair } from 'tailwindcss/types/config'

const skeletonKeyframes = {
  'cos-skeleton': {
    '100%': {
      backgroundPositionX: '-20%',
    },
  },
} satisfies KeyValuePair<string, KeyValuePair<string, KeyValuePair>>

export const cosAnimationKeyframes = {
  ...skeletonKeyframes,
} satisfies KeyValuePair<string, KeyValuePair<string, KeyValuePair>>
