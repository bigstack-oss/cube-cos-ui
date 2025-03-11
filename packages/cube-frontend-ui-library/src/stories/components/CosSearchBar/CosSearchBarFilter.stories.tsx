import { ChangeEventHandler, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  CosSearchBarFilter,
  CosSearchBarFilterProps,
} from '../../../components/CosSearchBar/CosSearchBarFilter/CosSearchBarFilter'
import { SearchBarGrid } from './SearchBarGrid'
import { mockOptions } from './mockOptions'

const meta = {
  title: 'Molecules/SearchBar/SearchBar Filter',
  component: CosSearchBarFilter,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof CosSearchBarFilter>

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: function Render(args: CosSearchBarFilterProps) {
    const { onChange } = args

    const [text1, setText1] = useState<string>('')

    const [text2, setText2] = useState<string>('')

    const handleText1Change: ChangeEventHandler<HTMLInputElement> = (e) => {
      setText1(e.target.value)
      if (onChange) onChange(e)
    }

    const handleText2Change: ChangeEventHandler<HTMLInputElement> = (e) => {
      setText2(e.target.value)
      if (onChange) onChange(e)
    }

    const handelText1Clear = () => {
      setText1('')
    }

    const handelText2Clear = () => {
      setText2('')
    }

    return (
      <StoryLayout title="SearchBar - Filter">
        <StoryLayout.Section title="SearchBar - Filter">
          <SearchBarGrid title="Master">
            <div className="w-[480px]">
              <CosSearchBarFilter
                value={text1}
                onChange={handleText1Change}
                onInputClear={handelText1Clear}
              >
                {mockOptions.map((option) => (
                  <CosSearchBarFilter.Item key={option.label}>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="col-span-2">{option.label}</div>
                      <div className="col-span-1">{option.option}</div>
                      <div className="col-span-1 font-medium text-primary">
                        {option.description}
                      </div>
                    </div>
                  </CosSearchBarFilter.Item>
                ))}
              </CosSearchBarFilter>
            </div>
          </SearchBarGrid>
          <SearchBarGrid title="No dropdown">
            <div className="w-[480px]">
              <CosSearchBarFilter
                value={text2}
                onChange={handleText2Change}
                onInputClear={handelText2Clear}
                showDropdown={false}
              />
            </div>
          </SearchBarGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <SearchBarGrid title="Master">
            <CosSearchBarFilter isLoading={true} />
          </SearchBarGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
