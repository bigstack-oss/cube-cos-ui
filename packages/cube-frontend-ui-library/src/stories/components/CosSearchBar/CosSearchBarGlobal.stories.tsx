import { ChangeEventHandler, Fragment, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosSearchBarGlobal } from '../../../components/CosSearchBar/CosSearchBarGlobal/CosSearchBarGlobal'
import { SearchBarGrid } from './SearchBarGrid'
import {
  mockCategories,
  mockSuggestions,
  mockRecentSuggestions,
} from './mockData'

const meta = {
  title: 'Molecules/SearchBar/Global Search',
  component: CosSearchBarGlobal,
  args: {},
} satisfies Meta<typeof CosSearchBarGlobal>

export default meta

export const Gallery: StoryObj = {
  render: function Render() {
    const [text1, setText1] = useState<string>('')

    const [text2, setText2] = useState<string>('')

    const [category, setCategory] = useState<string>()

    const handleText1Change: ChangeEventHandler<HTMLInputElement> = (e) => {
      setText1(e.target.value)
    }

    const handleText2Change: ChangeEventHandler<HTMLInputElement> = (e) => {
      setText2(e.target.value)
    }

    const handelText1Clear = () => setText1('')

    const handelText2Clear = () => setText2('')

    const handleCategoryClick = (category: string) => setCategory(category)

    const action = (action: string) => window.alert(action)

    return (
      <StoryLayout title="SearchBar - Global Search">
        <StoryLayout.Section title="SearchBar - Global Search">
          <SearchBarGrid title="Master">
            <CosSearchBarGlobal
              variant="regular"
              value={text1}
              onChange={handleText1Change}
              onInputClear={handelText1Clear}
            >
              <Fragment>
                {mockSuggestions.map((suggestion) => (
                  <CosSearchBarGlobal.Item
                    key={suggestion.value}
                    type="suggestion"
                    onClick={() => action('Suggestion selected!')}
                  >
                    {suggestion.value}
                  </CosSearchBarGlobal.Item>
                ))}
                {mockRecentSuggestions.map((recentSuggestion) => (
                  <CosSearchBarGlobal.Item
                    key={recentSuggestion.value}
                    type="recentSuggestion"
                    onClick={() => action('Suggestion selected!')}
                    onSuggestionClear={() => action('Suggestion cleared!')}
                  >
                    {recentSuggestion.value}
                  </CosSearchBarGlobal.Item>
                ))}
              </Fragment>
            </CosSearchBarGlobal>
          </SearchBarGrid>
          <SearchBarGrid title="w/Sorting">
            <CosSearchBarGlobal
              variant="sorting"
              value={text2}
              categories={mockCategories}
              selectedCategory={category}
              onChange={handleText2Change}
              onInputClear={handelText2Clear}
              onCategoryClick={handleCategoryClick}
            >
              <Fragment>
                {mockSuggestions.map((suggestion) => (
                  <CosSearchBarGlobal.Item
                    key={suggestion.value}
                    type="suggestion"
                    onClick={() => action('Suggestion selected!')}
                  >
                    {suggestion.value}
                  </CosSearchBarGlobal.Item>
                ))}
                {mockRecentSuggestions.map((recentSuggestion) => (
                  <CosSearchBarGlobal.Item
                    key={recentSuggestion.value}
                    type="recentSuggestion"
                    onClick={() => action('Suggestion selected!')}
                    onSuggestionClear={() => action('Suggestion cleared!')}
                  >
                    {recentSuggestion.value}
                  </CosSearchBarGlobal.Item>
                ))}
              </Fragment>
            </CosSearchBarGlobal>
          </SearchBarGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <SearchBarGrid title="Master">
            <CosSearchBarGlobal
              isLoading={true}
              variant="sorting"
              value={text2}
              categories={mockCategories}
              selectedCategory={category}
              onChange={handleText2Change}
              onInputClear={handelText2Clear}
              onCategoryClick={handleCategoryClick}
            >
              <Fragment>
                {mockSuggestions.map((suggestion) => (
                  <CosSearchBarGlobal.Item
                    key={suggestion.value}
                    type="suggestion"
                    onClick={() => action('Suggestion selected!')}
                  >
                    {suggestion.value}
                  </CosSearchBarGlobal.Item>
                ))}
                {mockRecentSuggestions.map((recentSuggestion) => (
                  <CosSearchBarGlobal.Item
                    key={recentSuggestion.value}
                    type="recentSuggestion"
                    onClick={() => action('Suggestion selected!')}
                    onSuggestionClear={() => action('Suggestion cleared!')}
                  >
                    {recentSuggestion.value}
                  </CosSearchBarGlobal.Item>
                ))}
              </Fragment>
            </CosSearchBarGlobal>
          </SearchBarGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
