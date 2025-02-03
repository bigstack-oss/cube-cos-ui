import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'
import { CosDropdownItemType } from '../../../components/CosDropdown/cosDropdownUtils'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { DropdownBox } from './DropdownBox'

const meta = {
  title: 'Molecules/Dropdown',
  component: CosDropdown,
} satisfies Meta<typeof CosDropdown>

export default meta

const options: CosDropdownItemType[] = [
  {
    key: 'option1',
    label: 'Taiwan',
    disabled: false,
  },
  {
    key: 'option2',
    label: 'Thailand',
    disabled: false,
  },
  {
    key: 'option3',
    label: 'South Korea',
    disabled: false,
  },
  {
    key: 'option4',
    label: 'North Korea',
    disabled: true,
  },
]

export const Default: StoryObj = {
  args: {},
  render: function Render() {
    const [selectedItemsRadio, setSelectedItemsRadio] = useState<
      CosDropdownItemType[]
    >([])
    // const [selectedItemsCheckbox, setSelectedItemsCheckbox] = useState<
    //   CosDropdownItemType[]
    // >([])

    const onSelectedItemsChangeRadio = (selectedItem: CosDropdownItemType) => {
      setSelectedItemsRadio([selectedItem])
    }

    // const onSelectedItemsChangeCheckbox = (
    //   selectedItem: CosDropdownItemType,
    // ) => {
    //   setSelectedItemsCheckbox((prevItems) => {
    //     const isSelected = selectedItemsCheckbox.some(
    //       (item) => item.key === selectedItem.key,
    //     )
    //     return isSelected
    //       ? prevItems.filter((item) => item.key !== selectedItem.key)
    //       : [...prevItems, selectedItem]
    //   })
    // }

    return (
      <StoryLayout title="Dropdown">
        <StoryLayout.Section title="Dropdown">
          <div className="mb-20 flex flex-col gap-y-8">
            <DropdownBox title="">
              <div className="primary-body2">Trigger</div>
              <div className="primary-body2">Combobox / Radio Button</div>
              <div className="primary-body2">Combobox / Checkbox</div>
            </DropdownBox>
            <DropdownBox title="Master">
              <CosDropdown
                variant="default"
                type="radio"
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Trigger />
              </CosDropdown>
              <CosDropdown
                variant="default"
                type="radio"
                isOpen={true}
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Content className="top-[-20px]">
                  {options.map((option) => (
                    <CosDropdown.Item
                      key={option.key}
                      value={option.key}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </CosDropdown.Item>
                  ))}
                </CosDropdown.Content>
              </CosDropdown>
            </DropdownBox>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <div className="mb-20 flex flex-col gap-y-8">
            <DropdownBox title="Radio">
              <CosDropdown
                variant="default"
                type="radio"
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Trigger />
                <CosDropdown.Content>
                  {options.map((option) => (
                    <CosDropdown.Item
                      key={option.key}
                      value={option.key}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </CosDropdown.Item>
                  ))}
                </CosDropdown.Content>
              </CosDropdown>
            </DropdownBox>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}

export const InTable: StoryObj = {
  args: {},
  render: function Render() {
    const [selectedItemsRadio, setSelectedItemsRadio] = useState<
      CosDropdownItemType[]
    >([])
    // const [selectedItemsCheckbox, setSelectedItemsCheckbox] = useState<
    //   CosDropdownItemType[]
    // >([])

    const onSelectedItemsChangeRadio = (selectedItem: CosDropdownItemType) => {
      setSelectedItemsRadio([selectedItem])
    }

    // const onSelectedItemsChangeCheckbox = (
    //   selectedItem: CosDropdownItemType,
    // ) => {
    //   setSelectedItemsCheckbox((prevItems) => {
    //     const isSelected = selectedItemsCheckbox.some(
    //       (item) => item.key === selectedItem.key,
    //     )
    //     return isSelected
    //       ? prevItems.filter((item) => item.key !== selectedItem.key)
    //       : [...prevItems, selectedItem]
    //   })
    // }

    return (
      <StoryLayout title="Dropdown - Inside Table">
        <StoryLayout.Section title="Dropdown - Inside Table">
          <div className="mb-16 flex flex-col gap-y-8">
            <DropdownBox title="">
              <div className="primary-body2">Trigger</div>
              <div className="primary-body2">Combobox / Radio Button</div>
              <div className="primary-body2">Combobox / Checkbox</div>
            </DropdownBox>
            <DropdownBox title="Master">
              <CosDropdown
                variant="in-table"
                type="radio"
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Trigger />
              </CosDropdown>
              <CosDropdown
                variant="in-table"
                type="radio"
                isOpen={true}
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Content className="top-[-16px]">
                  {options.map((option) => (
                    <CosDropdown.Item
                      key={option.key}
                      value={option.key}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </CosDropdown.Item>
                  ))}
                </CosDropdown.Content>
              </CosDropdown>
            </DropdownBox>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <div className="mb-20 flex flex-col gap-y-8">
            <DropdownBox title="Radio">
              <CosDropdown
                variant="in-table"
                type="radio"
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Trigger />
                <CosDropdown.Content>
                  {options.map((option) => (
                    <CosDropdown.Item
                      key={option.key}
                      value={option.key}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </CosDropdown.Item>
                  ))}
                </CosDropdown.Content>
              </CosDropdown>
            </DropdownBox>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}

export const Filter: StoryObj = {
  args: {},
  render: function Render() {
    const [selectedItemsRadio, setSelectedItemsRadio] = useState<
      CosDropdownItemType[]
    >([])
    // const [selectedItemsCheckbox, setSelectedItemsCheckbox] = useState<
    //   CosDropdownItemType[]
    // >([])

    const onSelectedItemsChangeRadio = (selectedItem: CosDropdownItemType) => {
      setSelectedItemsRadio([selectedItem])
    }

    // const onSelectedItemsChangeCheckbox = (
    //   selectedItem: CosDropdownItemType,
    // ) => {
    //   setSelectedItemsCheckbox((prevItems) => {
    //     const isSelected = selectedItemsCheckbox.some(
    //       (item) => item.key === selectedItem.key,
    //     )
    //     return isSelected
    //       ? prevItems.filter((item) => item.key !== selectedItem.key)
    //       : [...prevItems, selectedItem]
    //   })
    // }

    return (
      <StoryLayout title="Dropdown - Filter">
        <StoryLayout.Section title="Dropdown - Filter">
          <div className="mb-20 flex flex-col gap-y-8">
            <DropdownBox title="">
              <div className="primary-body2">Trigger</div>
              <div className="primary-body2">Combobox / Radio Button</div>
              <div className="primary-body2">Combobox / Checkbox</div>
            </DropdownBox>
            <DropdownBox title="Master">
              <CosDropdown
                variant="filter"
                type="radio"
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Trigger />
              </CosDropdown>
              <CosDropdown
                variant="filter"
                type="radio"
                isOpen={true}
                isLoading
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Content className="top-[-16px]">
                  {options.map((option) => (
                    <CosDropdown.Item
                      key={option.key}
                      value={option.key}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </CosDropdown.Item>
                  ))}
                </CosDropdown.Content>
              </CosDropdown>
            </DropdownBox>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <div className="mb-20 flex flex-col gap-y-8">
            <DropdownBox title="Radio">
              <CosDropdown
                variant="filter"
                type="radio"
                selectedItems={selectedItemsRadio}
                onSelectedItemsChange={onSelectedItemsChangeRadio}
              >
                <CosDropdown.Trigger />
                <CosDropdown.Content>
                  {options.map((option) => (
                    <CosDropdown.Item
                      key={option.key}
                      value={option.key}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </CosDropdown.Item>
                  ))}
                </CosDropdown.Content>
              </CosDropdown>
            </DropdownBox>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
