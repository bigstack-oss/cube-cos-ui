import type { Meta, StoryObj } from '@storybook/react'
import { cubePreset } from '@cube-frontend/ui-theme'

const meta = {} satisfies Meta

export default meta

const typography = cubePreset.theme.fontSize

const TypographyBox = ({
  fontSizeName,
  fontSizeValue,
}: {
  fontSizeName: string
  fontSizeValue: [
    string,
    { lineHeight: string; letterSpacing?: string; fontWeight: number },
  ]
}) => (
  <div className="flex flex-col space-y-2 border-b p-4">
    <div className="text-sm text-gray-500">{fontSizeName}</div>
    <div
      className="font-medium"
      style={{
        fontSize: fontSizeValue[0],
        lineHeight: fontSizeValue[1].lineHeight,
        letterSpacing: fontSizeValue[1].letterSpacing,
        fontWeight: fontSizeValue[1].fontWeight,
      }}
    >
      The quick brown fox jumps over the lazy dog
    </div>
    <div className="text-sm text-gray-500">
      {`Font Size: ${fontSizeValue[0]}, Line Height: ${fontSizeValue[1].lineHeight}, Letter Spacing: ${fontSizeValue[1].letterSpacing || 'normal'}, Font Weight: ${fontSizeValue[1].fontWeight}`}
    </div>
  </div>
)

export const Typography: StoryObj = {
  render: () => (
    <div className="flex flex-col space-y-4">
      {Object.entries(typography).map(([fontSizeName, fontSizeValue]) => (
        <TypographyBox
          key={fontSizeName}
          fontSizeName={fontSizeName}
          fontSizeValue={fontSizeValue}
        />
      ))}
    </div>
  ),
}
