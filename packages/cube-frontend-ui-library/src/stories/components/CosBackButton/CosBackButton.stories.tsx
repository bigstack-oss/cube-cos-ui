import {
  CosBackButton,
  CosLoadingSpinner,
  CosSkeleton,
} from '@cube-frontend/ui-library'
import { Meta } from '@storybook/react'
import { noop } from 'lodash'
import { PropsWithChildren } from 'react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

const meta = {
  title: 'Molecules/Back Button',
  component: CosBackButton,
} satisfies Meta<typeof CosBackButton>

export default meta

type BackButtonRowProps = {
  title: string
  children: React.ReactNode
}

const BackButtonRow = (props: BackButtonRowProps) => {
  const { title, children } = props

  return (
    <div className="flex flex-row items-center gap-x-10">
      <span className="primary-body2 w-40 font-semibold">{title}</span>
      {children}
    </div>
  )
}

type CustomBackLinkContainerProps = PropsWithChildren<{
  href: string
}>

const CustomBackLinkContainer = (props: CustomBackLinkContainerProps) => {
  const { children, href } = props

  return (
    <a className="border-2 border-green-600" href={href} target="_blank">
      {children}
    </a>
  )
}

const getRandomLink = (): string => {
  return `#${Math.random()}`
}

export const Gallery = {
  render: () => {
    return (
      <StoryLayout title="Back Button">
        <StoryLayout.Section title="With Title">
          <div className="flex flex-col gap-y-8">
            <BackButtonRow title="No Details">
              <CosBackButton onClick={noop}>Page Title</CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="No Details Loading">
              <CosBackButton isLoading={true} onClick={noop}>
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Details">
              <CosBackButton
                titleRightContent={
                  <CosBackButton.Details>Detail text</CosBackButton.Details>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Details Loading">
              <CosBackButton
                isLoading={true}
                titleRightContent={
                  <CosBackButton.Details>Detail text</CosBackButton.Details>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="Custom Back Button Container">
              <CosBackButton
                backButtonContainer={{
                  Component: CustomBackLinkContainer,
                  props: {
                    href: getRandomLink(),
                  },
                }}
                onClick={noop}
              >
                Custom Back Button Container
              </CosBackButton>
            </BackButtonRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="With Bar Charts">
          <div className="flex flex-col gap-y-8">
            <BackButtonRow title="No Links and No Bar Charts">
              <CosBackButton onClick={noop}>Page Title</CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="No Links and No Bar Charts Loading">
              <CosBackButton isLoading={true} onClick={noop}>
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Links">
              <CosBackButton
                titleRightContent={
                  <>
                    <CosBackButton.Divider />
                    <CosBackButton.Link target="_blank" href={getRandomLink()}>
                      Grafana
                    </CosBackButton.Link>
                    <CosBackButton.Divider />
                    <CosBackButton.Link target="_blank" href={getRandomLink()}>
                      Detail Link
                    </CosBackButton.Link>
                  </>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Links Loading">
              <CosBackButton
                isLoading={true}
                titleRightContent={
                  <>
                    <CosBackButton.Divider />
                    <CosBackButton.Link target="_blank" href={getRandomLink()}>
                      Grafana
                    </CosBackButton.Link>
                    <CosBackButton.Link target="_blank" href={getRandomLink()}>
                      Detail Link
                    </CosBackButton.Link>
                  </>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Bar Charts">
              <CosBackButton
                titleBottomContent={
                  <>
                    <CosBackButton.BarChart label="CPU" progress={12} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="RAM" progress={34} />
                  </>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Bar Charts Loading">
              <CosBackButton
                isLoading={true}
                titleBottomContent={
                  <>
                    <CosBackButton.BarChart label="CPU" progress={12} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="RAM" progress={34} />
                  </>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Links and Bar Charts">
              <CosBackButton
                titleRightContent={
                  <>
                    <CosBackButton.Divider />
                    <CosBackButton.Link onClick={noop}>
                      Monitor
                    </CosBackButton.Link>
                  </>
                }
                titleBottomContent={
                  <>
                    <CosBackButton.BarChart label="CPU" progress={12} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="RAM" progress={34} />
                  </>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Links and Bar Charts Loading">
              <CosBackButton
                isLoading={true}
                titleRightContent={
                  <>
                    <CosBackButton.Divider />
                    <CosBackButton.Link onClick={noop}>
                      Monitor
                    </CosBackButton.Link>
                    <CosBackButton.Divider />
                    <CosBackButton.Link onClick={noop}>
                      Details Link
                    </CosBackButton.Link>
                  </>
                }
                titleBottomContent={
                  <>
                    <CosBackButton.BarChart label="CPU" progress={12} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="RAM" progress={34} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="Partition" progress={56} />
                  </>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Link, Bar Charts, and Custom Element">
              <CosBackButton
                titleRightContent={
                  <>
                    <CosBackButton.Divider />
                    <CosBackButton.Link onClick={noop}>
                      Monitor
                    </CosBackButton.Link>
                  </>
                }
                titleBottomContent={
                  <>
                    <CosBackButton.BarChart label="CPU" progress={12} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="RAM" progress={34} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="Partition" progress={56} />
                    <CosBackButton.Divider />
                    <div className="flex items-center gap-x-1.5 text-status-negative">
                      <span className="secondary-body6 font-semibold">
                        Powering Off
                      </span>
                      <CosLoadingSpinner
                        variant="dot45"
                        className="text-status-negative"
                      />
                    </div>
                  </>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Link, Bar Charts, and Custom Element Loading">
              <CosBackButton
                isLoading={true}
                titleRightContent={
                  <>
                    <CosBackButton.Divider />
                    <CosBackButton.Link onClick={noop}>
                      Monitor
                    </CosBackButton.Link>
                    <CosBackButton.Divider />
                    <CosBackButton.Link onClick={noop}>
                      Details Link
                    </CosBackButton.Link>
                  </>
                }
                titleBottomContent={
                  <>
                    <CosBackButton.BarChart label="CPU" progress={12} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="RAM" progress={34} />
                    <CosBackButton.Divider />
                    <CosBackButton.BarChart label="Partition" progress={56} />
                    <CosBackButton.Divider />
                    <CosSkeleton className="h-4 w-[83px]" />
                  </>
                }
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
