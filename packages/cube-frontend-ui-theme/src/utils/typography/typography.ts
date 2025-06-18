import { cubeTheme } from '../../cubeTheme'
import {
  primaryBody1,
  primaryBody2,
  primaryBody3,
  primaryBody4,
  primaryBody5,
  primaryBody6,
} from './primaryBodies'
import {
  primaryH1,
  primaryH2,
  primaryH3,
  primaryH4,
  primaryH5,
} from './primaryHeadings'
import {
  secondaryBody1,
  secondaryBody2,
  secondaryBody3,
  secondaryBody4,
  secondaryBody5,
  secondaryBody6,
  secondaryBody7,
} from './secondaryBodies'
import {
  secondaryH1,
  secondaryH2,
  secondaryH3,
  secondaryH4,
  secondaryH5,
} from './secondaryHeadings'

export type Typography = {
  fontFamily: keyof (typeof cubeTheme)['fontFamily']
  fontSize: string
  lineHeight: string
  letterSpacing: string
  fontWeight: number
}

export const typographyMap = {
  'primary-h1': primaryH1,
  'primary-h2': primaryH2,
  'primary-h3': primaryH3,
  'primary-h4': primaryH4,
  'primary-h5': primaryH5,
  'secondary-h1': secondaryH1,
  'secondary-h2': secondaryH2,
  'secondary-h3': secondaryH3,
  'secondary-h4': secondaryH4,
  'secondary-h5': secondaryH5,
  'primary-body1': primaryBody1,
  'primary-body2': primaryBody2,
  'primary-body3': primaryBody3,
  'primary-body4': primaryBody4,
  'primary-body5': primaryBody5,
  'primary-body6': primaryBody6,
  'secondary-body1': secondaryBody1,
  'secondary-body2': secondaryBody2,
  'secondary-body3': secondaryBody3,
  'secondary-body4': secondaryBody4,
  'secondary-body5': secondaryBody5,
  'secondary-body6': secondaryBody6,
  'secondary-body7': secondaryBody7,
} as const

export type TypographyClassName = keyof typeof typographyMap

export const getTypography = (className: TypographyClassName): Typography => {
  return typographyMap[className]
}
