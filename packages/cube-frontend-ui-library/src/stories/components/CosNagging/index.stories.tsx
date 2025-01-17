import type { Meta, StoryObj } from '@storybook/react'
import { CosNagging } from '../../../components/CosNagging/CosNagging'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  NaggingBoxForSidebar,
  NaggingBoxForTop,
  NaggingRowForTop,
} from './NaggingBox'

const meta = {
  component: CosNagging,
} satisfies Meta<typeof CosNagging>

export default meta

const naggingContent = {
  title: 'Nagging Title',
  longTitle: 'Two-line title will look like this',
  longerTitle:
    'Two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this',
  description: 'Text goes here. Text goes here. (Optional)',
  link: {
    text: 'Call to action',
    href: '/',
  },
}

export const Sidebar: StoryObj = {
  args: {},
  render: () => (
    <StoryLayout title="Nagging - Sidebar">
      <StoryLayout.Section title="Nagging - Sidebar">
        <NaggingBoxForSidebar title="Master">
          <CosNagging
            type="error"
            variant="sidebar"
            title={naggingContent.title}
            link={{
              text: naggingContent.link.text,
              href: naggingContent.link.href,
            }}
          />
        </NaggingBoxForSidebar>
      </StoryLayout.Section>
      <StoryLayout.Section title="Usage">
        <div className="flex flex-col gap-8">
          <NaggingBoxForSidebar
            title="Critical Warning"
            description="Nagging refers to intrusive, repetitive prompts that pressure users into actions. Hence, only critical reminders are displayed here. And keep it within 2 lines"
          >
            <CosNagging
              type="error"
              variant="sidebar"
              title={naggingContent.title}
              description={naggingContent.description}
              link={{
                text: naggingContent.link.text,
                href: naggingContent.link.href,
              }}
            />
            <CosNagging
              type="error"
              variant="sidebar"
              title={naggingContent.title}
              description={naggingContent.description}
            />
          </NaggingBoxForSidebar>
          <NaggingBoxForSidebar title="Warning">
            <CosNagging
              type="warning"
              variant="sidebar"
              title={naggingContent.title}
              description={naggingContent.description}
              link={{
                text: naggingContent.link.text,
                href: naggingContent.link.href,
              }}
            />
            <CosNagging
              type="warning"
              variant="sidebar"
              title={naggingContent.title}
              description={naggingContent.description}
            />
          </NaggingBoxForSidebar>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layout">
        <div className="flex flex-col gap-8">
          <NaggingBoxForSidebar title="One line title">
            <CosNagging
              type="error"
              variant="sidebar"
              title={naggingContent.title}
              link={{
                text: naggingContent.link.text,
                href: naggingContent.link.href,
              }}
            />
            <CosNagging
              type="error"
              variant="sidebar"
              title={naggingContent.title}
            />
          </NaggingBoxForSidebar>
          <NaggingBoxForSidebar title="Two lines title">
            <CosNagging
              type="warning"
              variant="sidebar"
              title={naggingContent.longTitle}
              description={naggingContent.description}
              link={{
                text: naggingContent.link.text,
                href: naggingContent.link.href,
              }}
            />
            <CosNagging
              type="warning"
              variant="sidebar"
              title={naggingContent.longTitle}
              description={naggingContent.description}
            />
          </NaggingBoxForSidebar>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}

export const Top: StoryObj = {
  args: {},
  render: () => (
    <StoryLayout title="Nagging - Top">
      <StoryLayout.Section title="Nagging - Top">
        <NaggingBoxForTop title="Master">
          <CosNagging
            type="error"
            variant="top"
            title={naggingContent.title}
            link={{
              text: naggingContent.link.text,
              href: naggingContent.link.href,
            }}
          />
        </NaggingBoxForTop>
      </StoryLayout.Section>
      <StoryLayout.Section title="Usage">
        <div className="flex flex-col gap-8">
          <NaggingBoxForTop
            title="Critical Warning"
            description={`Nagging refers to intrusive, repetitive prompts that pressure users into actions.
              Hence, only critical reminders are displayed here. And keep it within 2 lines`}
          >
            <NaggingRowForTop title="With link">
              <CosNagging
                type="error"
                variant="top"
                title={naggingContent.title}
                link={{
                  text: naggingContent.link.text,
                  href: naggingContent.link.href,
                }}
              />
            </NaggingRowForTop>
            <NaggingRowForTop title="Without link">
              <CosNagging
                type="error"
                variant="top"
                title={naggingContent.title}
              />
            </NaggingRowForTop>
          </NaggingBoxForTop>
          <NaggingBoxForTop title="Warning">
            <NaggingRowForTop title="With link">
              <CosNagging
                type="warning"
                variant="top"
                title={naggingContent.title}
                link={{
                  text: naggingContent.link.text,
                  href: naggingContent.link.href,
                }}
              />
            </NaggingRowForTop>
            <NaggingRowForTop title="Without link">
              <CosNagging
                type="warning"
                variant="top"
                title={naggingContent.title}
              />
            </NaggingRowForTop>
          </NaggingBoxForTop>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layout">
        <div className="flex flex-col gap-8">
          <NaggingBoxForTop title="One line title">
            <NaggingRowForTop title="With link">
              <CosNagging
                type="error"
                variant="top"
                title={naggingContent.title}
                link={{
                  text: naggingContent.link.text,
                  href: naggingContent.link.href,
                }}
              />
            </NaggingRowForTop>
            <NaggingRowForTop title="Without link">
              <CosNagging
                type="error"
                variant="top"
                title={naggingContent.title}
              />
            </NaggingRowForTop>
          </NaggingBoxForTop>
          <NaggingBoxForTop title="Multiple lines title">
            <NaggingRowForTop title="With link">
              <CosNagging
                type="warning"
                variant="top"
                title={naggingContent.longerTitle}
                link={{
                  text: naggingContent.link.text,
                  href: naggingContent.link.href,
                }}
              />
            </NaggingRowForTop>
            <NaggingRowForTop title="Without link">
              <CosNagging
                type="warning"
                variant="top"
                title={naggingContent.longerTitle}
              />
            </NaggingRowForTop>
          </NaggingBoxForTop>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
