import { CosTabs } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { TabsRow } from './TabsRow'

const meta = {
  title: 'components/Tabs',
} satisfies Meta

export default meta

export const Tabs: StoryObj = {
  render: () => <TabsGallery />,
}

const TabsGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const renderDefaultRows = () => (
    <>
      <TabsRow title="Default">
        <CosTabs.Tab
          label="Label 1"
          isActive={activeIndex === 0}
          onClick={() => setActiveIndex(0)}
        />
        <CosTabs.Tab
          label="Label 2 (link)"
          href="hello-world"
          isActive={activeIndex === 1}
          onClick={(e) => {
            e.preventDefault()
            setActiveIndex(1)
          }}
        />
        <CosTabs.Tab
          label="Label 3"
          isActive={activeIndex === 2}
          onClick={() => setActiveIndex(2)}
        />
        <CosTabs.Tab
          label="Label with Long Text Label with Long Text"
          isActive={activeIndex === 3}
          onClick={() => setActiveIndex(3)}
        />
      </TabsRow>
      <TabsRow title="Default (disabled)">
        <CosTabs.Tab
          label="Label 1"
          isActive={activeIndex === 0}
          disabled={true}
          onClick={() => setActiveIndex(0)}
        />
        <CosTabs.Tab
          label="Label 2 (link)"
          href="hello-world"
          isActive={activeIndex === 1}
          disabled={true}
          onClick={(e) => {
            e.preventDefault()
            setActiveIndex(1)
          }}
        />
        <CosTabs.Tab
          label="Label 3"
          isActive={activeIndex === 2}
          disabled={true}
          onClick={() => setActiveIndex(2)}
        />
        <CosTabs.Tab
          label="Label with Long Text Label with Long Text"
          isActive={activeIndex === 3}
          disabled={true}
          onClick={() => setActiveIndex(3)}
        />
      </TabsRow>
    </>
  )

  const renderNumberRows = () => (
    <>
      <TabsRow title="Number">
        <CosTabs.Tab
          label="Label 1"
          isActive={activeIndex === 0}
          number={2}
          onClick={() => setActiveIndex(0)}
        />
        <CosTabs.Tab
          label="Label 2 (link)"
          href="hello-world"
          number={99}
          isActive={activeIndex === 1}
          onClick={(e) => {
            e.preventDefault()
            setActiveIndex(1)
          }}
        />
        <CosTabs.Tab
          label="Label 3 (over 99)"
          isActive={activeIndex === 2}
          number={100}
          onClick={() => setActiveIndex(2)}
        />
        <CosTabs.Tab
          label="Label with Long Text Label with Long Text"
          isActive={activeIndex === 3}
          number={2}
          onClick={() => setActiveIndex(3)}
        />
      </TabsRow>
      <TabsRow title="Number (disabled)">
        <CosTabs.Tab
          label="Label 1"
          isActive={activeIndex === 0}
          number={2}
          disabled={true}
          onClick={() => setActiveIndex(0)}
        />
        <CosTabs.Tab
          label="Label 2 (link)"
          href="hello-world"
          number={99}
          isActive={activeIndex === 1}
          disabled={true}
          onClick={(e) => {
            e.preventDefault()
            setActiveIndex(1)
          }}
        />
        <CosTabs.Tab
          label="Label 3 (over 99)"
          isActive={activeIndex === 2}
          number={100}
          disabled={true}
          onClick={() => setActiveIndex(2)}
        />
        <CosTabs.Tab
          label="Label with Long Text Label with Long Text"
          isActive={activeIndex === 3}
          number={2}
          disabled={true}
          onClick={() => setActiveIndex(3)}
        />
      </TabsRow>
    </>
  )

  const renderDotRows = () => (
    <>
      <TabsRow title="Dot">
        <CosTabs.Tab
          label="Label 1"
          isActive={activeIndex === 0}
          dot={true}
          onClick={() => setActiveIndex(0)}
        />
        <CosTabs.Tab
          label="Label 2 (link)"
          href="hello-world"
          isActive={activeIndex === 1}
          dot={true}
          onClick={(e) => {
            e.preventDefault()
            setActiveIndex(1)
          }}
        />
        <CosTabs.Tab
          label="Label 3"
          isActive={activeIndex === 2}
          dot={true}
          onClick={() => setActiveIndex(2)}
        />
        <CosTabs.Tab
          label="Label with Long Text Label with Long Text"
          isActive={activeIndex === 3}
          dot={true}
          onClick={() => setActiveIndex(3)}
        />
      </TabsRow>
      <TabsRow title="Dot (disabled)">
        <CosTabs.Tab
          label="Label 1"
          isActive={activeIndex === 0}
          dot={true}
          disabled={true}
          onClick={() => setActiveIndex(0)}
        />
        <CosTabs.Tab
          label="Label 2 (link)"
          href="hello-world"
          isActive={activeIndex === 1}
          dot={true}
          disabled={true}
          onClick={(e) => {
            e.preventDefault()
            setActiveIndex(1)
          }}
        />
        <CosTabs.Tab
          label="Label 3"
          isActive={activeIndex === 2}
          dot={true}
          disabled={true}
          onClick={() => setActiveIndex(2)}
        />
        <CosTabs.Tab
          label="Label with Long Text Label with Long Text"
          isActive={activeIndex === 3}
          dot={true}
          disabled={true}
          onClick={() => setActiveIndex(3)}
        />
      </TabsRow>
    </>
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
        <TabsRow title="Default">
          <CosTabs.Skeleton />
          <CosTabs.Skeleton />
          <CosTabs.Skeleton />
          <CosTabs.Skeleton />
          <CosTabs.Skeleton />
        </TabsRow>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
