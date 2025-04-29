import { Meta } from '@storybook/react'
import { noop } from 'lodash'
import { CosBackButton } from '../../../components/CosBackButton/CosBackButton'
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

export const Gallery = {
  render: () => {
    return (
      <StoryLayout title="Back Button">
        <StoryLayout.Section title="With Title">
          <div className="flex flex-col gap-y-8">
            <BackButtonRow title="No Details">
              <CosBackButton variant="title" onClick={noop}>
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="No Details Loading">
              <CosBackButton isLoading={true} variant="title" onClick={noop}>
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Details">
              <CosBackButton
                variant="title"
                details="Detail text"
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Details Loading">
              <CosBackButton
                isLoading={true}
                variant="title"
                details="Detail text"
                onClick={noop}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="With Bar Charts">
          <div className="flex flex-col gap-y-8">
            <BackButtonRow title="No Links and No Bar Charts">
              <CosBackButton
                variant="bar-chart"
                barCharts={[]}
                linkSkeletonCount={0}
                barChartSkeletonCount={0}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="No Links and No Bar Charts Loading">
              <CosBackButton
                isLoading={true}
                variant="bar-chart"
                barCharts={[]}
                linkSkeletonCount={0}
                barChartSkeletonCount={0}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Links">
              <CosBackButton
                variant="bar-chart"
                links={[
                  {
                    children: 'Grafana',
                    target: '_blank',
                    href: `/#${Math.random()}`,
                  },
                  {
                    children: 'Detail Link',
                    target: '_blank',
                    href: `/#${Math.random()}`,
                  },
                ]}
                barCharts={[]}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Links Loading">
              <CosBackButton
                isLoading={true}
                variant="bar-chart"
                links={[
                  {
                    children: 'Grafana',
                    href: `/#${Math.random()}`,
                  },
                ]}
                barCharts={[]}
                barChartSkeletonCount={0}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Bar Charts">
              <CosBackButton
                variant="bar-chart"
                barCharts={[
                  {
                    label: 'CPU',
                    progress: 12,
                  },
                  {
                    label: 'RAM',
                    progress: 34,
                  },
                ]}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Bar Charts Loading">
              <CosBackButton
                isLoading={true}
                variant="bar-chart"
                barCharts={[
                  {
                    label: 'CPU',
                    progress: 12,
                  },
                  {
                    label: 'RAM',
                    progress: 34,
                  },
                ]}
                linkSkeletonCount={0}
                barChartSkeletonCount={2}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Links and Bar Charts">
              <CosBackButton
                variant="bar-chart"
                links={[
                  {
                    children: 'Monitor',
                    onClick: noop,
                  },
                ]}
                barCharts={[
                  {
                    label: 'CPU',
                    progress: 12,
                  },
                  {
                    label: 'RAM',
                    progress: 34,
                  },
                ]}
              >
                Page Title
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="With Links and Bar Charts Loading">
              <CosBackButton
                isLoading={true}
                variant="bar-chart"
                links={[
                  {
                    children: 'Monitor',
                    onClick: noop,
                  },
                ]}
                barCharts={[
                  {
                    label: 'CPU',
                    progress: 12,
                  },
                  {
                    label: 'RAM',
                    progress: 34,
                  },
                ]}
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
