import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosBreadcrumb } from '../../../components/CosBreadcrumb/CosBreadcrumb'
import { type CosBreadcrumbItemProps } from '../../../components/CosBreadcrumb/CosBreadcrumbItem'
import { BreadcrumbGrid } from './BreadcrumbGrid'
import { ItemContainer } from './ItemContainer'

const meta = {
  title: 'Molecules/Breadcrumb',
} satisfies Meta<typeof CosBreadcrumb>

export default meta

const items = [
  { label: 'Breadcrumb 1', href: '/#1' },
  { label: 'Breadcrumb 2', href: '/#2' },
  { label: 'Breadcrumb 3', href: '/#3' },
  { label: 'Breadcrumb 4', href: '/#4' },
  { label: 'Current Page' },
] satisfies CosBreadcrumbItemProps[]

const handleItemClick = (num: number) =>
  window.alert(`Breadcrumb item ${num} clicked`)

const itemsWithContainer = [
  {
    label: 'Breadcrumb 1',
    onClick: () => handleItemClick(1),
    itemContainer: {
      Component: ItemContainer,
      props: {},
    },
  },
  {
    label: 'Breadcrumb 2',
    onClick: () => handleItemClick(2),
    itemContainer: {
      Component: ItemContainer,
      props: {},
    },
  },
  {
    label: 'Breadcrumb 3',
    onClick: () => handleItemClick(3),
    itemContainer: {
      Component: ItemContainer,
      props: {},
    },
  },
  {
    label: 'Breadcrumb 4',
    onClick: () => handleItemClick(4),
    itemContainer: {
      Component: ItemContainer,
      props: {},
    },
  },
  { label: 'Current Page' },
] satisfies CosBreadcrumbItemProps[]

export const Gallery: StoryObj<typeof CosBreadcrumb> = {
  render: () => {
    return (
      <StoryLayout title="Breadcrumb">
        <StoryLayout.Section title="Breadcrumb">
          <BreadcrumbGrid title="Master">
            <CosBreadcrumb>
              {items.map((item) => (
                <CosBreadcrumb.Item key={item.label} {...item} />
              ))}
            </CosBreadcrumb>
          </BreadcrumbGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layout">
          <BreadcrumbGrid title="Previous 1">
            <CosBreadcrumb>
              {items.slice(3, 5).map((item) => (
                <CosBreadcrumb.Item key={item.label} {...item} />
              ))}
            </CosBreadcrumb>
          </BreadcrumbGrid>
          <BreadcrumbGrid title="Previous 2">
            <CosBreadcrumb>
              {items.slice(2, 5).map((item) => (
                <CosBreadcrumb.Item key={item.label} {...item} />
              ))}
            </CosBreadcrumb>
          </BreadcrumbGrid>
          <BreadcrumbGrid title="Previous 3">
            <CosBreadcrumb>
              {items.slice(1, 5).map((item) => (
                <CosBreadcrumb.Item key={item.label} {...item} />
              ))}
            </CosBreadcrumb>
          </BreadcrumbGrid>
          <BreadcrumbGrid title="Previous 4">
            <CosBreadcrumb>
              {items.map((item) => (
                <CosBreadcrumb.Item key={item.label} {...item} />
              ))}
            </CosBreadcrumb>
          </BreadcrumbGrid>
          <BreadcrumbGrid title="Item with container and onClick">
            <CosBreadcrumb>
              {itemsWithContainer.map((item) => (
                <CosBreadcrumb.Item key={item.label} {...item} />
              ))}
            </CosBreadcrumb>
          </BreadcrumbGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <BreadcrumbGrid title="Master">
            <CosBreadcrumb isLoading={true}>
              {items.map((item) => (
                <CosBreadcrumb.Item key={item.label} {...item} />
              ))}
            </CosBreadcrumb>
          </BreadcrumbGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
