import { SvgComponent } from '@cube-frontend/ui-library'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosNumberSpan } from '../../internal/components/CosNumberSpan/CosNumberSpan'

const sideBarOption = cva(
  [
    'flex items-center justify-between',
    'w-[200px] bg-transparent px-[22px] py-[7px]',
    'secondary-body2 cursor-pointer font-medium text-functional-text transition',
  ],
  {
    variants: {
      isSelected: {
        true: 'bg-functional-hover-secondary font-semibold text-primary',
        false: 'hover:bg-functional-hover-grey',
      },
    },
  },
)

export type SideBarComboboxOptionProps = {
  Icon: SvgComponent
  label: string
  isSelected?: boolean
  notificationCount?: number
  onClick: () => void
}

export const SideBarComboboxOption = (props: SideBarComboboxOptionProps) => {
  const {
    Icon,
    isSelected = false,
    notificationCount = 0,
    label,
    onClick,
  } = props

  return (
    <div className={twMerge(sideBarOption({ isSelected }))} onClick={onClick}>
      <div className="flex items-center gap-x-3">
        <Icon className="icon-md" />
        <span>{label}</span>
      </div>
      {notificationCount !== 0 && <CosNumberSpan number={notificationCount} />}
    </div>
  )
}
