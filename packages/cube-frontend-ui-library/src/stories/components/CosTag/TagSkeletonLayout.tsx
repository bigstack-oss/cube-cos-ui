import { CosTag } from '@cube-frontend/ui-library'
import TagIcon from '@cube-frontend/ui-library/icons/monochrome/tag.svg?react'

export const TagSkeletonLayout = () => {
  return (
    <div className="grid w-[868px] grid-cols-[64px_1fr_1fr] gap-x-4">
      <div className="primary-body3 flex flex-col gap-y-3 [&>*]:h-6">
        <span />
        <span className="flex items-center">Default</span>
      </div>
      <div className="flex flex-col gap-y-3 [&>*]:h-6">
        <div className="primary-body3 grid grid-cols-3">
          <span className="text-center">Text only</span>
          <span className="text-center">Close Button</span>
          <span className="text-center">Icon</span>
        </div>
        <div className="grid grid-cols-3 [&>*]:justify-self-center">
          <CosTag color="default" variant="filled" isLoading={true}>
            {undefined}
          </CosTag>
          <CosTag
            color="default"
            variant="filled"
            showCloseButton={true}
            onClose={() => {}}
            isLoading={true}
          >
            {undefined}
          </CosTag>
          <CosTag
            color="default"
            variant="filled"
            Icon={TagIcon}
            isLoading={true}
          >
            {undefined}
          </CosTag>
        </div>
      </div>
    </div>
  )
}
