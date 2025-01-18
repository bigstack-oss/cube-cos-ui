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
const hyperlinkHref = `/#${Math.random()}`

export const Gallery: StoryObj = {
  args: {},
  render: () => (
    <StoryLayout title="Hyperlink">
      <StoryLayout.Section title="Hyperlink">
        <div className="flex flex-col gap-y-8">
          <HyperlinkBox title="Master - MD">
            <CosHyperlink
              color="primary"
              variant="text-only"
              size="md"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
          </HyperlinkBox>
          <HyperlinkBox title="Master - SM">
            <CosHyperlink
              color="primary"
              variant="text-only"
              size="sm"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
          </HyperlinkBox>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Variants">
        <div className="flex flex-col gap-y-8">
          <HyperlinkBox title="">
            <div className="primary-body2">Text only</div>
            <div className="primary-body2">Text inline</div>
            <div className="primary-body2">Icon left</div>
            <div className="primary-body2">Icon right</div>
          </HyperlinkBox>
          <HyperlinkBox title="MD - Primary">
            <CosHyperlink
              color="primary"
              variant="text-only"
              size="md"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="primary"
              variant="text-inline"
              size="md"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="primary"
              variant="icon-left"
              size="md"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="primary"
              variant="icon-right"
              size="md"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
          </HyperlinkBox>
          <HyperlinkBox title="MD - Secondary">
            <CosHyperlink
              color="secondary"
              variant="text-only"
              size="md"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="text-inline"
              size="md"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="icon-left"
              size="md"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="icon-right"
              size="md"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
          </HyperlinkBox>
          <HyperlinkBox title="MD - Disabled">
            <CosHyperlink
              color="secondary"
              variant="text-only"
              size="md"
              href={hyperlinkHref}
              disabled={true}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="text-inline"
              size="md"
              href={hyperlinkHref}
              disabled={true}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="icon-left"
              size="md"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={true}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="icon-right"
              size="md"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={true}
            >
              {hyperlinkText}
            </CosHyperlink>
          </HyperlinkBox>
          <HyperlinkBox title="SM - Primary">
            <CosHyperlink
              color="primary"
              variant="text-only"
              size="sm"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="primary"
              variant="text-inline"
              size="sm"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="primary"
              variant="icon-left"
              size="sm"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="primary"
              variant="icon-right"
              size="sm"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
          </HyperlinkBox>
          <HyperlinkBox title="SM - Secondary">
            <CosHyperlink
              color="secondary"
              variant="text-only"
              size="sm"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="text-inline"
              size="sm"
              href={hyperlinkHref}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="icon-left"
              size="sm"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="icon-right"
              size="sm"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={false}
            >
              {hyperlinkText}
            </CosHyperlink>
          </HyperlinkBox>
          <HyperlinkBox title="SM - Disabled">
            <CosHyperlink
              color="secondary"
              variant="text-only"
              size="sm"
              href={hyperlinkHref}
              disabled={true}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="text-inline"
              size="sm"
              href={hyperlinkHref}
              disabled={true}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="icon-left"
              size="sm"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={true}
            >
              {hyperlinkText}
            </CosHyperlink>
            <CosHyperlink
              color="secondary"
              variant="icon-right"
              size="sm"
              href={hyperlinkHref}
              Icon={Home01}
              disabled={true}
            >
              {hyperlinkText}
            </CosHyperlink>
          </HyperlinkBox>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
