import type { Meta, StoryObj } from '@storybook/react'
import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { DropdownBox } from './DropdownBox'
import { RadioButtonDropdown } from './RadioButtonDropdown'
import { CheckboxDropdown } from './CheckboxDropdown'

const meta = {
  title: 'Molecules/Dropdown',
  component: CosDropdown,
} satisfies Meta<typeof CosDropdown>

export default meta

export const Default: StoryObj = {
  args: {},
  render: function Render() {
    return (
      <StoryLayout title="Dropdown">
        <StoryLayout.Section title="Dropdown - Default">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Active</p>
            <p className="primary-body2 col-span-1">Active - Selected</p>
            <p className="primary-body2 col-span-1">Disabled</p>
            <p className="primary-body2 col-span-1">Disabled - Selected</p>
          </DropdownBox>
          {/**
           * ========================================
           * Default - Radio
           * ========================================
           */}
          <DropdownBox title="Radio">
            <RadioButtonDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RadioButtonDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <RadioButtonDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RadioButtonDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * Default - Radio - with searchbar
           * ========================================
           */}
          <DropdownBox title="Radio - with searchbar">
            <RadioButtonDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RadioButtonDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <RadioButtonDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RadioButtonDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
          </DropdownBox>
          {/**
           * ========================================
           * Default - Checkbox
           * ========================================
           */}
          <DropdownBox title="Checkbox">
            <CheckboxDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * Default - Checkbox - with searchbar
           * ========================================
           */}
          <DropdownBox title="Checkbox - with searchbar">
            <CheckboxDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
          </DropdownBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Dropdown - In Table">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Active</p>
            <p className="primary-body2 col-span-1">Active - Selected</p>
            <p className="primary-body2 col-span-1">Disabled</p>
            <p className="primary-body2 col-span-1">Disabled - Selected</p>
          </DropdownBox>
          {/**
           * ========================================
           * Default - Radio
           * ========================================
           */}
          <DropdownBox title="Radio">
            <RadioButtonDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RadioButtonDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <RadioButtonDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RadioButtonDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * Default - Radio - with searchbar
           * ========================================
           */}
          <DropdownBox title="Radio - with searchbar">
            <RadioButtonDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RadioButtonDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <RadioButtonDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RadioButtonDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
          </DropdownBox>
          {/**
           * ========================================
           * Default - Checkbox
           * ========================================
           */}
          <DropdownBox title="Checkbox">
            <CheckboxDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * Default - Checkbox - with searchbar
           * ========================================
           */}
          <DropdownBox title="Checkbox - with searchbar">
            <CheckboxDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
          </DropdownBox>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
