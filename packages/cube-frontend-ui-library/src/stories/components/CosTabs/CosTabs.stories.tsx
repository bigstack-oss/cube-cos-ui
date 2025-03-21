import { CosTabs } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { TabsRow } from './TabsRow'

const meta = {
  title: 'Molecules/Tabs',
} satisfies Meta<typeof CosTabs>

export default meta

export const Gallery: StoryObj = {
  render: () => <TabsGallery />,
}

const TabsGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const renderDefaultRows = () => (
    <>
      <TabsRow title="Default">
        <CosTabs>
          <CosTabs.Tab
            isActive={activeIndex === 0}
            onClick={() => setActiveIndex(0)}
          >
            Label 1
          </CosTabs.Tab>
          <CosTabs.Tab
            href="hello-world"
            isActive={activeIndex === 1}
            onClick={(e) => {
              e.preventDefault()
              setActiveIndex(1)
            }}
          >
            Label 2 (link)
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 2}
            onClick={() => setActiveIndex(2)}
          >
            Label 3
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 3}
            onClick={() => setActiveIndex(3)}
          >
            Label with Long Text Label with Long Text
          </CosTabs.Tab>
        </CosTabs>
      </TabsRow>
      <TabsRow title="Default (disabled)">
        <CosTabs>
          <CosTabs.Tab
            isActive={activeIndex === 0}
            disabled={true}
            onClick={() => setActiveIndex(0)}
          >
            Label 1
          </CosTabs.Tab>
          <CosTabs.Tab
            href="hello-world"
            isActive={activeIndex === 1}
            disabled={true}
            onClick={(e) => {
              e.preventDefault()
              setActiveIndex(1)
            }}
          >
            Label 2 (link)
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 2}
            disabled={true}
            onClick={() => setActiveIndex(2)}
          >
            Label 3
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 3}
            disabled={true}
            onClick={() => setActiveIndex(3)}
          >
            Label with Long Text Label with Long Text
          </CosTabs.Tab>
        </CosTabs>
      </TabsRow>
    </>
  )

  const renderNumberRows = () => (
    <>
      <TabsRow title="Number">
        <CosTabs>
          <CosTabs.Tab
            isActive={activeIndex === 0}
            number={2}
            onClick={() => setActiveIndex(0)}
          >
            Label 1
          </CosTabs.Tab>
          <CosTabs.Tab
            href="hello-world"
            number={99}
            isActive={activeIndex === 1}
            onClick={(e) => {
              e.preventDefault()
              setActiveIndex(1)
            }}
          >
            Label 2 (link)
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 2}
            number={100}
            onClick={() => setActiveIndex(2)}
          >
            Label 3 (over 99)
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 3}
            number={2}
            onClick={() => setActiveIndex(3)}
          >
            Label with Long Text Label with Long Text
          </CosTabs.Tab>
        </CosTabs>
      </TabsRow>
      <TabsRow title="Number (disabled)">
        <CosTabs>
          <CosTabs.Tab
            isActive={activeIndex === 0}
            number={2}
            disabled={true}
            onClick={() => setActiveIndex(0)}
          >
            Label 1
          </CosTabs.Tab>
          <CosTabs.Tab
            href="hello-world"
            number={99}
            isActive={activeIndex === 1}
            disabled={true}
            onClick={(e) => {
              e.preventDefault()
              setActiveIndex(1)
            }}
          >
            Label 2 (link)
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 2}
            number={100}
            disabled={true}
            onClick={() => setActiveIndex(2)}
          >
            Label 3 (over 99)
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 3}
            number={2}
            disabled={true}
            onClick={() => setActiveIndex(3)}
          >
            Label with Long Text Label with Long Text
          </CosTabs.Tab>
        </CosTabs>
      </TabsRow>
    </>
  )

  const renderDotRows = () => (
    <>
      <TabsRow title="Dot">
        <CosTabs>
          <CosTabs.Tab
            isActive={activeIndex === 0}
            dot={true}
            onClick={() => setActiveIndex(0)}
          >
            Label 1
          </CosTabs.Tab>
          <CosTabs.Tab
            href="hello-world"
            isActive={activeIndex === 1}
            dot={true}
            onClick={(e) => {
              e.preventDefault()
              setActiveIndex(1)
            }}
          >
            Label 2 (link)
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 2}
            dot={true}
            onClick={() => setActiveIndex(2)}
          >
            Label 3
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 3}
            dot={true}
            onClick={() => setActiveIndex(3)}
          >
            Label with Long Text Label with Long Text
          </CosTabs.Tab>
        </CosTabs>
      </TabsRow>
      <TabsRow title="Dot (disabled)">
        <CosTabs>
          <CosTabs.Tab
            isActive={activeIndex === 0}
            dot={true}
            disabled={true}
            onClick={() => setActiveIndex(0)}
          >
            Label 1
          </CosTabs.Tab>
          <CosTabs.Tab
            href="hello-world"
            isActive={activeIndex === 1}
            dot={true}
            disabled={true}
            onClick={(e) => {
              e.preventDefault()
              setActiveIndex(1)
            }}
          >
            Label 2 (link)
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 2}
            dot={true}
            disabled={true}
            onClick={() => setActiveIndex(2)}
          >
            Label 3
          </CosTabs.Tab>
          <CosTabs.Tab
            isActive={activeIndex === 3}
            dot={true}
            disabled={true}
            onClick={() => setActiveIndex(3)}
          >
            Label with Long Text Label with Long Text
          </CosTabs.Tab>
        </CosTabs>
      </TabsRow>
    </>
  )

  const renderSkeletonRow = () => (
    <TabsRow title="Default">
      <CosTabs>
        <CosTabs.Skeleton />
        <CosTabs.Skeleton />
        <CosTabs.Skeleton />
        <CosTabs.Skeleton />
        <CosTabs.Skeleton />
      </CosTabs>
    </TabsRow>
  )

  return (
    <StoryLayout title="Tabs">
      <StoryLayout.Section title="Layout">
        <div className="flex flex-col gap-y-8">
          {renderDefaultRows()}
          {renderNumberRows()}
          {renderDotRows()}
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        {renderSkeletonRow()}
      </StoryLayout.Section>
    </StoryLayout>
  )
}
