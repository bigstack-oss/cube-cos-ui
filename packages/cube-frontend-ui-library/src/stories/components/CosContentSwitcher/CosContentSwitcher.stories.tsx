import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosContentSwitcher } from '../../../components/CosContentSwitcher/CosContentSwitcher'
import { ContentSwitcherRow } from './ContentSwitcherRow'

const meta = {
  title: 'Molecules/Content Switcher',
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => <ContentSwitcherGallery />,
}

const ContentSwitcherGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <StoryLayout
      title="Content Switcher Gallery"
      desc="Content Switchers allow users to compare and toggle between alternate views of similar or related content. Content that is grouped into tabs is part of the same bigger context but the content does not overlap."
    >
      <StoryLayout.Section title="Content Switcher">
        <div className="flex flex-col gap-y-8">
          <ContentSwitcherRow title="Default">
            <CosContentSwitcher>
              <CosContentSwitcher.Item
                isActive={activeIndex === 0}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveIndex(0)
                }}
              >
                Item 1
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                isActive={activeIndex === 1}
                onClick={() => setActiveIndex(1)}
              >
                Item 2
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                isActive={activeIndex === 2}
                onClick={() => setActiveIndex(2)}
              >
                Item 3
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                isActive={activeIndex === 3}
                onClick={() => setActiveIndex(3)}
              >
                Item 4
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                isActive={activeIndex === 4}
                onClick={() => setActiveIndex(4)}
              >
                Item 5
              </CosContentSwitcher.Item>
            </CosContentSwitcher>
          </ContentSwitcherRow>

          <ContentSwitcherRow title="Disabled">
            <CosContentSwitcher>
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 0}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveIndex(0)
                }}
              >
                Item 1
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 1}
                onClick={() => setActiveIndex(1)}
              >
                Item 2
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 2}
                onClick={() => setActiveIndex(2)}
              >
                Item 3
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 3}
                onClick={() => setActiveIndex(3)}
              >
                Item 4
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                disabled
                isActive={activeIndex === 4}
                onClick={() => setActiveIndex(4)}
              >
                Item 5
              </CosContentSwitcher.Item>
            </CosContentSwitcher>
          </ContentSwitcherRow>

          <ContentSwitcherRow title="Loading">
            <CosContentSwitcher>
              <CosContentSwitcher.Skeleton />
              <CosContentSwitcher.Skeleton />
              <CosContentSwitcher.Skeleton />
              <CosContentSwitcher.Skeleton />
              <CosContentSwitcher.Skeleton />
            </CosContentSwitcher>
          </ContentSwitcherRow>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="Content Switcher - Small">
        <div className="flex flex-col gap-y-8">
          <ContentSwitcherRow title="Default">
            <CosContentSwitcher size="sm">
              <CosContentSwitcher.Item
                isActive={activeIndex === 0}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveIndex(0)
                }}
              >
                Item 1
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                isActive={activeIndex === 1}
                onClick={() => setActiveIndex(1)}
              >
                Item 2
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                isActive={activeIndex === 2}
                onClick={() => setActiveIndex(2)}
              >
                Item 3
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                isActive={activeIndex === 3}
                onClick={() => setActiveIndex(3)}
              >
                Item 4
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                isActive={activeIndex === 4}
                onClick={() => setActiveIndex(4)}
              >
                Item 5
              </CosContentSwitcher.Item>
            </CosContentSwitcher>
          </ContentSwitcherRow>

          <ContentSwitcherRow title="Disabled">
            <CosContentSwitcher size="sm">
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 0}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveIndex(0)
                }}
              >
                Item 1
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 1}
                onClick={() => setActiveIndex(1)}
              >
                Item 2
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 2}
                onClick={() => setActiveIndex(2)}
              >
                Item 3
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 3}
                onClick={() => setActiveIndex(3)}
              >
                Item 4
              </CosContentSwitcher.Item>
              <CosContentSwitcher.Item
                disabled={true}
                isActive={activeIndex === 4}
                onClick={() => setActiveIndex(4)}
              >
                Item 5
              </CosContentSwitcher.Item>
            </CosContentSwitcher>
          </ContentSwitcherRow>

          <ContentSwitcherRow title="Loading">
            <CosContentSwitcher size="sm">
              <CosContentSwitcher.Skeleton />
              <CosContentSwitcher.Skeleton />
              <CosContentSwitcher.Skeleton />
              <CosContentSwitcher.Skeleton />
              <CosContentSwitcher.Skeleton />
            </CosContentSwitcher>
          </ContentSwitcherRow>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
