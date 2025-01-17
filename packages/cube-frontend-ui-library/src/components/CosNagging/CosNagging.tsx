import classnames from 'classnames'
import { Home01 } from '../Icon/Home01'
import { CaretLeft } from '../Icon/CaretLeft'
import { PropsWithClassName } from '@cube-frontend/utils'

export type CosNaggingType = 'error' | 'warning'

export type CosNaggingVariant = 'sidebar' | 'top'

export type CosNaggingProps = PropsWithClassName & {
  type: CosNaggingType
  title: string
} & (
    | { variant: Extract<CosNaggingVariant, 'sidebar'>; description?: string }
    | { variant: Extract<CosNaggingVariant, 'top'> }
  ) & { link?: { href: string; text: string } }

const getClassNames = (type: CosNaggingType, variant: CosNaggingVariant) => {
  const baseContainerClasses = classnames(
    'flex h-full min-w-[184px] gap-[6px] rounded-md bg-yellow-50 p-3',
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
  const { className, type, variant, title } = props

  const { containerClasses } = getClassNames(type, variant)

  const isTypeWarning = type === 'warning'
  const isVariantSidebar = variant === 'sidebar'

  const IconComponent = isTypeWarning ? Home01 : CaretLeft

  const renderTitle = () => {
    if (!isVariantSidebar) {
      const { link } = props
      return (
        <div className="flex flex-wrap items-center gap-2">
          <div className="primary-body4 font-semibold text-functional-title">
            {title}
          </div>
          {link && <Hyperlink text={link.text} href={link.href} />}
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
    if (isVariantSidebar) {
      const { description } = props
      return (
        <div className="primary-body4 text-functional-text">{description}</div>
      )
    }
  }

  const renderLink = () => {
    if (isVariantSidebar) {
      const { link } = props
      return link && <Hyperlink text={link.text} href={link.href} />
    }
  }

  return (
    <div className={classnames(containerClasses, className)}>
      <div className="flex items-start gap-2">
        <IconComponent className="shrink-0" size="md" />
        {renderTitle()}
      </div>
      {renderDescription()}
      {renderLink()}
    </div>
  )
}
