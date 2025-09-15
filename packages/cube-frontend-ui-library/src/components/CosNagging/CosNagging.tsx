import { isArray } from 'lodash'
import WarningFilled from '../../components/CosIcon/monochrome/warning_filled.svg?react'
import WarningAltFilled from '../../components/CosIcon/monochrome/warning_alt_filled.svg?react'
import XSmallIcon from '@cube-frontend/ui-library/icons/monochrome/x_small.svg?react'
import { PropsWithClassName } from '@cube-frontend/utils'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosHyperlink, CosHyperlinkProps } from '../CosHyperlink/CosHyperlink'
import { SvgElement } from '../CosIcon/CosIcon'

export type CosNaggingType = 'error' | 'warning'

export type CosNaggingVariant = 'sidebar' | 'top'

export type CosNaggingLink = Pick<CosHyperlinkProps, 'href' | 'onClick'> & {
  text: CosHyperlinkProps['children']
}

export type CosNaggingProps = PropsWithClassName & {
  type: CosNaggingType
  title: string
  titleClassName?: string
  description?: string | string[]
  link?: CosNaggingLink
} & (
    | { variant: Extract<CosNaggingVariant, 'sidebar'> }
    | { variant: Extract<CosNaggingVariant, 'top'>; onClose?: () => void }
  )

const nagging = cva(
  [
    'flex flex-col gap-[6px] self-start rounded-md border bg-yellow-50 p-3',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      type: {
        error: 'border-status-negative',
        warning: 'border-status-warning',
      },
    },
  },
)

const descriptionContainerClass = twMerge('primary-body4 text-functional-text')
const typeIconBaseClass = twMerge('icon-md shrink-0')
const typeIcons: Record<CosNaggingType, SvgElement> = {
  error: (
    <WarningFilled
      className={twMerge(typeIconBaseClass, 'text-status-negative')}
    />
  ),
  warning: (
    <WarningAltFilled
      className={twMerge(typeIconBaseClass, 'text-status-warning')}
    />
  ),
}

export const CosNagging = (props: CosNaggingProps) => {
  const { className, type, variant, title, titleClassName, description, link } =
    props

  const isVariantSidebar = variant === 'sidebar'

  const icon = typeIcons[type]

  const renderTitle = () => {
    const titleElement = (
      <div
        className={twMerge(
          'primary-body4 font-semibold text-functional-title',
          titleClassName,
        )}
      >
        {title}
      </div>
    )

    if (!isVariantSidebar) {
      const { link } = props
      return (
        <div className="flex flex-wrap items-center gap-2">
          {titleElement}
          {link && (
            <CosHyperlink
              variant="text-inline"
              size="sm"
              href={link.href}
              onClick={link.onClick}
            >
              {link.text}
            </CosHyperlink>
          )}
        </div>
      )
    } else {
      return titleElement
    }
  }

  const renderCloseIcon = () => {
    if (isVariantSidebar) {
      return undefined
    }

    const { onClose } = props

    if (!onClose) {
      return null
    }

    return (
      <XSmallIcon
        className="icon-md cursor-pointer text-functional-text"
        onClick={onClose}
      />
    )
  }

  const renderDescription = () => {
    if (!description) {
      return null
    }

    const renderSingleDescription = (description: string) => {
      if (!description) {
        return null
      }

      return <div className={descriptionContainerClass}>{description}</div>
    }

    const renderDescriptionList = (description: string[]) => {
      if (description.length === 1) {
        return renderSingleDescription(description[0])
      }

      return (
        <div className={descriptionContainerClass}>
          <ul className="list-outside list-disc pl-4">
            {description.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )
    }

    return isArray(description)
      ? renderDescriptionList(description)
      : renderSingleDescription(description)
  }

  const renderBottomLink = () => {
    if (isVariantSidebar) {
      return (
        link && (
          <CosHyperlink
            variant="text-inline"
            size="sm"
            href={link.href}
            onClick={link.onClick}
          >
            {link.text}
          </CosHyperlink>
        )
      )
    }
    return undefined
  }

  return (
    <div className={twMerge(nagging({ type }), className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          {icon}
          {renderTitle()}
        </div>
        {renderCloseIcon()}
      </div>
      {renderDescription()}
      {renderBottomLink()}
    </div>
  )
}
