import type { Meta, StoryObj } from '@storybook/react'
import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  DropdownLayout,
  DropdownRowHeader,
  DropdownRow,
} from './DropdownLayout'

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
          <DropdownLayout title="">
            <DropdownRowHeader />
          </DropdownLayout>
          <DropdownLayout title="md">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={false}
              disabled={false}
              isNoData={false}
            />
          </DropdownLayout>
          <DropdownLayout title="sm">
            <DropdownRow
              size="sm"
              isLoading={false}
              selected={false}
              disabled={false}
              isNoData={false}
            />
          </DropdownLayout>
        </StoryLayout.Section>
        <StoryLayout.Section title="Status">
          <DropdownLayout title="">
            <DropdownRowHeader />
          </DropdownLayout>
          <DropdownLayout title="Unselected">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={false}
              disabled={false}
              isNoData={false}
            />
          </DropdownLayout>
          <DropdownLayout title="Unselected + Disabled">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={false}
              disabled={true}
              isNoData={false}
            />
          </DropdownLayout>
          <DropdownLayout title="Selected">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={true}
              disabled={false}
              isNoData={false}
            />
          </DropdownLayout>
          <DropdownLayout title="Selected  + Disabled">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={true}
              disabled={true}
              isNoData={false}
            />
          </DropdownLayout>
          <DropdownLayout title="No Data">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={false}
              disabled={false}
              isNoData={true}
            />
          </DropdownLayout>
          <DropdownLayout title="Loading">
            <DropdownRow
              size="md"
              isLoading={true}
              selected={true}
              disabled={true}
              isNoData={false}
            />
          </DropdownLayout>
        </StoryLayout.Section>
        <StoryLayout.Section title="w/Label">
          <DropdownLayout title="">
            <DropdownRowHeader />
          </DropdownLayout>
          <DropdownLayout title="Unselected">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={false}
              disabled={false}
              isNoData={false}
              label="Label"
            />
          </DropdownLayout>
          <DropdownLayout title="Unselected + Disabled">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={false}
              disabled={true}
              isNoData={false}
              label="Label"
            />
          </DropdownLayout>
          <DropdownLayout title="Selected">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={true}
              disabled={false}
              isNoData={false}
              label="Label"
            />
          </DropdownLayout>
          <DropdownLayout title="Selected  + Disabled">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={true}
              disabled={true}
              isNoData={false}
              label="Label"
            />
          </DropdownLayout>
          <DropdownLayout title="No Data">
            <DropdownRow
              size="md"
              isLoading={false}
              selected={false}
              disabled={false}
              isNoData={true}
              label="Label"
            />
          </DropdownLayout>
          <DropdownLayout title="Loading">
            <DropdownRow
              size="md"
              isLoading={true}
              selected={true}
              disabled={true}
              isNoData={false}
              label="Label"
            />
          </DropdownLayout>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
