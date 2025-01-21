import { CosTag, CosTagColor, CosTagVariant } from '@cube-frontend/ui-library'
import TagIcon from '@cube-frontend/ui-library/icons/monochrome/tag.svg?react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type TagGridProps = {
  title: string
  color: CosTagColor
  variant: CosTagVariant
}

const gridClass = twMerge('grid grid-cols-3')

export const TagGrid = (props: TagGridProps) => {
  const { title, color, variant } = props

  const [isClosed, setIsClosed] = useState(false)

  const onClose = () => {
    setIsClosed(true)
  }

  return (
    <div className="flex flex-col gap-y-3 [&>*]:h-6">
      <h4 className="secondary-h4 text-center">{title}</h4>
      <div className={twMerge(gridClass, 'primary-body3')}>
        <span className="text-center">Text only</span>
        <span className="text-center">Close Button</span>
        <span className="text-center">Icon</span>
      </div>
      {/* Not disabled */}
      <div className={twMerge(gridClass, '[&>*]:justify-self-center')}>
        <CosTag color={color} variant={variant}>
          Text only
        </CosTag>
        {isClosed ? (
          <span />
        ) : (
          <CosTag
            color={color}
            variant={variant}
            showCloseButton={true}
            onClose={onClose}
          >
            Component
          </CosTag>
        )}
        <CosTag color={color} variant={variant} Icon={TagIcon}>
          With icon
        </CosTag>
      </div>
      {/* Disabled */}
      <div className={twMerge(gridClass, '[&>*]:justify-self-center')}>
        <CosTag color={color} variant={variant} disabled={true}>
          Text only
        </CosTag>
        <CosTag
          color={color}
          variant={variant}
          showCloseButton={true}
          disabled={true}
          onClose={onClose}
        >
          Component
        </CosTag>
        <CosTag color={color} variant={variant} Icon={TagIcon} disabled={true}>
          With icon
        </CosTag>
      </div>
    </div>
  )
}
