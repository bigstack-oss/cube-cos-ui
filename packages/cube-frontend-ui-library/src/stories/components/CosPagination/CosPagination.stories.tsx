import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosPagination } from '../../../components/CosPagination/CosPagination'
import { useState } from 'react'

const meta = {
  title: 'Molecules/Pagination',
  component: CosPagination,
} satisfies Meta<typeof CosPagination>

export default meta

export const Default: StoryObj = {
  args: {},
  render: function Render() {
    const [currentPage, setCurrentPage] = useState(100)
    const totalItems = 1203

    return (
      <StoryLayout
        title="Pagination"
        desc="The page text input share the same interaction with “Text Input” and the height change to 28px. The amount dropdown share the same interaction with “Dropdown” and the height change to 28px."
      >
        <StoryLayout.Section title="Pagination">
          <CosPagination
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <CosPagination
            isLoading={true}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
