import { Home01 } from '../Icon/Home01'
import { CaretLeft } from '../Icon/CaretLeft'
import { PropsWithClassName } from '@cube-frontend/utils'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosHyperlink } from '../CosHyperlink/CosHyperlink'

export type CosNaggingType = 'error' | 'warning'

export type CosNaggingVariant = 'sidebar' | 'top'

export type CosNaggingProps = PropsWithClassName & {
  type: CosNaggingType
  title: string
} & (
    | { variant: Extract<CosNaggingVariant, 'sidebar'>; description?: string }
    | { variant: Extract<CosNaggingVariant, 'top'> }
  ) & { link?: { href: string; text: string } }

const nagging = cva(
  [
    'flex gap-[6px] self-start rounded-md border bg-yellow-50 p-3',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      type: {
        error: 'border-status-negative',
        warning: 'border-status-warning',
      },
      variant: {
        sidebar: 'flex-col',
        top: '',
      },
    },
  },
)

export const CosNagging = (props: CosNaggingProps) => {
  const { className, type, variant, title } = props

  const isTypeWarning = type === 'warning'
  const isVariantSidebar = variant === 'sidebar'

  const IconComponent = isTypeWarning ? Home01 : CaretLeft

  const renderTitle = () => {
    const titleElement = (
      <div className="primary-body4 font-semibold text-functional-title">
        {title}
      </div>
    )

    if (!isVariantSidebar) {
      const { link } = props
      return (
        <div className="flex flex-wrap items-center gap-2">
          {titleElement}
          {link && (
            <CosHyperlink variant="text-inline" size="sm" href={link.href}>
              {link.text}
            </CosHyperlink>
          )}
        </div>
      )
    } else {
      return titleElement
    }
  }

  const renderDescription = () => {
    if (isVariantSidebar) {
      const { description } = props
      return (
        <div className="primary-body4 text-functional-text">{description}</div>
      )
    }
    return undefined
  }

  const renderBottomLink = () => {
    if (isVariantSidebar) {
      const { link } = props
      return (
        link && (
          <CosHyperlink variant="text-inline" size="sm" href={link.href}>
            {link.text}
          </CosHyperlink>
        )
      )
    }
    return undefined
  }

  return (
    <div className={twMerge(nagging({ variant, type }), className)}>
      <div className="flex items-start gap-2">
        <IconComponent className="shrink-0" size="md" />
        {renderTitle()}
      </div>
      {renderDescription()}
      {renderBottomLink()}
    </div>
  )
}
