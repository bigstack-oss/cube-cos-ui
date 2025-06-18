import { getTypography, TypographyClassName } from '@cube-frontend/ui-theme'
import { FontConfigurationInfo } from './FontConfigurationInfo'

export type HeadingBoxProps = {
  title: string
  typographyClassName: TypographyClassName
}

export const HeadingBox = (props: HeadingBoxProps) => {
  const { title, typographyClassName } = props

  const typography = getTypography(typographyClassName)

  return (
    <div className="grid h-20 grid-cols-2 items-center gap-10">
      <div className={typographyClassName}>{title}</div>
      <FontConfigurationInfo typography={typography} />
    </div>
  )
}
