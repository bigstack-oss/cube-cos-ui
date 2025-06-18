import { getTypography, TypographyClassName } from '@cube-frontend/ui-theme'
import classNames from 'classnames'
import { FontConfigurationInfo } from './FontConfigurationInfo'

export type BodyBoxProps = {
  title: string
  typographyClassName: TypographyClassName
  /**
   * @default false
   */
  includeExtraBold?: boolean
}

export const BodyBox = (props: BodyBoxProps) => {
  const { title, typographyClassName, includeExtraBold } = props

  const typography = getTypography(typographyClassName)

  return (
    <div
      className={classNames(
        'grid h-20 grid-cols-2 gap-10',
        typographyClassName,
      )}
    >
      <div className="grid grid-cols-4">
        <span className="font-normal">{title}</span>
        <span className="font-medium">{title}</span>
        <span className="font-semibold">{title}</span>
        {includeExtraBold && <span className="font-extrabold">{title}</span>}
      </div>
      <FontConfigurationInfo typography={typography} />
    </div>
  )
}
