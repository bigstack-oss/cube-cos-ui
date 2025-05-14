import { CosDetailsTable } from '@cube-frontend/ui-library'
import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'

const meta = {
  title: 'organisms/Tables/Details',
  component: CosDetailsTable,
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => (
    <StoryLayout title="Table - Details">
      <StoryLayout.Section title="Default">
        <Default />
      </StoryLayout.Section>
    </StoryLayout>
  ),
}

const Default = () => {
  return (
    <CosDetailsTable header="Header">
      <CosDetailsTable.Row title="Title 1">Content 1</CosDetailsTable.Row>
      <CosDetailsTable.Row title="Title 2">Content 2</CosDetailsTable.Row>
      <CosDetailsTable.Row title="Title 3">Content 3</CosDetailsTable.Row>
      <CosDetailsTable.Row title="Title 4">Content 4</CosDetailsTable.Row>
      <CosDetailsTable.Row title="Title 5">Content 5</CosDetailsTable.Row>
    </CosDetailsTable>
  )
}
