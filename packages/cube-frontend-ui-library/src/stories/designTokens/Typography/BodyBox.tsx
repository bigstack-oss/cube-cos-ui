import { cubePreset } from '@cube-frontend/ui-theme'
import classNames from 'classnames'
import { FontConfigurationInfo } from './FontConfigurationInfo'

const { fontFamily: _fontFamilyMap, fontSize: fontSizeMap } =
  cubePreset.theme.extend

export type BodyBoxProps = {
  title: string
  fontFamily: keyof typeof _fontFamilyMap
  themeFontSizeKey: keyof typeof fontSizeMap
}

export const BodyBox = (props: BodyBoxProps) => {
  const { title, fontFamily, themeFontSizeKey } = props

  return (
    <div
      className={classNames(
        'grid h-20 grid-cols-2 items-center gap-10',
        themeFontSizeKey,
      )}
    >
      <div className="grid grid-cols-3">
        <span className="font-normal">{title}</span>
        <span className="font-medium">{title}</span>
        <span className="font-semibold">{title}</span>
      </div>
      <FontConfigurationInfo
        fontFamily={fontFamily}
        configuration={fontSizeMap[themeFontSizeKey]}
      />
    </div>
  )
}
