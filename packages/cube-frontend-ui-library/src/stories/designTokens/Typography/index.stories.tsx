import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { BodyBox } from './BodyBox'
import { BodyBoxHeader } from './BodyBoxHeader'
import { HeadingBox } from './HeadingBox'
import { Typeface } from './Typeface'

const meta = {} satisfies Meta

export default meta

export const Typography: StoryObj = {
  render: () => (
    <StoryLayout
      title="Typography"
      desc="Flexible color palette to achieve clean interfaces and captivating brand experiences."
    >
      <StoryLayout.Section title="Typefaces">
        <div className="flex flex-col gap-y-4">
          <Typeface
            className="primary-h1"
            name="Urbanist"
            fontHref="https://fonts.google.com/specimen/Urbanist?query=urba"
          />
          <Typeface
            className="secondary-h1"
            name="Inter"
            fontHref="https://fonts.google.com/specimen/Inter"
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Rem Base Size">
        {'1rem = 16px'}
      </StoryLayout.Section>
      <StoryLayout.Section title="Heading - Primary">
        <div className="flex flex-col gap-y-12">
          <HeadingBox
            title="Heading 01"
            fontFamily="urbanist"
            themeFontSizeKey="primary-h1"
          />
          <HeadingBox
            title="Heading 02"
            fontFamily="urbanist"
            themeFontSizeKey="primary-h2"
          />
          <HeadingBox
            title="Heading 03"
            fontFamily="urbanist"
            themeFontSizeKey="primary-h3"
          />
          <HeadingBox
            title="Heading 04"
            fontFamily="urbanist"
            themeFontSizeKey="primary-h4"
          />
          <HeadingBox
            title="Heading 05"
            fontFamily="urbanist"
            themeFontSizeKey="primary-h5"
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Heading - Secondary">
        <div className="flex flex-col gap-y-12">
          <HeadingBox
            title="Heading 01"
            fontFamily="inter"
            themeFontSizeKey="secondary-h1"
          />
          <HeadingBox
            title="Heading 02"
            fontFamily="inter"
            themeFontSizeKey="secondary-h2"
          />
          <HeadingBox
            title="Heading 03"
            fontFamily="inter"
            themeFontSizeKey="secondary-h3"
          />
          <HeadingBox
            title="Heading 04"
            fontFamily="inter"
            themeFontSizeKey="secondary-h4"
          />
          <HeadingBox
            title="Heading 05"
            fontFamily="inter"
            themeFontSizeKey="secondary-h5"
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Body - Primary">
        <BodyBoxHeader />
        <div className="flex flex-col gap-y-12">
          <BodyBox
            title="Body 01"
            fontFamily="inter"
            themeFontSizeKey="primary-body1"
          />
          <BodyBox
            title="Body 02"
            fontFamily="inter"
            themeFontSizeKey="primary-body2"
          />
          <BodyBox
            title="Body 03"
            fontFamily="inter"
            themeFontSizeKey="primary-body3"
          />
          <BodyBox
            title="Body 04"
            fontFamily="inter"
            themeFontSizeKey="primary-body4"
          />
          <BodyBox
            title="Body 05"
            fontFamily="inter"
            themeFontSizeKey="primary-body5"
          />
          <BodyBox
            title="Body 06"
            fontFamily="inter"
            themeFontSizeKey="primary-body6"
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Body - Secondary">
        <BodyBoxHeader includeExtraBold={true} />
        <div className="flex flex-col gap-y-12">
          <BodyBox
            title="Body 01"
            fontFamily="urbanist"
            themeFontSizeKey="secondary-body1"
            includeExtraBold={true}
          />
          <BodyBox
            title="Body 02"
            fontFamily="urbanist"
            themeFontSizeKey="secondary-body2"
            includeExtraBold={true}
          />
          <BodyBox
            title="Body 03"
            fontFamily="urbanist"
            themeFontSizeKey="secondary-body3"
            includeExtraBold={true}
          />
          <BodyBox
            title="Body 04"
            fontFamily="urbanist"
            themeFontSizeKey="secondary-body4"
            includeExtraBold={true}
          />
          <BodyBox
            title="Body 05"
            fontFamily="urbanist"
            themeFontSizeKey="secondary-body5"
            includeExtraBold={true}
          />
          <BodyBox
            title="Body 06"
            fontFamily="urbanist"
            themeFontSizeKey="secondary-body6"
            includeExtraBold={true}
          />
          <BodyBox
            title="Body 07"
            fontFamily="urbanist"
            themeFontSizeKey="secondary-body7"
            includeExtraBold={true}
          />
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
