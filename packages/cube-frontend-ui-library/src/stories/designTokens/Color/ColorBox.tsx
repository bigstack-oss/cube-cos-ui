import classNames from 'classnames'
import { useMemo } from 'react'
import { resolveThemeColor } from './utils'

export type ColorBoxProps = {
  colorName: string
  bgClassName: string
}

export const ColorBox = (props: ColorBoxProps) => {
  const { colorName, bgClassName } = props

  const hex = useMemo<string | undefined>(() => {
    return resolveThemeColor(bgClassName)
  }, [bgClassName])

  return (
    <div className="flex flex-col gap-y-2">
      <div className={classNames('h-[60px] w-[140px] rounded', bgClassName)} />
      <div>
        <p className="primary-body2 font-medium">{colorName}</p>
        {hex && (
          <p className="primary-body2 text-functional-text-light">{hex}</p>
        )}
      </div>
    </div>
  )
}
