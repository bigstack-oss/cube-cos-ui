import { cva } from 'class-variance-authority'
import { CosViewDetailsTableDetailItem } from '../CosBasicTable/cosTableUtils'

type DetailCellProps = {
  isExpanded: boolean
  title?: string
  items: CosViewDetailsTableDetailItem[]
}

const container = cva(
  [
    'flex flex-col gap-y-4 overflow-hidden',
    'transition-[max-height,padding-top,padding-bottom]',
  ],
  {
    variants: {
      isExpanded: {
        // TODO: `max-height` transition needs a fixed value (e.g., 400px) to
        // work properly. We could use something large like 9999px, but that
        // makes the animation look slow as it has to go from 0 to 9999.
        // 400px is chosen because it works well for all current use cases.
        // Consider making this value configurable, or look into a better way
        // to animate height.
        true: 'max-h-[400px] py-1.5 pr-8',
        false: 'max-h-0 p-0',
      },
    },
  },
)

export const DetailCell = (props: DetailCellProps) => {
  const { isExpanded, title, items } = props

  return (
    <div className={container({ isExpanded })}>
      {title && (
        <div className="primary-body4 text-functional-text-light">{title}</div>
      )}
      <div className="flex flex-wrap gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <span className="primary-body4 w-[80px] text-functional-text">
              {item.title}
            </span>
            <span className="primary-body5 w-[164px] text-functional-text-light">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
