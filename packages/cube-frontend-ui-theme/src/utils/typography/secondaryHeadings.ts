import { Typography } from './typography'

const FONT_FAMILY = 'inter' satisfies Typography['fontFamily']
const LETTER_SPACING = '0.02em' as const
const FONT_WEIGHT = 600 as const

export const secondaryH1: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '30px',
  lineHeight: '38px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const secondaryH2: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '24px',
  lineHeight: '30px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const secondaryH3: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const secondaryH4: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const secondaryH5: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '16px',
  lineHeight: '20px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}
