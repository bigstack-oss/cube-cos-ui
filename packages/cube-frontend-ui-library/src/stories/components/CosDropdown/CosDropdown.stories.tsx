import type { Meta, StoryObj } from '@storybook/react'
import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CheckboxDropdown } from './CheckboxDropdown'
import { DropdownBox } from './DropdownBox'
import { RegularDropdown } from './RegularDropdown'

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
        <StoryLayout.Section title="Dropdown">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Regular</p>
            <p className="primary-body2 col-span-1">Regular with searchbar</p>
            <p className="primary-body2 col-span-1">Checkbox</p>
            <p className="primary-body2 col-span-1">Checkbox with searchbar</p>
          </DropdownBox>
          <DropdownBox title="Master">
            <RegularDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
          </DropdownBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Active</p>
            <p className="primary-body2 col-span-1">Active - Selected</p>
            <p className="primary-body2 col-span-1">Disabled</p>
            <p className="primary-body2 col-span-1">Disabled - Selected</p>
          </DropdownBox>
          {/**
           * ========================================
           * Default - Regular
           * ========================================
           */}
          <DropdownBox title="Regular">
            <RegularDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * Default - Regular - with searchbar
           * ========================================
           */}
          <DropdownBox title="Regular - with searchbar">
            <RegularDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="default"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="default"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RegularDropdown
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
        <StoryLayout.Section title="With label">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Active</p>
            <p className="primary-body2 col-span-1">Active - Selected</p>
            <p className="primary-body2 col-span-1">Disabled</p>
            <p className="primary-body2 col-span-1">Disabled - Selected</p>
          </DropdownBox>
          {/**
           * ========================================
           * Default - Regular
           * ========================================
           */}
          <DropdownBox title="Regular">
            <RegularDropdown
              variant="default"
              label="Label"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="default"
              label="Label"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="default"
              label="Label"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="default"
              label="Label"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * Default - Regular - with searchbar
           * ========================================
           */}
          <DropdownBox title="Regular - with searchbar">
            <RegularDropdown
              variant="default"
              label="Label"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="default"
              label="Label"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="default"
              label="Label"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="default"
              label="Label"
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
              label="Label"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="default"
              label="Label"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="default"
              label="Label"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="default"
              label="Label"
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
              label="Label"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="default"
              label="Label"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="default"
              label="Label"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="default"
              label="Label"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
          </DropdownBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Default</p>
            <p className="primary-body2 col-span-1">Default - Label</p>
          </DropdownBox>
          <DropdownBox title="Skeleton">
            <CosDropdown
              isLoading={true}
              variant="default"
              selectedItems={[]}
              children={undefined}
            />
            <CosDropdown
              isLoading={true}
              variant="default"
              label="Label"
              selectedItems={[]}
              children={undefined}
            />
          </DropdownBox>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}

export const InTable: StoryObj = {
  args: {},
  render: function Render() {
    return (
      <StoryLayout
        title="Dropdown - Inside Table"
        desc=" The shape of dropdown - inside table please see “Table” page."
      >
        <StoryLayout.Section title="Dropdown - Inside Table">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Regular</p>
            <p className="primary-body2 col-span-1">Regular with searchbar</p>
            <p className="primary-body2 col-span-1">Checkbox</p>
            <p className="primary-body2 col-span-1">Checkbox with searchbar</p>
          </DropdownBox>
          <DropdownBox title="Master">
            <RegularDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
          </DropdownBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Active</p>
            <p className="primary-body2 col-span-1">Active - Selected</p>
            <p className="primary-body2 col-span-1">Disabled</p>
            <p className="primary-body2 col-span-1">Disabled - Selected</p>
          </DropdownBox>
          {/**
           * ========================================
           * In Table - Regular
           * ========================================
           */}
          <DropdownBox title="Regular">
            <RegularDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * In Table - Regular - with searchbar
           * ========================================
           */}
          <DropdownBox title="Regular - with searchbar">
            <RegularDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="in-table"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="in-table"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
          </DropdownBox>
          {/**
           * ========================================
           * In Table - Checkbox
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
           * In Table - Checkbox - with searchbar
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
        <StoryLayout.Section title="With label">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">Active</p>
            <p className="primary-body2 col-span-1">Active - Selected</p>
            <p className="primary-body2 col-span-1">Disabled</p>
            <p className="primary-body2 col-span-1">Disabled - Selected</p>
          </DropdownBox>
          {/**
           * ========================================
           * In Table - Regular
           * ========================================
           */}
          <DropdownBox title="Regular">
            <RegularDropdown
              variant="in-table"
              label="Label"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="in-table"
              label="Label"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="in-table"
              label="Label"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <RegularDropdown
              variant="in-table"
              label="Label"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * In Table - Regular - with searchbar
           * ========================================
           */}
          <DropdownBox title="Regular - with searchbar">
            <RegularDropdown
              variant="in-table"
              label="Label"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="in-table"
              label="Label"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="in-table"
              label="Label"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <RegularDropdown
              variant="in-table"
              label="Label"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
          </DropdownBox>
          {/**
           * ========================================
           * In Table - Checkbox
           * ========================================
           */}
          <DropdownBox title="Checkbox">
            <CheckboxDropdown
              variant="in-table"
              label="Label"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="in-table"
              label="Label"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="in-table"
              label="Label"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={false}
            />
            <CheckboxDropdown
              variant="in-table"
              label="Label"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={false}
            />
          </DropdownBox>
          {/**
           * ========================================
           * In Table - Checkbox - with searchbar
           * ========================================
           */}
          <DropdownBox title="Checkbox - with searchbar">
            <CheckboxDropdown
              variant="in-table"
              label="Label"
              isDisabled={false}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="in-table"
              label="Label"
              isDisabled={false}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="in-table"
              label="Label"
              isDisabled={true}
              hasDefaultValue={false}
              hasSearchbar={true}
            />
            <CheckboxDropdown
              variant="in-table"
              label="Label"
              isDisabled={true}
              hasDefaultValue={true}
              hasSearchbar={true}
            />
          </DropdownBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <DropdownBox title="">
            <p className="primary-body2 col-span-1">No label</p>
            <p className="primary-body2 col-span-1">With label</p>
          </DropdownBox>
          <DropdownBox title="Skeleton">
            <CosDropdown
              isLoading={true}
              variant="in-table"
              selectedItems={[]}
              children={undefined}
            />
            <CosDropdown
              isLoading={true}
              variant="in-table"
              label="Label"
              selectedItems={[]}
              children={undefined}
            />
          </DropdownBox>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
