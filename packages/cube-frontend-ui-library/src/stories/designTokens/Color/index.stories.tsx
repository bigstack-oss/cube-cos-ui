import { cubePreset } from '@cube-frontend/ui-theme'
import type { Meta, StoryObj } from '@storybook/react'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

const meta = {} satisfies Meta

export default meta

const colors = cubePreset.theme.extend.colors

const ColorBox = ({
  colorName,
  colorValue,
  isGradient = false,
}: {
  colorName: string
  colorValue: string
  isGradient?: boolean
}) => (
  <div className="flex flex-col space-y-2">
    <div
      className="h-[60px] w-[140px] rounded"
      style={{ background: colorValue }}
    ></div>
    <div>
      <p className="text-xs font-medium">{colorName}</p>
      <p className="text-xs text-[#B0B2B8]">{isGradient ? '' : colorValue}</p>
    </div>
  </div>
)

const ColorBoxContainer = (props: {
  title: string
  desc?: string
  children: ReactNode
}) => {
  const { title, desc, children } = props
  return (
    <div className="mb-8 grid grid-cols-4 gap-8">
      <div className="col-span-1 flex flex-col">
        <h3 className="font-medium">{title}</h3>
        {desc && <p className="text-xs text-dark-300">{desc}</p>}
      </div>
      <div className="col-span-3 flex flex-row flex-wrap items-start gap-x-4 gap-y-2">
        {children}
      </div>
    </div>
  )
}

const ColorRow = ({
  colorName,
  colorValue,
}: {
  colorName: string
  colorValue: string
}) => {
  const textColor =
    Number(colorName) < 500 ? 'text-[#262932]' : 'text-[#FBFBFC]'
  return (
    <div
      className="flex w-[240px] justify-between p-3"
      style={{ backgroundColor: colorValue }}
    >
      <p className={classNames('text-xs', textColor)}>{colorName}</p>
      <p className={classNames('text-xs', textColor)}>{colorValue}</p>
    </div>
  )
}

const ColorColumns = (props: {
  title: string
  colors: Array<[string, string]>
}) => {
  const { title, colors } = props
  return (
    <div>
      <h3 className="mb-4 font-medium">{title}</h3>
      {colors.map(([colorName, colorShades]) => {
        return (
          colorName !== 'DEFAULT' && (
            <div key={colorName} className="flex flex-col space-y-2">
              <ColorRow colorName={colorName} colorValue={colorShades} />
            </div>
          )
        )
      })}
    </div>
  )
}

export const Color: StoryObj = {
  render: () => (
    <StoryLayout
      title="Colors"
      desc="Flexible color palette to achieve clean interfaces and captivating brand experiences."
    >
      <StoryLayout.Section title="Color Palette">
        <ColorBoxContainer title="COSMOS">
          <ColorBox colorName="Primary" colorValue={colors.cosmos.primary} />
          <ColorBox
            colorName="Secondary"
            colorValue={colors.cosmos.secondary}
          />
        </ColorBoxContainer>
        <ColorBoxContainer title="Scene Color">
          <ColorBox
            colorName="Theme gradient"
            colorValue={colors.scene.gradient}
            isGradient={true}
          />
          <ColorBox
            colorName="Background / Table-header"
            colorValue={colors.scene.background}
          />
        </ColorBoxContainer>
        <ColorBoxContainer
          title="Functional Color"
          desc="These colors are used as supporting secondary colors in backgrounds, text colors, separators, models, etc"
        >
          <ColorBox colorName="Title" colorValue={colors.functional.title} />
          <ColorBox colorName="Text" colorValue={colors.functional.text} />
          <ColorBox
            colorName="Text-light"
            colorValue={colors.functional['text-light']}
          />
          <ColorBox
            colorName="Hover-primary"
            colorValue={colors.functional['hover-primary']}
          />
          <ColorBox
            colorName="Hover-secondary"
            colorValue={colors.functional['hover-secondary']}
          />
          <ColorBox
            colorName="Hover-grey"
            colorValue={colors.functional['hover-grey']}
          />
          <ColorBox
            colorName="Hover-grey-darker"
            colorValue={colors.functional['hover-grey-darker']}
          />
          <ColorBox
            colorName="Border/ Divider"
            colorValue={colors.functional['border-divider']}
          />
          <ColorBox
            colorName="Border-darker"
            colorValue={colors.functional['border-darker']}
          />
          <ColorBox
            colorName="Disable"
            colorValue={colors.functional.disable}
          />
          <ColorBox
            colorName="Disable-text"
            colorValue={colors.functional['disable-text']}
          />
          <ColorBox
            colorName="Disable-light"
            colorValue={colors.functional['disable-light']}
          />
          <ColorBox
            colorName="Skeleton"
            colorValue={colors.functional.skeleton}
          />
        </ColorBoxContainer>
        <ColorBoxContainer
          title="Status Color"
          desc="These colors are used as status color"
        >
          <ColorBox colorName="Positive" colorValue={colors.status.positive} />
          <ColorBox
            colorName="Positive-text"
            colorValue={colors.status['positive-text']}
          />
          <ColorBox colorName="Negative" colorValue={colors.status.negative} />
          <ColorBox colorName="Warning" colorValue={colors.status.warning} />
          <ColorBox
            colorName="Neutral/ Active"
            colorValue={colors.status['neutral']}
          />
        </ColorBoxContainer>
        <ColorBoxContainer
          title="Chart Color"
          desc="These colors are used as meter chat color. "
        >
          <ColorBox colorName="1" colorValue={colors.chart[1]} />
          <ColorBox colorName="2" colorValue={colors.chart[2]} />
          <ColorBox colorName="3" colorValue={colors.chart[3]} />
          <ColorBox colorName="4" colorValue={colors.chart[4]} />
          <ColorBox colorName="5" colorValue={colors.chart[5]} />
          <ColorBox colorName="6" colorValue={colors.chart[6]} />
          <ColorBox colorName="7" colorValue={colors.chart[7]} />
          <ColorBox colorName="8" colorValue={colors.chart[8]} />
          <ColorBox colorName="9" colorValue={colors.chart[9]} />
          <ColorBox colorName="10" colorValue={colors.chart[10]} />
        </ColorBoxContainer>
      </StoryLayout.Section>
      <StoryLayout.Section title="Color Scale">
        <div className="flex flex-wrap gap-x-4 gap-y-8">
          <ColorColumns
            title="Primary"
            colors={Object.entries(colors.primary)}
          />
          <ColorColumns
            title="Secondary"
            colors={Object.entries(colors.secondary)}
          />
          <ColorColumns title="Dark" colors={Object.entries(colors.dark)} />
          <ColorColumns title="Grey" colors={Object.entries(colors.grey)} />
          <ColorColumns title="Blue" colors={Object.entries(colors.blue)} />
          <ColorColumns title="Green" colors={Object.entries(colors.green)} />
          <ColorColumns title="Yellow" colors={Object.entries(colors.yellow)} />
          <ColorColumns title="Red" colors={Object.entries(colors.red)} />
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
