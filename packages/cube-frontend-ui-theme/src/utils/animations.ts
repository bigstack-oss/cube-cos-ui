import { KeyValuePair } from 'tailwindcss/types/config'

const skeletonAnimations = {
  'cos-skeleton': 'cos-skeleton 1.5s ease-in-out infinite',
} satisfies KeyValuePair

const dotSpinner45VectorShorthand = (vectorIndex: number) =>
  `cos-dot-spinner-45-vector-${vectorIndex} 1s linear infinite`

const dotSpinner45Animations = {
  'cos-dot-spinner-45-vector-0': dotSpinner45VectorShorthand(0),
  'cos-dot-spinner-45-vector-1': dotSpinner45VectorShorthand(1),
  'cos-dot-spinner-45-vector-2': dotSpinner45VectorShorthand(2),
  'cos-dot-spinner-45-vector-3': dotSpinner45VectorShorthand(3),
  'cos-dot-spinner-45-vector-4': dotSpinner45VectorShorthand(4),
  'cos-dot-spinner-45-vector-5': dotSpinner45VectorShorthand(5),
  'cos-dot-spinner-45-vector-6': dotSpinner45VectorShorthand(6),
  'cos-dot-spinner-45-vector-7': dotSpinner45VectorShorthand(7),
} satisfies KeyValuePair

const dotSpinner120VectorShorthand = (vectorIndex: number) =>
  `cos-dot-spinner-120-vector-${vectorIndex} 1s linear infinite`

const dotSpinner120Animations = {
  'cos-dot-spinner-120-vector-0': dotSpinner120VectorShorthand(0),
  'cos-dot-spinner-120-vector-1': dotSpinner120VectorShorthand(1),
  'cos-dot-spinner-120-vector-2': dotSpinner120VectorShorthand(2),
} satisfies KeyValuePair

const cubeSpinnerVectorShorthand = (vectorIndex: number) =>
  `cos-cube-spinner-vector-${vectorIndex} 1.25s linear infinite`

const cubeSpinnerAnimations = {
  'cos-cube-spinner-vector-0': cubeSpinnerVectorShorthand(0),
  'cos-cube-spinner-vector-1': cubeSpinnerVectorShorthand(1),
  'cos-cube-spinner-vector-2': cubeSpinnerVectorShorthand(2),
} satisfies KeyValuePair

export const cosAnimations = {
  ...skeletonAnimations,
  ...dotSpinner45Animations,
  ...dotSpinner120Animations,
  ...cubeSpinnerAnimations,
} satisfies KeyValuePair
