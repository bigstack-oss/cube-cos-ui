import { Fragment } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosButton } from '@cube-frontend/ui-library'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'

const panel = cva(
  [
    'flex flex-col gap-y-4 overflow-hidden rounded-[5px]',
    'bg-grey-0 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]',
    'transition-[width] duration-300',
  ],
  {
    variants: {
      isPanelOpen: {
        true: 'w-1/2 p-6',
        false: 'w-0 whitespace-nowrap',
      },
    },
  },
)

type AttributeResultPanelProps = {
  isPanelOpen: boolean
  onPanelClose: () => void
  resultIds: string[]
}

export const AttributeResultPanel = (props: AttributeResultPanelProps) => {
  const { isPanelOpen, resultIds, onPanelClose } = props

  const renderResultIds = () => {
    if (resultIds.length === 0)
      return <p className="primary-body4 text-functional-text">No Result</p>
    return (
      <Fragment>
        {resultIds.map((id) => (
          <p id={id} className="primary-body4 text-functional-text">
            {id}
          </p>
        ))}
      </Fragment>
    )
  }

  return (
    <div className={twMerge(panel({ isPanelOpen }))}>
      <div className="flex items-center justify-between">
        <h4 className="secondary-h4 text-functional-title">Attribute Result</h4>
        <CosButton
          className="rounded-full text-functional-text"
          type="ghost"
          usage="icon-only"
          Icon={X}
          onClick={onPanelClose}
        />
      </div>
      <p className="primary-body3 text-functional-text-light">
        The right panel displays real-time values of the selected attributes.
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
        {renderResultIds()}
      </div>
    </div>
  )
}
