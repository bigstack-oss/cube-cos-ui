import { cva } from 'class-variance-authority'

export const progressCva = cva('absolute h-full', {
  variants: {
    isFull: {
      true: 'rounded-full',
      false: 'rounded-l-full',
    },
  },
})

const MIN_TRACK_WIDTH = 16
const MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE = 4

export const calculateFillWidthPercentage = (
  progressProp: number,
  barWidth: number,
): number => {
  if (progressProp >= 100) {
    return 100
  }

  if (progressProp <= 0 || barWidth <= MIN_TRACK_WIDTH) {
    return progressProp
  }

  let progress = progressProp
  let filledWidth = 0
  let blankWidth = 0

  const updateWidths = (): void => {
    filledWidth = barWidth * (progress / 100)
    blankWidth = barWidth - filledWidth
  }

  updateWidths()

  if (filledWidth < MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE) {
    while (filledWidth < MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE && progress < 100) {
      progress++
      updateWidths()
    }
  } else if (blankWidth < MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE) {
    while (blankWidth < MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE && progress > 0) {
      progress--
      updateWidths()
    }
  }

  return progress
}
