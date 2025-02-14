import { SideBarBlock } from './SideBarBlock'
import {
  SideBarComboboxOption,
  SideBarComboboxOptionProps,
} from './SideBarComboboxOption'

export type SideBarComboboxProps = {
  options: SideBarComboboxOptionProps[]
}

const SideBarCombobox = (props: SideBarComboboxProps) => {
  const { options } = props

  return (
    <SideBarBlock className="py-4">
      {options.map((option) => (
        <SideBarComboboxOption
          key={option.label}
          label={option.label}
          Icon={option.Icon}
          isSelected={option.isSelected}
          notificationCount={option.notificationCount}
          onClick={option.onClick}
        />
      ))}
    </SideBarBlock>
  )
}

export default SideBarCombobox
