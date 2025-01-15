import {
  CosIconFrame,
  IconSize,
  SvgComponent,
} from '../../../components/CosIcon/CosIcon'

type IconGalleryItemProps = {
  name: string
  size?: IconSize
  className?: string
  Component: SvgComponent
  onIconClick?: () => void
}

export const IconGalleryItem = (props: IconGalleryItemProps) => {
  const { name, size, className, Component, onIconClick } = props

  return (
    <div className="flex h-24 w-36 flex-col items-center justify-start gap-y-2 border p-3 transition-colors hover:bg-grey-200">
      <CosIconFrame size={size} className={className} onClick={onIconClick}>
        <Component />
      </CosIconFrame>
      <span className="max-w-full break-all text-center text-secondary-body6 text-functional-text-light">
        {name}
      </span>
    </div>
  )
}
