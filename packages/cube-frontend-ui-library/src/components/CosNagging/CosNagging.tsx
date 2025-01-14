import classnames from 'classnames'
import { Home01 } from '../Icon/Home01'
import { CaretLeft } from '../Icon/CaretLeft'

export type CosNaggingType = 'error' | 'warning'

export type CosNaggingVariant = 'sidebar' | 'top'

export type CosNaggingProps = {
  type: CosNaggingType
  title: string
} & (
  | { variant: Extract<CosNaggingVariant, 'sidebar'>; description?: string }
  | { variant: Extract<CosNaggingVariant, 'top'>; description?: never }
) &
  ({ showLink: true; linkText: string; linkHref: string } | { showLink: false })

const getClassNames = (type: CosNaggingType, variant: CosNaggingVariant) => {
  const baseContainerClasses = classnames(
    'flex gap-[6px] rounded-md bg-yellow-50 p-3',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  )

  const typeContainerClasses: Record<CosNaggingType, string> = {
    error: 'border border-status-negative',
    warning: 'border border-status-warning',
  }

  const variantContainerClasses: Record<CosNaggingVariant, string> = {
    sidebar: 'max-w-[184px] flex-col',
    top: '',
  }

  return {
    containerClasses: classnames(
      baseContainerClasses,
      typeContainerClasses[type],
      variantContainerClasses[variant],
    ),
  }
}

// TODO: Will replace it with real Hyperlink component
const Hyperlink = (props: { text: string; href: string }) => (
  <div className="primary-body4 font-medium text-primary underline underline-offset-4">
    {props.text}
  </div>
)

export const CosNagging = (props: CosNaggingProps) => {
  const { type, variant, title, description, showLink } = props

  const { containerClasses } = getClassNames(type, variant)

  const isTypeWarning = type === 'warning'
  const isVariantSidebar = variant === 'sidebar'

  const IconComponent = isTypeWarning ? Home01 : CaretLeft

  const renderTitle = () => {
    if (showLink && !isVariantSidebar) {
      const { linkText, linkHref } = props
      return (
        <div className="flex flex-wrap items-center gap-2">
          <div className="primary-body4 font-semibold text-functional-title">
            {title}
          </div>
          <Hyperlink text={linkText} href={linkHref} />
        </div>
      )
    } else {
      return (
        <div className="primary-body4 font-semibold text-functional-title">
          {title}
        </div>
      )
    }
  }

  const renderDescription = () => {
    if (isVariantSidebar)
      return (
        <div className="primary-body4 text-functional-text">{description}</div>
      )
    return null
  }

  const renderLink = () => {
    if (isVariantSidebar && showLink) {
      const { linkText, linkHref } = props
      return <Hyperlink text={linkText} href={linkHref} />
    }
    return null
  }

  return (
    <div className={containerClasses}>
      {/** header */}
      <div className="flex items-start gap-2">
        {/** icon */}
        <IconComponent className="shrink-0" size="sm" />
        {/** title */}
        {renderTitle()}
      </div>
      {/** description */}
      {renderDescription()}
      {/** call to action */}
      {renderLink()}
    </div>
  )
}
