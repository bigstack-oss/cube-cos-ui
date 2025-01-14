import classnames from 'classnames'

type CosStrokeType = 'regular' | 'dot'

export type CosStrokeProps = {
  type?: CosStrokeType
  hexColor?: string
}

const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

const getClassNames = (type: CosStrokeType) => {
  const typeClasses: Record<CosStrokeType, string> = {
    regular: 'border-functional-border-divider',
    dot: 'border-t-4 border-dotted border-primary-50',
  }

  return classnames(typeClasses[type])
}

export const CosStroke = (props: CosStrokeProps) => {
  const { type = 'regular', hexColor } = props

  const classNames = getClassNames(type)

  const style =
    !!hexColor && isValidHexColor(hexColor)
      ? { borderColor: hexColor }
      : undefined

  return <hr className={classNames} style={style} />
}
