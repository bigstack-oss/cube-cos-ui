import { CosTagColor } from '@cube-frontend/ui-library'
import { TagGrid } from './TagGrid'

export type TagLayoutProps = {
  color: CosTagColor
}

export const TagLayout = (props: TagLayoutProps) => {
  const { color } = props

  return (
    <div className="grid w-[868px] grid-cols-[64px_1fr_1fr] gap-x-4">
      <div className="primary-body3 flex flex-col gap-y-3 [&>*]:h-6">
        <span />
        <span />
        <span className="flex items-center">Default</span>
        <span className="flex items-center">Disabled</span>
      </div>
      <TagGrid title="Filled" color={color} variant="filled" />
      <TagGrid title="Stroke" color={color} variant="stroke" />
    </div>
  )
}
