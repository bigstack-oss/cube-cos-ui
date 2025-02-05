import { SideBarBlock } from './SideBarBlock'
import {
  SideBarComboboxOption,
  SideBarComboboxOptionProps,
} from './SideBarComboboxOption'

export type SideBarComboboxProps = {
  // TODO: discussion naming
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
          onClick={option.onClick}
          isSelected={option.isSelected}
        />
      ))}
    </SideBarBlock>
  )
}

export default SideBarCombobox
