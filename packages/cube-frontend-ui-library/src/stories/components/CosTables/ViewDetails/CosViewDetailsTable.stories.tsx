import {
  CosViewDetailsTableDetailItem,
  useExpandedRowIdSet,
} from '@cube-frontend/ui-library'
import { Meta, StoryObj } from '@storybook/react-vite'
import { upperFirst } from 'lodash'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import {
  isCmpLicense,
  LicenseTable,
  MockLicense,
  mockLicenses,
} from './cosViewDetailsTableStoryUtils'

const meta = {
  title: 'organisms/Tables/View Details',
  component: LicenseTable,
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => (
    <StoryLayout title="Table - View Details">
      <StoryLayout.Section title="Default">
        <Default />
      </StoryLayout.Section>
      <StoryLayout.Section title="Without Title">
        <WithoutTitle />
      </StoryLayout.Section>
      <StoryLayout.Section title="Dynamic Content">
        <DynamicContent />
      </StoryLayout.Section>
      <StoryLayout.Section title="Custom Content">
        <CustomContent />
      </StoryLayout.Section>
      <StoryLayout.Section title="Custom Content Before Expand Button">
        <CustomContentBeforeExpandButton />
      </StoryLayout.Section>
      <StoryLayout.Section title="Disable Row Expand">
        <DisableRowExpand />
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <Skeleton />
      </StoryLayout.Section>
    </StoryLayout>
  ),
}

const Default = () => {
  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const getDetailItems = (
    license: MockLicense,
  ): CosViewDetailsTableDetailItem[] => {
    return [
      {
        title: 'Quantity',
        value: license.quantity,
      },
      {
        title: 'Support Plan',
        value: license.supportPlan,
      },
      {
        title: 'Feature',
        value: upperFirst(license.feature),
      },
    ]
  }

  return (
    <LicenseTable
      rows={mockLicenses}
      expandedRowIdSet={expandedRowIdSet}
      onExpandChange={onExpandChange}
      detailTitle="License Detail"
      getDetailItems={getDetailItems}
    >
      <LicenseTable.Column label="Product" property="product" />
      <LicenseTable.Column label="License name" property="name" />
      <LicenseTable.Column label="Hosts" property="hosts">
        {(hosts) => hosts.join(', ')}
      </LicenseTable.Column>
      <LicenseTable.Column label="Issue date" property="issueDate" />
      <LicenseTable.Column label="Expire date" property="expireDate" />
      <LicenseTable.Column label="Expired" property="expired" />
      <LicenseTable.Column label="Type" property="type" />
    </LicenseTable>
  )
}

const WithoutTitle = () => {
  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const getDetailItems = (
    license: MockLicense,
  ): CosViewDetailsTableDetailItem[] => {
    return [
      {
        title: 'Quantity',
        value: license.quantity,
      },
      {
        title: 'Support Plan',
        value: license.supportPlan,
      },
      {
        title: 'Feature',
        value: upperFirst(license.feature),
      },
    ]
  }

  return (
    <LicenseTable
      rows={mockLicenses}
      expandedRowIdSet={expandedRowIdSet}
      onExpandChange={onExpandChange}
      getDetailItems={getDetailItems}
    >
      <LicenseTable.Column label="Product" property="product" />
      <LicenseTable.Column label="License name" property="name" />
      <LicenseTable.Column label="Hosts" property="hosts">
        {(hosts) => hosts.join(', ')}
      </LicenseTable.Column>
      <LicenseTable.Column label="Issue date" property="issueDate" />
      <LicenseTable.Column label="Expire date" property="expireDate" />
      <LicenseTable.Column label="Expired" property="expired" />
      <LicenseTable.Column label="Type" property="type" />
    </LicenseTable>
  )
}

const DynamicContent = () => {
  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const getDetailTitle = (license: MockLicense): string => {
    let title = 'License Detail'
    if (isCmpLicense(license)) {
      title += ' (I have extra details)'
    }
    return title
  }

  const getDetailItems = (
    license: MockLicense,
  ): CosViewDetailsTableDetailItem[] => {
    const items: CosViewDetailsTableDetailItem[] = [
      {
        title: 'Quantity',
        value: license.quantity,
      },
      {
        title: 'Support Plan',
        value: license.supportPlan,
      },
      {
        title: 'Feature',
        value: upperFirst(license.feature),
      },
    ]

    if (isCmpLicense(license)) {
      items.push(
        {
          title: 'CMP Item A',
          value: 'AAA',
        },
        {
          title: 'CMP Item B',
          value: 'BBB',
        },
        {
          title: 'CMP Item C',
          value: 'CCC',
        },
        {
          title: 'CMP Item D',
          value: 'DDD',
        },
      )
    }

    return items
  }

  return (
    <LicenseTable
      rows={mockLicenses}
      expandedRowIdSet={expandedRowIdSet}
      onExpandChange={onExpandChange}
      detailTitle={getDetailTitle}
      getDetailItems={getDetailItems}
    >
      <LicenseTable.Column label="Product" property="product" />
      <LicenseTable.Column label="License name" property="name" />
      <LicenseTable.Column label="Hosts" property="hosts">
        {(hosts) => hosts.join(', ')}
      </LicenseTable.Column>
      <LicenseTable.Column label="Issue date" property="issueDate" />
      <LicenseTable.Column label="Expire date" property="expireDate" />
      <LicenseTable.Column label="Expired" property="expired" />
      <LicenseTable.Column label="Type" property="type" />
    </LicenseTable>
  )
}

const CustomContent = () => {
  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const getCustomizedDetailCell = (license: MockLicense) => {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="primary-body4 font-extrabold text-functional-text">{`This is a customized detail cell for ${license.name} license.`}</div>
        <div className="mt-2 flex flex-col flex-wrap gap-4">
          <div className="flex items-center gap-x-4">
            <span className="primary-body4 w-[80px] font-extrabold text-functional-hover-primary">
              Quantity
            </span>
            <span className="primary-body5 w-[164px] font-extrabold text-functional-text-light">
              {license.quantity}
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <span className="primary-body4 w-[80px] font-extrabold text-functional-hover-primary">
              Support Plan
            </span>
            <span className="primary-body5 w-[164px] font-extrabold text-functional-text-light">
              {license.supportPlan}
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <span className="primary-body4 w-[80px] font-extrabold text-functional-hover-primary">
              Feature
            </span>
            <span className="primary-body5 w-[164px] font-extrabold text-functional-text-light">
              {upperFirst(license.feature)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <LicenseTable
      rows={mockLicenses}
      expandedRowIdSet={expandedRowIdSet}
      onExpandChange={onExpandChange}
      getCustomizedDetailCell={getCustomizedDetailCell}
    >
      <LicenseTable.Column label="Product" property="product" />
      <LicenseTable.Column label="License name" property="name" />
      <LicenseTable.Column label="Hosts" property="hosts">
        {(hosts) => hosts.join(', ')}
      </LicenseTable.Column>
      <LicenseTable.Column label="Issue date" property="issueDate" />
      <LicenseTable.Column label="Expire date" property="expireDate" />
      <LicenseTable.Column label="Expired" property="expired" />
      <LicenseTable.Column label="Type" property="type" />
    </LicenseTable>
  )
}

const CustomContentBeforeExpandButton = () => {
  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const getDetailItems = (
    license: MockLicense,
  ): CosViewDetailsTableDetailItem[] => {
    return [
      {
        title: 'Quantity',
        value: license.quantity,
      },
      {
        title: 'Support Plan',
        value: license.supportPlan,
      },
      {
        title: 'Feature',
        value: upperFirst(license.feature),
      },
    ]
  }

  return (
    <LicenseTable
      rows={mockLicenses}
      expandedRowIdSet={expandedRowIdSet}
      onExpandChange={onExpandChange}
      detailTitle="License Detail"
      getDetailItems={getDetailItems}
      beforeExpandButton={() => (
        <span className="inline-flex size-4 items-center justify-center">
          <span className="size-[4.5px] rounded-full bg-cosmos-secondary" />
        </span>
      )}
    >
      <LicenseTable.Column label="Product" property="product" />
      <LicenseTable.Column label="License name" property="name" />
      <LicenseTable.Column label="Hosts" property="hosts">
        {(hosts) => hosts.join(', ')}
      </LicenseTable.Column>
      <LicenseTable.Column label="Issue date" property="issueDate" />
      <LicenseTable.Column label="Expire date" property="expireDate" />
      <LicenseTable.Column label="Expired" property="expired" />
      <LicenseTable.Column label="Type" property="type" />
    </LicenseTable>
  )
}

const DisableRowExpand = () => {
  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const getDetailItems = (
    license: MockLicense,
  ): CosViewDetailsTableDetailItem[] => {
    return [
      {
        title: 'Quantity',
        value: license.quantity,
      },
      {
        title: 'Support Plan',
        value: license.supportPlan,
      },
      {
        title: 'Feature',
        value: upperFirst(license.feature),
      },
    ]
  }

  return (
    <LicenseTable
      rows={mockLicenses}
      expandedRowIdSet={expandedRowIdSet}
      onExpandChange={onExpandChange}
      detailTitle="License Detail"
      getDetailItems={getDetailItems}
      isRowExpandDisabled={(row) => row.product === 'CubeCMP'}
    >
      <LicenseTable.Column label="Product" property="product" />
      <LicenseTable.Column label="License name" property="name" />
      <LicenseTable.Column label="Hosts" property="hosts">
        {(hosts) => hosts.join(', ')}
      </LicenseTable.Column>
      <LicenseTable.Column label="Issue date" property="issueDate" />
      <LicenseTable.Column label="Expire date" property="expireDate" />
      <LicenseTable.Column label="Expired" property="expired" />
      <LicenseTable.Column label="Type" property="type" />
    </LicenseTable>
  )
}

const Skeleton = () => {
  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const getDetailItems = (
    license: MockLicense,
  ): CosViewDetailsTableDetailItem[] => {
    return [
      {
        title: 'Quantity',
        value: license.quantity,
      },
      {
        title: 'Support Plan',
        value: license.supportPlan,
      },
      {
        title: 'Feature',
        value: license.feature,
      },
    ]
  }

  return (
    <LicenseTable
      isLoading={true}
      rows={mockLicenses}
      expandedRowIdSet={expandedRowIdSet}
      onExpandChange={onExpandChange}
      detailTitle="License Detail"
      getDetailItems={getDetailItems}
    >
      <LicenseTable.Column label="Product" property="product" />
      <LicenseTable.Column label="License name" property="name" />
      <LicenseTable.Column label="Hosts" property="hosts">
        {(hosts) => hosts.join(', ')}
      </LicenseTable.Column>
      <LicenseTable.Column label="Issue date" property="issueDate" />
      <LicenseTable.Column label="Expire date" property="expireDate" />
      <LicenseTable.Column label="Expired" property="expired" />
      <LicenseTable.Column label="Type" property="type" />
    </LicenseTable>
  )
}
