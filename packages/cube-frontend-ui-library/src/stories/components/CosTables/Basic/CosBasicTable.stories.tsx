import { CosStatus, CosTag } from '@cube-frontend/ui-library'
import { Meta, StoryObj } from '@storybook/react'
import { CosProgressBar } from '../../../../components/CosProgressBar/CosProgressBar'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { CustomSortingRule } from './CustomSortingRule'
import { mockNodes, NodeTable } from './utils'

const meta = {
  title: 'organisms/Tables/Basic',
  component: NodeTable,
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => (
    <StoryLayout title="Table - Basic">
      <StoryLayout.Section title="Default">
        <Default />
      </StoryLayout.Section>
      <StoryLayout.Section title="Sortable">
        <Sortable />
      </StoryLayout.Section>
      <StoryLayout.Section title="Sortable With Default State">
        <SortableWithDefaultState />
      </StoryLayout.Section>
      <StoryLayout.Section title="Custom Sorting Rule">
        <CustomSortingRule />
      </StoryLayout.Section>
      <StoryLayout.Section title="Fit Content">
        <FitContent />
      </StoryLayout.Section>
      <StoryLayout.Section title="No Result">
        <NoResult />
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <Skeleton />
      </StoryLayout.Section>
    </StoryLayout>
  ),
}

const Default = () => (
  <NodeTable rows={mockNodes}>
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
      {(cpu) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-1"
          progress={cpu}
        />
      )}
    </NodeTable.Column>
    <NodeTable.Column label="RAM" property="ram">
      {(ram) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-2"
          progress={ram}
        />
      )}
    </NodeTable.Column>
    <NodeTable.Column label="Partition" property="partition">
      {(partition) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-3"
          progress={partition}
        />
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

const Sortable = () => (
  <NodeTable rows={mockNodes}>
    <NodeTable.Column
      label="Hostname"
      property="hostname"
      emphasize={true}
      isSortable={true}
    />
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
      {(cpu) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-1"
          progress={cpu}
        />
      )}
    </NodeTable.Column>
    <NodeTable.Column label="RAM" property="ram" isSortable={true}>
      {(ram) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-2"
          progress={ram}
        />
      )}
    </NodeTable.Column>
    <NodeTable.Column label="Partition" property="partition">
      {(partition) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-3"
          progress={partition}
        />
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

const SortableWithDefaultState = () => (
  <NodeTable
    rows={mockNodes}
    defaultSortingState={{
      property: 'hostname',
      direction: 'descending',
    }}
  >
    <NodeTable.Column
      label="Hostname"
      property="hostname"
      emphasize={true}
      isSortable={true}
    />
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
      {(cpu) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-1"
          progress={cpu}
        />
      )}
    </NodeTable.Column>
    <NodeTable.Column label="RAM" property="ram" isSortable={true}>
      {(ram) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-2"
          progress={ram}
        />
      )}
    </NodeTable.Column>
    <NodeTable.Column label="Partition" property="partition">
      {(partition) => (
        <CosProgressBar
          className="min-w-[90px]"
          color="bg-chart-3"
          progress={partition}
        />
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

const FitContent = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <p className="primary-body3 text-functional-text">
        Hostname, Management IP, Running and Status columns fit their content.
      </p>
      <NodeTable rows={mockNodes}>
        <NodeTable.Column
          label="Hostname"
          property="hostname"
          emphasize={true}
          fitContent={true}
        />
        <NodeTable.Column
          label="Management IP"
          property="managementIp"
          fitContent={true}
        />
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
          {(cpu) => (
            <CosProgressBar
              className="min-w-[90px]"
              color="bg-chart-1"
              progress={cpu}
            />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="RAM" property="ram">
          {(ram) => (
            <CosProgressBar
              className="min-w-[90px]"
              color="bg-chart-2"
              progress={ram}
            />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="Partition" property="partition">
          {(partition) => (
            <CosProgressBar
              className="min-w-[90px]"
              color="bg-chart-3"
              progress={partition}
            />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="Running" property="running" fitContent={true}>
          {(running) => (
            <span className="text-nowrap">
              {running.toLocaleString('en-US')} days
            </span>
          )}
        </NodeTable.Column>
        <NodeTable.Column label="Status" property="status" fitContent={true}>
          {(status) => <CosStatus status={status} />}
        </NodeTable.Column>
      </NodeTable>
    </div>
  )
}

const NoResult = () => (
  <NodeTable rows={[]} isLoading={false}>
    <NodeTable.Column label="Hostname" />
    <NodeTable.Column label="Management IP" />
    <NodeTable.Column label="Role" />
    <NodeTable.Column label="License Expire" />
    <NodeTable.Column label="CPU" />
    <NodeTable.Column label="RAM" />
    <NodeTable.Column label="Partition" />
    <NodeTable.Column label="Running" />
    <NodeTable.Column label="Status" />
  </NodeTable>
)

const Skeleton = () => (
  <NodeTable rows={mockNodes} isLoading={true} skeletonRowCount={10}>
    <NodeTable.Column label="Regular" />
    <NodeTable.Column
      label="Subtext Vertical"
      skeletonVariant="subtext-vertical"
    />
    <NodeTable.Column
      label="Subtext Horizontal"
      property="role"
      skeletonVariant="subtext-horizontal"
    >
      {/* Skeleton works with custom render function as well. */}
      {(role) => (
        <CosTag color="blue" variant="filled">
          {role}
        </CosTag>
      )}
    </NodeTable.Column>
    <NodeTable.Column label="Icon Left" skeletonVariant="icon-left" />
    <NodeTable.Column label="Icon Right" skeletonVariant="icon-right" />
    <NodeTable.Column label="Icon Vertical" skeletonVariant="icon-vertical" />
    <NodeTable.Column label="Icon Only" skeletonVariant="icon-only" />
    <NodeTable.Column label="With Barchart" skeletonVariant="with-barchart" />
    <NodeTable.Column label="Status" skeletonVariant="status" />
  </NodeTable>
)
