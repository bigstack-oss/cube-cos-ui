import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { getTypography } from '@cube-frontend/ui-theme'
import { CartesianTickOptions, FontSpec } from 'chart.js'

export const chartFontFamily = cubeTheme.fontFamily.inter[0]

export const getChartYAxisTitleFont = (): Partial<FontSpec> => {
  const body5 = getTypography('primary-body5')
  const fontSize = Number(body5.fontSize.replace('px', ''))
  const lineHeight = body5.lineHeight

  return {
    family: chartFontFamily,
    size: fontSize,
    lineHeight,
  }
}

export const getChartTicksOptions = (): Partial<CartesianTickOptions> => {
  const body4 = getTypography('primary-body4')
  const fontSize = Number(body4.fontSize.replace('px', ''))
  const lineHeight = body4.lineHeight

  return {
    padding: 8,
    color: cubeTheme.colors.functional['text-light'],
    font: {
      family: chartFontFamily,
      size: fontSize,
      lineHeight,
    },
  }
}

export const getChartTooltipTitleFont = (): Partial<FontSpec> => {
  const body2 = getTypography('primary-body2')
  const fontSize = Number(body2.fontSize.replace('px', ''))
  const lineHeight = body2.lineHeight
  const fontWeight = Number(cubeTheme.fontWeight.semibold)

  return {
    family: chartFontFamily,
    size: fontSize,
    weight: fontWeight,
    lineHeight,
  }
}

export const getChartTooltipBodyFont = (): Partial<FontSpec> => {
  const body3 = getTypography('primary-body3')
  const fontSize = Number(body3.fontSize.replace('px', ''))
  const lineHeight = body3.lineHeight

  return {
    family: chartFontFamily,
    size: fontSize,
    lineHeight,
  }
}
