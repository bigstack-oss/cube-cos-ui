import { useEffect, useMemo, useRef, useState } from 'react'
import { scaleTime, brushX, select, type D3BrushEvent } from 'd3'
import dayjs, { Dayjs } from 'dayjs'
import { cubeTheme } from '@cube-frontend/ui-theme'
import { BrushFilterHandler } from './BrushFilterHandler'

export type DateTimeRange = [Dayjs, Dayjs]

type BrushFilter = {
  width: number
  height: number
  dateTimeRange: DateTimeRange
  selectedDateTimeRange?: DateTimeRange | null
  onSelectedDateTimeRangeChange: (range: DateTimeRange | null) => void
}

export const BrushFilter = (props: BrushFilter) => {
  const {
    width,
    height,
    dateTimeRange,
    selectedDateTimeRange,
    onSelectedDateTimeRangeChange,
  } = props
  const brushNodeRef = useRef<SVGGElement>(null)

  const xScale = useMemo(() => {
    const range = [0, width] as const
    return scaleTime().domain(dateTimeRange).range(range)
  }, [width, dateTimeRange])

  const [handleXOffset, setHandleXOffset] = useState<{
    left: number
    right: number
  } | null>(null)

  const brush = useMemo(() => {
    const handleBrushMove = (event: D3BrushEvent<Element>) => {
      const { selection, mode } = event

      // If user just click the brush without dragging, selection will be null.
      // In this case, we should reset the selection.
      if (!selection) {
        onSelectedDateTimeRangeChange(null)
        setHandleXOffset(null)
        return
      }

      if (selection[0] === selection[1]) {
        setHandleXOffset(null)
        return
      }

      const brushSelection = selection as [number, number]

      /**
       * Developers may see a `maximum update depth exceeded` error in the browser console,
       * because the brush event is triggered multiple times in a short period and updates the state.
       * Debounce or throttle are not suitable here, as they would affect the interaction experience.
       * We can safely ignore this for now, since the brush selection is updated correctly.
       */
      setHandleXOffset({
        left: brushSelection[0],
        right: brushSelection[1],
      })

      // If the mode is `undefined`, we should not update the selected date range,
      // since it was triggered by a manually `brush.move` to sync brush position.
      if (!mode) {
        return
      }

      const selectedDate = brushSelection
        .map(xScale.invert)
        .map(dayjs) as DateTimeRange
      onSelectedDateTimeRangeChange(selectedDate)
    }

    return brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('start', handleBrushMove)
      .on('brush', handleBrushMove)
      .on('end', handleBrushMove)
  }, [width, height, onSelectedDateTimeRangeChange, xScale.invert])

  useEffect(() => {
    const brushNode = brushNodeRef.current
    if (!brushNode) {
      return
    }

    select(brushNode).call(brush)

    return () => {
      select(brushNode).on('.brush', null).on('.end', null).on('.start', null)
    }
  }, [brush])

  /**
   * We can control d3-brush through the `brush.move` function.
   * Therefore, when the `width` changes, we need to update the brush selection manually
   * to ensure it displays correctly.
   */
  useEffect(() => {
    const brushNode = brushNodeRef.current

    if (!selectedDateTimeRange || !brushNode) {
      return
    }

    const selectedRange = selectedDateTimeRange
      .map((d) => d.toDate())
      .map(xScale) as [number, number]
    select(brushNode).call(brush.move, selectedRange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  /**
   * We can control d3-brush through the `brush.move` function.
   * Therefore, when the parent component sets `selectedDateTimeRange` to null,
   * we need to manually clear the brush selection.
   *
   * For example: the user changes dropdown date range.
   */
  useEffect(() => {
    const brushNode = brushNodeRef.current

    if (!brushNode || selectedDateTimeRange) {
      return
    }

    select(brushNode).call(brush.move, null)
  }, [brush.move, selectedDateTimeRange])

  return (
    <>
      <style>
        {`
          .selection {
            fill: ${cubeTheme.colors.primary[100]};
            fill-opacity: 0.4;
            stroke-width: 0px;
          }
        `}
      </style>
      <g ref={brushNodeRef} />
      {handleXOffset != null && (
        <>
          <BrushFilterHandler x={handleXOffset.left} height={height} />
          <BrushFilterHandler x={handleXOffset.right} height={height} />
        </>
      )}
    </>
  )
}
