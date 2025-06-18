import { Typography } from './typography'

const FONT_FAMILY = 'inter' satisfies Typography['fontFamily']
const LETTER_SPACING = 'normal' as const
const FONT_WEIGHT = 400 as const

export const primaryBody1: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '15px',
  lineHeight: '22px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const primaryBody2: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const primaryBody3: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '13px',
  lineHeight: '18px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const primaryBody4: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const primaryBody5: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '11px',
  lineHeight: '15px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}

export const primaryBody6: Typography = {
  fontFamily: FONT_FAMILY,
  fontSize: '10px',
  lineHeight: '13px',
  letterSpacing: LETTER_SPACING,
  fontWeight: FONT_WEIGHT,
}
