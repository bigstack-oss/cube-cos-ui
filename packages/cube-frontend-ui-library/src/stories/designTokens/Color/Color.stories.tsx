import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { ColorBox } from './ColorBox'
import { ColorPaletteRow } from './ColorPaletteRow'
import { ColorScale } from './ColorScale'

const meta = {
  title: 'Design Tokens/Color',
} satisfies Meta

export default meta

export const Color: StoryObj = {
  render: () => (
    <StoryLayout
      title="Colors"
      desc="Flexible color palette to achieve clean interfaces and captivating brand experiences."
    >
      <StoryLayout.Section title="Color Palette">
        <div className="flex flex-col gap-y-6">
          <ColorPaletteRow title="COSMOS">
            <ColorBox colorName="Primary" bgClassName="bg-cosmos-primary" />
            <ColorBox colorName="Secondary" bgClassName="bg-cosmos-secondary" />
          </ColorPaletteRow>
          <ColorPaletteRow title="Scene Color">
            <ColorBox
              colorName="Theme gradient"
              bgClassName="background-scene-gradient"
            />
            <ColorBox
              colorName="Background / Table-header"
              bgClassName="bg-scene-background"
            />
          </ColorPaletteRow>
          <ColorPaletteRow
            title="Functional Color"
            desc="These colors are used as supporting secondary colors in backgrounds, text colors, separators, models, etc."
          >
            <ColorBox colorName="Title" bgClassName="bg-functional-title" />
            <ColorBox colorName="Text" bgClassName="bg-functional-text" />
            <ColorBox
              colorName="Text-light"
              bgClassName="bg-functional-text-light"
            />
            <ColorBox
              colorName="Hover-primary"
              bgClassName="bg-functional-hover-primary"
            />
            <ColorBox
              colorName="Hover-secondary"
              bgClassName="bg-functional-hover-secondary"
            />
            <ColorBox
              colorName="Hover-grey"
              bgClassName="bg-functional-hover-grey"
            />
            <ColorBox
              colorName="Hover-grey-darker"
              bgClassName="bg-functional-hover-grey-darker"
            />
            <ColorBox
              colorName="Border/ Divider"
              bgClassName="bg-functional-border-divider"
            />
            <ColorBox
              colorName="Border-darker"
              bgClassName="bg-functional-border-darker"
            />
            <ColorBox colorName="Disable" bgClassName="bg-functional-disable" />
            <ColorBox
              colorName="Disable-text"
              bgClassName="bg-functional-disable-text"
            />
            <ColorBox
              colorName="Disable-light"
              bgClassName="bg-functional-disable-light"
            />
            <ColorBox
              colorName="Skeleton"
              bgClassName="bg-functional-skeleton"
            />
          </ColorPaletteRow>
          <ColorPaletteRow
            title="Status Color"
            desc="These colors are used as status color."
          >
            <ColorBox colorName="Positive" bgClassName="bg-status-positive" />
            <ColorBox
              colorName="Positive-text"
              bgClassName="bg-status-positive-text"
            />
            <ColorBox colorName="Negative" bgClassName="bg-status-negative" />
            <ColorBox colorName="Warning" bgClassName="bg-status-warning" />
            <ColorBox
              colorName="Neutral/ Active"
              bgClassName="bg-status-neutral"
            />
          </ColorPaletteRow>
          <ColorPaletteRow
            title="Chart Color"
            desc="These colors are used as meter chat color. "
          >
            <ColorBox colorName="1" bgClassName="bg-chart-1" />
            <ColorBox colorName="2" bgClassName="bg-chart-2" />
            <ColorBox colorName="3" bgClassName="bg-chart-3" />
            <ColorBox colorName="4" bgClassName="bg-chart-4" />
            <ColorBox colorName="5" bgClassName="bg-chart-5" />
            <ColorBox colorName="6" bgClassName="bg-chart-6" />
            <ColorBox colorName="7" bgClassName="bg-chart-7" />
            <ColorBox colorName="8" bgClassName="bg-chart-8" />
            <ColorBox colorName="9" bgClassName="bg-chart-9" />
            <ColorBox colorName="10" bgClassName="bg-chart-10" />
          </ColorPaletteRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Color Scale">
        <div className="flex flex-wrap items-start gap-8">
          <ColorScale title="Primary" category="primary" />
          <ColorScale title="Secondary" category="secondary" />
          <ColorScale title="Dark" category="dark" />
          <ColorScale title="Grey" category="grey" />
          <ColorScale title="Blue" category="blue" />
          <ColorScale title="Green" category="green" />
          <ColorScale title="Yellow" category="yellow" />
          <ColorScale title="Red" category="red" />
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
