import type { Meta, StoryObj } from '@storybook/react'
import { cubePreset } from '@cube-frontend/ui-theme'

const meta = {} satisfies Meta

export default meta

const colors = cubePreset.theme.extend.colors

const ColorBox = ({
  colorName,
  colorValue,
}: {
  colorName: string
  colorValue: string
}) => (
  <div className="flex items-center space-x-4 p-4">
    <div
      className="size-16 rounded"
      style={{ backgroundColor: colorValue }}
    ></div>
    <div>
      <p className="font-medium">{colorName}</p>
      <p className="text-sm text-gray-500">{colorValue}</p>
    </div>
  </div>
)

export const Color: StoryObj = {
  render: () => (
    <div className="flex flex-row flex-wrap space-x-4 space-y-4">
      {Object.entries(colors).map(([colorName, colorShades]) => (
        <div key={colorName}>
          <h3 className="mb-2 text-lg font-semibold">{colorName}</h3>
          {typeof colorShades === 'string' ? (
            <ColorBox colorName={colorName} colorValue={colorShades} />
          ) : (
            Object.entries(colorShades).map(([shade, value]) => (
              <ColorBox
                key={shade}
                colorName={`${colorName}-${shade}`}
                colorValue={value}
              />
            ))
          )}
        </div>
      ))}
    </div>
  ),
}
