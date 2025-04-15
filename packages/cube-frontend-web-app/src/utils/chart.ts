import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { CartesianTickOptions, FontSpec } from 'chart.js'

export const chartFontFamily = cubeTheme.fontFamily.inter[0]

export const getChartYAxisTitleFont = (): Partial<FontSpec> => {
  const body5 = cubeTheme.fontSize['primary-body5']
  const fontSize = Number(body5[0].replace('px', ''))
  const lineHeight = body5[1].lineHeight

  return {
    family: chartFontFamily,
    size: fontSize,
    lineHeight,
  }
}

export const getChartTicksOptions = (): Partial<CartesianTickOptions> => {
  const body4 = cubeTheme.fontSize['primary-body4']
  const fontSize = Number(body4[0].replace('px', ''))
  const lineHeight = body4[1].lineHeight

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
  const body2 = cubeTheme.fontSize['primary-body2']
  const fontSize = Number(body2[0].replace('px', ''))
  const lineHeight = body2[1].lineHeight
  const fontWeight = Number(cubeTheme.fontWeight.semibold)

  return {
    family: chartFontFamily,
    size: fontSize,
    weight: fontWeight,
    lineHeight,
  }
}

export const getChartTooltipBodyFont = (): Partial<FontSpec> => {
  const body3 = cubeTheme.fontSize['primary-body3']
  const fontSize = Number(body3[0].replace('px', ''))
  const lineHeight = body3[1].lineHeight

  return {
    family: chartFontFamily,
    size: fontSize,
    lineHeight,
  }
}
