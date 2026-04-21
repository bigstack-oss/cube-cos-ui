import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosPagination } from '../../../components/CosPagination/CosPagination'
import { DEFAULT_ITEMS_PER_PAGE } from '../../../components/CosPagination/cosPaginationUtils'

const meta = {
  title: 'Molecules/Pagination',
  component: CosPagination,
} satisfies Meta<typeof CosPagination>

export default meta

type Story = StoryObj<typeof CosPagination>

export const Default: Story = {
  args: { totalItems: 1203 },
  render: function Render(props) {
    const { totalItems } = props

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)

    return (
      <StoryLayout
        title="Pagination"
        desc="The page text input share the same interaction with “Text Input” and the height change to 28px. The amount dropdown share the same interaction with “Dropdown” and the height change to 28px."
      >
        <StoryLayout.Section title="Pagination">
          <div className="flex flex-col items-center gap-y-12">
            <div className="flex w-full flex-col items-center gap-y-6">
              <div className="primary-body2 font-medium">Minimal</div>
              <CosPagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
            <div className="flex w-full flex-col items-center gap-y-6">
              <div className="primary-body2 font-medium">General</div>
              <div className="w-full">
                <CosPagination
                  totalItems={totalItems}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </div>
            </div>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col items-center gap-y-12">
            <div className="flex w-full flex-col items-center gap-y-6">
              <div className="primary-body2 font-medium">Minimal</div>
              <CosPagination
                isLoading={true}
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
            <div className="flex w-full flex-col items-center gap-y-6">
              <div className="primary-body2 font-medium">General</div>
              <div className="w-full">
                <CosPagination
                  isLoading={true}
                  totalItems={totalItems}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </div>
            </div>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
