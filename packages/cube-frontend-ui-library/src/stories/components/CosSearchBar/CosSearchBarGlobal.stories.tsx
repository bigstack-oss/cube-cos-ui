import { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosSearchBarGlobal } from '../../../components/CosSearchBar/CosSearchBarGlobal/CosSearchBarGlobal'
import { SearchBarGrid } from './SearchBarGrid'
import { SearchBarGlobal } from './SearchBarGlobal'

const meta = {
  title: 'Molecules/SearchBar/Global Search',
  component: CosSearchBarGlobal,
} satisfies Meta<typeof CosSearchBarGlobal>

export default meta

export const Gallery: StoryObj = {
  render: function Render() {
    return (
      <StoryLayout title="SearchBar - Global Search">
        <StoryLayout.Section title="SearchBar - Global Search">
          <SearchBarGrid title="Master">
            <SearchBarGlobal
              isLoading={false}
              variant="regular"
              isNoData={false}
            />
          </SearchBarGrid>
          <SearchBarGrid title="w/Category">
            <SearchBarGlobal
              isLoading={false}
              variant="category"
              isNoData={false}
            />
          </SearchBarGrid>
          <SearchBarGrid title="No Dropdown/Category">
            <SearchBarGlobal
              isLoading={false}
              variant="category"
              isNoData={true}
            />
          </SearchBarGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <SearchBarGrid title="Master">
            <SearchBarGlobal
              isLoading={true}
              variant="regular"
              isNoData={true}
            />
          </SearchBarGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
