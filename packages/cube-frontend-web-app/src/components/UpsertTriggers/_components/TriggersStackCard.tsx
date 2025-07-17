import { uniqueId } from 'lodash'
import { CosButton, CosStackCard, CosTag } from '@cube-frontend/ui-library'
import Edit from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import Delete from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'

type TriggersStackCardProps = {
  title: string
  tags: string[]
  /**
   * @default false
   */
  actionsDisabled?: boolean
  onEditClick: () => void
  onRemoveClick: () => void
}

export const TriggersStackCard = (props: TriggersStackCardProps) => {
  const {
    title,
    tags,
    actionsDisabled = false,
    onEditClick,
    onRemoveClick,
  } = props
  return (
    <div className="flex items-center gap-4">
      <div className="grow">
        <CosStackCard title={title}>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <CosTag key={uniqueId(tag)} color="blue" variant="stroke">
                {tag}
              </CosTag>
            ))}
          </div>
        </CosStackCard>
      </div>
      <div className="flex items-center">
        <CosButton
          type="ghost"
          usage="icon-only"
          Icon={Edit}
          onClick={onEditClick}
          disabled={actionsDisabled}
        />
        <CosButton
          type="ghost"
          usage="icon-only"
          Icon={Delete}
          onClick={onRemoveClick}
          disabled={actionsDisabled}
        />
      </div>
    </div>
  )
}
