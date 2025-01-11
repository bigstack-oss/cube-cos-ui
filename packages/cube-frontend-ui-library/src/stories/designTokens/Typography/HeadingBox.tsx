import { cubePreset } from '@cube-frontend/ui-theme'
import { FontConfigurationInfo } from './FontConfigurationInfo'

const { fontFamily: _fontFamilyMap, fontSize: fontSizeMap } =
  cubePreset.theme.extend

export type HeadingBoxProps = {
  title: string
  fontFamily: keyof typeof _fontFamilyMap
  themeFontSizeKey: keyof typeof fontSizeMap
}

export const HeadingBox = (props: HeadingBoxProps) => {
  const { title, fontFamily, themeFontSizeKey } = props

  return (
    <div className="grid h-20 grid-cols-2 items-center gap-10">
      <div className={themeFontSizeKey}>{title}</div>
      <FontConfigurationInfo
        fontFamily={fontFamily}
        configuration={fontSizeMap[themeFontSizeKey]}
      />
    </div>
  )
}
