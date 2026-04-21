import { useMemo, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { mockTemplates, TemplateTable } from './utils'

const meta = {
  title: 'organisms/Tables/Batch Action',
  component: TemplateTable,
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => (
    <StoryLayout title="Table - Batch Action">
      <StoryLayout.Section title="Default">
        <Default />
      </StoryLayout.Section>
      <StoryLayout.Section title="Header Checkbox Hidden">
        <HeaderCheckboxHidden />
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <Skeleton />
      </StoryLayout.Section>
    </StoryLayout>
  ),
}

const Default = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

  const isRowSelected = (rowId: string) => selectedRowIds.includes(rowId)

  const handleSelectedRowsChange = (id: string) => {
    const newSelectedRows = isRowSelected(id)
      ? selectedRowIds.filter((selectedId) => id !== selectedId)
      : [...selectedRowIds, id]

    setSelectedRowIds(newSelectedRows)
  }

  const allTemplateIds = useMemo(
    () =>
      mockTemplates
        .filter((template) => !template.disabled)
        .map((template) => template.id),
    [],
  )

  const handleAllCheckChange = (checked: boolean) => {
    if (checked) {
      setSelectedRowIds(allTemplateIds)
    } else {
      setSelectedRowIds([])
    }
  }

  const disabledTemplateIds = useMemo(
    () =>
      mockTemplates
        .filter((template) => template.disabled)
        .map((template) => template.id),
    [],
  )

  return (
    <TemplateTable
      rows={mockTemplates}
      selectedRowIds={selectedRowIds}
      disabledRowIds={disabledTemplateIds}
      onCheckChange={handleSelectedRowsChange}
      showHeaderCheckbox={true}
      onAllCheckChange={handleAllCheckChange}
    >
      <TemplateTable.Column label="Template" property="template" />
      <TemplateTable.Column label="Description" property="description" />
    </TemplateTable>
  )
}

const HeaderCheckboxHidden = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

  const isRowSelected = (rowId: string) => selectedRowIds.includes(rowId)

  const disabledTemplateIds = useMemo(() => {
    return mockTemplates
      .filter((template) => template.disabled)
      .map((template) => template.id)
  }, [])

  const handleSelectedRowsChange = (id: string) => {
    const newSelectedRows = isRowSelected(id)
      ? selectedRowIds.filter((selectedId) => id !== selectedId)
      : [...selectedRowIds, id]

    setSelectedRowIds(newSelectedRows)
  }

  return (
    <TemplateTable
      rows={mockTemplates}
      selectedRowIds={selectedRowIds}
      disabledRowIds={disabledTemplateIds}
      onCheckChange={handleSelectedRowsChange}
      showHeaderCheckbox={false}
    >
      <TemplateTable.Column label="Template" property="template" />
      <TemplateTable.Column label="Description" property="description" />
    </TemplateTable>
  )
}

const Skeleton = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

  const isRowSelected = (rowId: string) => selectedRowIds.includes(rowId)

  const disabledTemplateIds = useMemo(() => {
    return mockTemplates
      .filter((template) => template.disabled)
      .map((template) => template.id)
  }, [])

  const handleSelectedRowsChange = (id: string) => {
    const newSelectedRows = isRowSelected(id)
      ? selectedRowIds.filter((selectedId) => id !== selectedId)
      : [...selectedRowIds, id]

    setSelectedRowIds(newSelectedRows)
  }

  return (
    <TemplateTable
      isLoading={true}
      rows={mockTemplates}
      selectedRowIds={selectedRowIds}
      disabledRowIds={disabledTemplateIds}
      onCheckChange={handleSelectedRowsChange}
      showHeaderCheckbox={true}
      onAllCheckChange={() => {}}
    >
      <TemplateTable.Column label="Template" property="template" />
      <TemplateTable.Column label="Description" property="description" />
    </TemplateTable>
  )
}
