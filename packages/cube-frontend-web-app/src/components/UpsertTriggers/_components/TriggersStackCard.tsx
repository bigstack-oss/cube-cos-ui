import { uniqueId } from 'lodash'
import { CosButton, CosStackCard, CosTag } from '@cube-frontend/ui-library'
import SubtractSquare from '@cube-frontend/ui-library/icons/monochrome/subtract_square.svg?react'

type TriggersStackCardProps = {
  title: string
  tags: string[]
  onRemoveClick: () => void
}

export const TriggersStackCard = (props: TriggersStackCardProps) => {
  const { title, tags, onRemoveClick } = props
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="grow">
        <CosStackCard title={title}>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <CosTag key={uniqueId()} color="blue" variant="stroke">
                {tag}
              </CosTag>
            ))}
          </div>
        </CosStackCard>
      </div>
      <CosButton
        type="ghost"
        usage="icon-left"
        Icon={SubtractSquare}
        onClick={onRemoveClick}
      >
        Remove
      </CosButton>
    </div>
  )
}
