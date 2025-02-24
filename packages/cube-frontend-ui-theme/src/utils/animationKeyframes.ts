import { KeyValuePair } from 'tailwindcss/types/config'

const skeletonKeyframes = {
  'cos-skeleton': {
    '100%': {
      backgroundPositionX: '-20%',
    },
  },
} satisfies KeyValuePair<string, KeyValuePair<string, KeyValuePair>>

const dotSpinner45Keyframes = {
  'cos-dot-spinner-45-vector-0': {
    '0%, 100%': { opacity: '1' },
    '12.5%, 87.5%': { opacity: '0' },
  },
  'cos-dot-spinner-45-vector-1': {
    '0%, 25%, 100%': { opacity: '0' },
    '12.5%': { opacity: '1' },
  },
  'cos-dot-spinner-45-vector-2': {
    '0%, 12.5%, 37.5%, 100%': { opacity: '0' },
    '25%': { opacity: '1' },
  },
  'cos-dot-spinner-45-vector-3': {
    '0%, 25%, 50%, 100%': { opacity: '0' },
    '37.5%': { opacity: '1' },
  },
  'cos-dot-spinner-45-vector-4': {
    '0%, 37.5%, 62.5%, 100%': { opacity: '0' },
    '50%': { opacity: '1' },
  },
  'cos-dot-spinner-45-vector-5': {
    '0%, 50%, 75%, 100%': { opacity: '0' },
    '62.5%': { opacity: '1' },
  },
  'cos-dot-spinner-45-vector-6': {
    '0%, 62.5%, 87.5%, 100%': { opacity: '0' },
    '75%': { opacity: '1' },
  },
  'cos-dot-spinner-45-vector-7': {
    '0%, 75%, 100%': { opacity: '0' },
    '87.5%': { opacity: '1' },
  },
} satisfies KeyValuePair<string, KeyValuePair<string, KeyValuePair>>

const dotSpinner120Keyframes = {
  'cos-dot-spinner-120-vector-0': {
    '0%, 100%': { opacity: '1' },
    '33.3%, 66.6%': { opacity: '0' },
  },
  'cos-dot-spinner-120-vector-1': {
    '0%, 66.6%, 100%': { opacity: '0' },
    '33.3%': { opacity: '1' },
  },
  'cos-dot-spinner-120-vector-2': {
    '0%, 33.3%, 100%': { opacity: '0' },
    '66.6%': { opacity: '1' },
  },
} satisfies KeyValuePair<string, KeyValuePair<string, KeyValuePair>>

const cubeSpinnerKeyframes = {
  'cos-cube-spinner-vector-0': {
    '0%, 100%': { opacity: '1' },
    '33.3%, 66.6%': { opacity: '0' },
  },
  'cos-cube-spinner-vector-1': {
    '0%, 66.6%, 100%': { opacity: '0' },
    '33.3%': { opacity: '1' },
  },
  'cos-cube-spinner-vector-2': {
    '0%, 33.3%, 100%': { opacity: '0' },
    '66.6%': { opacity: '1' },
  },
} satisfies KeyValuePair<string, KeyValuePair<string, KeyValuePair>>

export const cosAnimationKeyframes = {
  ...skeletonKeyframes,
  ...dotSpinner45Keyframes,
  ...dotSpinner120Keyframes,
  ...cubeSpinnerKeyframes,
} satisfies KeyValuePair<string, KeyValuePair<string, KeyValuePair>>
