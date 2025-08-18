import {
  CosViewDetailsTableDetailItem,
  useExpandedRowIdSet,
} from '@cube-frontend/ui-library'
import { Meta, StoryObj } from '@storybook/react'
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
      <StoryLayout.Section title="Custom Content Before Expand Button">
        <CustomContentBeforeExpandButton />
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
