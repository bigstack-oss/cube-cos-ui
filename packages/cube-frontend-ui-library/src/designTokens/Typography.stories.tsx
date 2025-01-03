import type { Meta, StoryObj } from '@storybook/react'
import { cubePreset } from '@cube-frontend/ui-theme'
import { UILibrary_Layout } from '../components/Demo/Layout'
import { UILibrary_Section } from '../components/Demo/Section'
import classNames from 'classnames'

const meta = {} satisfies Meta

export default meta

const typography = cubePreset.theme.extend.fontSize
const themeFontFamily = cubePreset.theme.extend.fontFamily

const HeadingBox = ({
  title,
  fontSizeValue,
  variant,
}: {
  title: string
  fontSizeValue: [
    string,
    { lineHeight: string; letterSpacing?: string; fontWeight: number },
  ]
  variant: 'primary' | 'secondary'
}) => (
  <div className={classNames('grid grid-cols-5 items-center gap-10')}>
    <div
      className="col-span-2"
      style={{
        fontSize: fontSizeValue[0],
        lineHeight: fontSizeValue[1].lineHeight,
        letterSpacing: fontSizeValue[1].letterSpacing,
        fontWeight: fontSizeValue[1].fontWeight,
        fontFamily:
          variant === 'primary'
            ? themeFontFamily['urbanist'][0]
            : themeFontFamily['inter'][0],
      }}
    >
      {title}
    </div>
    <div className="col-span-3 text-xs text-gray-500">
      {`Font Size: ${fontSizeValue[0]}, Line Height: ${fontSizeValue[1].lineHeight}, Letter Spacing: ${fontSizeValue[1].letterSpacing || 'normal'}, Font Weight: ${fontSizeValue[1].fontWeight}`}
    </div>
  </div>
)

const BodyBox = ({
  title,
  fontSizeValue,
  variant,
}: {
  title: string
  fontSizeValue: [
    string,
    { lineHeight: string; letterSpacing?: string; fontWeight: number },
  ]
  variant: 'primary' | 'secondary'
}) => {
  const fontFamily =
    variant === 'primary'
      ? themeFontFamily['urbanist'][0]
      : themeFontFamily['inter'][0]
  return (
    <div className="grid grid-cols-6 items-center gap-10">
      <div
        className="col-span-1"
        style={{
          fontSize: fontSizeValue[0],
          lineHeight: fontSizeValue[1].lineHeight,
          letterSpacing: fontSizeValue[1].letterSpacing,
          fontFamily,
        }}
      >
        {title}
      </div>
      <div
        className="col-span-1 font-medium"
        style={{
          fontSize: fontSizeValue[0],
          lineHeight: fontSizeValue[1].lineHeight,
          letterSpacing: fontSizeValue[1].letterSpacing,
          fontFamily,
        }}
      >
        {title}
      </div>
      <div
        className="col-span-1 font-semibold"
        style={{
          fontSize: fontSizeValue[0],
          lineHeight: fontSizeValue[1].lineHeight,
          letterSpacing: fontSizeValue[1].letterSpacing,
          fontFamily,
        }}
      >
        {title}
      </div>
      <div className="col-span-3 text-xs text-gray-500">
        {`Font Size: ${fontSizeValue[0]}, Line Height: ${fontSizeValue[1].lineHeight}, Letter Spacing: ${fontSizeValue[1].letterSpacing || 'normal'}, Font Weight: ${fontSizeValue[1].fontWeight}`}
      </div>
    </div>
  )
}

export const Typography: StoryObj = {
  render: () => (
    <UILibrary_Layout
      title="Typography"
      desc="Flexible color palette to achieve clean interfaces and captivating brand experiences."
    >
      <UILibrary_Section title="Typefaces">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-3 items-center gap-8">
            <h1 className="primary-h1">Urbanist</h1>
            <a
              className="primary-body1 hover:underline"
              href="https://fonts.google.com/specimen/Urbanist?query=urba"
              target="_blank"
            >
              Download Link
            </a>
          </div>
          <div className="grid grid-cols-3 items-center gap-8">
            <h1 className="secondary-h1">Inter</h1>
            <a
              className="secondary-body1 hover:underline"
              href="https://fonts.google.com/specimen/Inter"
              target="_blank"
            >
              Download Link
            </a>
          </div>
        </div>
      </UILibrary_Section>
      <UILibrary_Section title="Rem Base Size">
        <div>1rem = 16px</div>
      </UILibrary_Section>
      <UILibrary_Section title="Heading - Primary">
        <div className="flex flex-col space-y-8">
          <HeadingBox
            title="Heading 01"
            fontSizeValue={typography['primary-h1']}
            variant="primary"
          />
          <HeadingBox
            title="Heading 02"
            fontSizeValue={typography['primary-h2']}
            variant="primary"
          />
          <HeadingBox
            title="Heading 03"
            fontSizeValue={typography['primary-h3']}
            variant="primary"
          />
          <HeadingBox
            title="Heading 04"
            fontSizeValue={typography['primary-h4']}
            variant="primary"
          />
          <HeadingBox
            title="Heading 05"
            fontSizeValue={typography['primary-h5']}
            variant="primary"
          />
        </div>
      </UILibrary_Section>
      <UILibrary_Section title="Heading - Secondary">
        <div className="flex flex-col space-y-8">
          <HeadingBox
            title="Heading 01"
            fontSizeValue={typography['secondary-h1']}
            variant="secondary"
          />
          <HeadingBox
            title="Heading 02"
            fontSizeValue={typography['secondary-h2']}
            variant="secondary"
          />
          <HeadingBox
            title="Heading 03"
            fontSizeValue={typography['secondary-h3']}
            variant="secondary"
          />
          <HeadingBox
            title="Heading 04"
            fontSizeValue={typography['secondary-h4']}
            variant="secondary"
          />
          <HeadingBox
            title="Heading 05"
            fontSizeValue={typography['secondary-h5']}
            variant="secondary"
          />
        </div>
      </UILibrary_Section>
      <UILibrary_Section title="Body - Primary">
        <div className="flex flex-col space-y-8">
          <BodyBox
            title="Body 01"
            fontSizeValue={typography['primary-body1']}
            variant="primary"
          />
          <BodyBox
            title="Body 02"
            fontSizeValue={typography['primary-body2']}
            variant="primary"
          />
          <BodyBox
            title="Body 03"
            fontSizeValue={typography['primary-body3']}
            variant="primary"
          />
          <BodyBox
            title="Body 04"
            fontSizeValue={typography['primary-body4']}
            variant="primary"
          />
          <BodyBox
            title="Body 05"
            fontSizeValue={typography['primary-body5']}
            variant="primary"
          />
          <BodyBox
            title="Body 06"
            fontSizeValue={typography['primary-body6']}
            variant="primary"
          />
        </div>
      </UILibrary_Section>
      <UILibrary_Section title="Body - Secondary">
        <div className="flex flex-col space-y-8">
          <BodyBox
            title="Body 01"
            fontSizeValue={typography['secondary-body1']}
            variant="secondary"
          />
          <BodyBox
            title="Body 02"
            fontSizeValue={typography['secondary-body2']}
            variant="secondary"
          />
          <BodyBox
            title="Body 03"
            fontSizeValue={typography['secondary-body3']}
            variant="secondary"
          />
          <BodyBox
            title="Body 04"
            fontSizeValue={typography['secondary-body4']}
            variant="secondary"
          />
          <BodyBox
            title="Body 05"
            fontSizeValue={typography['secondary-body5']}
            variant="secondary"
          />
          <BodyBox
            title="Body 06"
            fontSizeValue={typography['secondary-body6']}
            variant="secondary"
          />
        </div>
      </UILibrary_Section>
    </UILibrary_Layout>
  ),
}
