import { uniqueId, upperFirst } from 'lodash'
import { CosButton, CosStackCard, CosTag } from '@cube-frontend/ui-library'
import Edit from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import Delete from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'

type TriggersStackCardProps = {
  title: string
  tags: string[]
  onEditClick: () => void
  onRemoveClick: () => void
}

export const TriggersStackCard = (props: TriggersStackCardProps) => {
  const { title, tags, onEditClick, onRemoveClick } = props
  return (
    <div className="flex items-center gap-4">
      <div className="grow">
        <CosStackCard title={title}>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <CosTag key={uniqueId(tag)} color="blue" variant="stroke">
                {upperFirst(tag)}
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
        />
        <CosButton
          type="ghost"
          usage="icon-only"
          Icon={Delete}
          onClick={onRemoveClick}
        />
      </div>
    </div>
  )
}
