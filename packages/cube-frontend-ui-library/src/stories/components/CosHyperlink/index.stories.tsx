import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosHyperlink } from '../../../components/CosHyperlink/CosHyperlink'
import { Home01 } from '../../../components/Icon/Home01'
import { HyperlinkBox } from './HyperlinkBox'

const meta = {
  component: CosHyperlink,
} satisfies Meta<typeof CosHyperlink>

export default meta

const hyperlinkText = 'Call to action'
const hyperlinkHref = '/'

export const Gallery: StoryObj = {
  args: {},
  render: () => (
    <StoryLayout title="Hyperlink">
      <StoryLayout.Section title="Hyperlink">
        <div className="flex flex-col space-y-8">
          <HyperlinkBox title="Master - MD">
            <CosHyperlink
              color="primary"
              variant="text-only"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
          </HyperlinkBox>
          <HyperlinkBox title="Master - SM">
            <CosHyperlink
              color="primary"
              variant="text-only"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
          </HyperlinkBox>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Variants">
        <div className="flex flex-col space-y-8">
          <HyperlinkBox title="">
            <div className="primary-body2">Text only</div>
            <div className="primary-body2">Text inline</div>
            <div className="primary-body2">Icon left</div>
            <div className="primary-body2">Icon right</div>
          </HyperlinkBox>
          <HyperlinkBox title="Primary - MD">
            <CosHyperlink
              color="primary"
              variant="text-only"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
            <CosHyperlink
              color="primary"
              variant="text-inline"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
            <CosHyperlink
              color="primary"
              variant="icon-left"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
              Icon={Home01}
            />
            <CosHyperlink
              color="primary"
              variant="icon-right"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
              Icon={Home01}
            />
          </HyperlinkBox>
          <HyperlinkBox title="Primary - SM">
            <CosHyperlink
              color="primary"
              variant="text-only"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
            <CosHyperlink
              color="primary"
              variant="text-inline"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
            <CosHyperlink
              color="primary"
              variant="icon-left"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
              Icon={Home01}
            />
            <CosHyperlink
              color="primary"
              variant="icon-right"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
              Icon={Home01}
            />
          </HyperlinkBox>
          <HyperlinkBox title="Secondary - MD">
            <CosHyperlink
              color="secondary"
              variant="text-only"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
            <CosHyperlink
              color="secondary"
              variant="text-inline"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
            <CosHyperlink
              color="secondary"
              variant="icon-left"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
              Icon={Home01}
            />
            <CosHyperlink
              color="secondary"
              variant="icon-right"
              size="md"
              text={hyperlinkText}
              href={hyperlinkHref}
              Icon={Home01}
            />
          </HyperlinkBox>
          <HyperlinkBox title="Secondary - SM">
            <CosHyperlink
              color="secondary"
              variant="text-only"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
            <CosHyperlink
              color="secondary"
              variant="text-inline"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
            />
            <CosHyperlink
              color="secondary"
              variant="icon-left"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
              Icon={Home01}
            />
            <CosHyperlink
              color="secondary"
              variant="icon-right"
              size="sm"
              text={hyperlinkText}
              href={hyperlinkHref}
              Icon={Home01}
            />
          </HyperlinkBox>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
