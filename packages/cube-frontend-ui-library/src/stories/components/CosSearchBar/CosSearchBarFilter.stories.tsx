import { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosSearchBarFilter } from '../../../components/CosSearchBar/CosSearchBarFilter/CosSearchBarFilter'
import { SearchBarGrid } from './SearchBarGrid'
import { SearchBarFilter } from './SearchBarFilter'

const meta = {
  title: 'Molecules/SearchBar/Filter',
  component: CosSearchBarFilter,
} satisfies Meta<typeof CosSearchBarFilter>

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: function Render() {
    return (
      <StoryLayout title="SearchBar - Filter">
        <StoryLayout.Section title="SearchBar - Filter">
          <SearchBarGrid title="Master">
            <SearchBarFilter isLoading={false} isNoData={false} />
          </SearchBarGrid>
          <SearchBarGrid title="No dropdown">
            <SearchBarFilter isLoading={false} isNoData={true} />
          </SearchBarGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <SearchBarGrid title="Master">
            <SearchBarFilter isLoading={true} isNoData={true} />
          </SearchBarGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
