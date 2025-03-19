import { useEffect, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { CosTag } from '../../../../components/CosTag/CosTag'
import { CosProgressBar } from '../../../../components/CosProgressBar/CosProgressBar'
import { CosStatus } from '../../../../components/CosStatus/CosStatus'
import { mockNodes, NodeTable } from './utils'

const meta = {
  title: 'organisms/Tables/Batch Action',
  component: NodeTable,
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => (
    <StoryLayout title="Table - Batch Action">
      <StoryLayout.Section title="Default">
        <Default />
      </StoryLayout.Section>
    </StoryLayout>
  ),
}

const Default = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

  const [isAllSelected, setIsAllSelected] = useState(false)

  const isRowSelected = (rowId: string) => selectedRowIds.includes(rowId)

  const handleSelectedRowsChange = (id: string) => {
    const newSelectedRows = isRowSelected(id)
      ? selectedRowIds.filter((selectedId) => id !== selectedId)
      : [...selectedRowIds, id]

    setSelectedRowIds(newSelectedRows)
  }

  const handleAllCheckChange = () => {
    setIsAllSelected((prev) => !prev)
  }

  const allNodeIds = () => {
    return mockNodes.map((node) => node.id)
  }

  useEffect(() => {
    if (isAllSelected) {
      setSelectedRowIds(allNodeIds())
    } else {
      setSelectedRowIds([])
    }
  }, [isAllSelected])

  return (
    <NodeTable
      rows={mockNodes}
      selectedRowIds={selectedRowIds}
      onCheckChange={handleSelectedRowsChange}
      onAllCheckChange={handleAllCheckChange}
    >
      <NodeTable.Column label="Hostname" property="hostname" emphasize={true} />
      <NodeTable.Column label="Management IP" property="managementIp" />
      <NodeTable.Column label="Role" property="role">
        {(role) => (
          <CosTag color="blue" variant="filled">
            {role}
          </CosTag>
        )}
      </NodeTable.Column>
      <NodeTable.Column label="License Expire" property="licenseExpire">
        {(licenseExpire) => licenseExpire.toLocaleDateString('en-US')}
      </NodeTable.Column>
      <NodeTable.Column label="CPU" property="cpu">
        {(cpu) => <CosProgressBar color="bg-chart-1" progress={cpu} />}
      </NodeTable.Column>
      <NodeTable.Column label="RAM" property="ram">
        {(ram) => <CosProgressBar color="bg-chart-2" progress={ram} />}
      </NodeTable.Column>
      <NodeTable.Column label="Partition" property="partition">
        {(partition) => (
          <CosProgressBar color="bg-chart-3" progress={partition} />
        )}
      </NodeTable.Column>
      <NodeTable.Column label="Running" property="running">
        {(running) => `${running.toLocaleString('en-US')} days`}
      </NodeTable.Column>
      <NodeTable.Column label="Status" property="status">
        {(status) => <CosStatus status={status} />}
      </NodeTable.Column>
    </NodeTable>
  )
}
