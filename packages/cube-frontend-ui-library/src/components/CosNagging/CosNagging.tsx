import { Home01 } from '../Icon/Home01'
import { CaretLeft } from '../Icon/CaretLeft'
import { PropsWithClassName } from '@cube-frontend/utils'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

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
    'flex h-full gap-[6px] rounded-md border bg-yellow-50 p-3',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      type: {
        error: 'border-status-negative',
        warning: 'border-status-warning',
      },
      variant: {
        sidebar: 'w-[184px] flex-col',
        top: '',
      },
    },
  },
)

// TODO: Will replace it with real Hyperlink component
const Hyperlink = (props: { text: string; href: string }) => (
  <div className="primary-body4 font-medium text-primary underline underline-offset-4">
    {props.text}
  </div>
)

export const CosNagging = (props: CosNaggingProps) => {
  const { className, type, variant, title } = props

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
    <div className={twMerge(nagging({ variant, type }), className)}>
      <div className="flex items-start gap-2">
        <IconComponent className="shrink-0" size="md" />
        {renderTitle()}
      </div>
      {renderDescription()}
      {renderLink()}
    </div>
  )
}
