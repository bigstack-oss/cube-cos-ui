import { CosPanel } from '../../../components/CosPanel/CosPanel'
import { GetCosBasicTable } from '../../../components/CosBasicTable/CosBasicTable'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { PanelBlock } from './PanelBlock'
import { CosCountSegmentedChartCountInfo } from '../../../components/CosCountSegmentedChart/utils'
import { CosCountSegmentedChart } from '../../../components/CosCountSegmentedChart/CosCountSegmentedChart'
import { CosPercentagePieChart } from '../../../components/CosPercentagePieChart.tsx/CosPercentagePieChart'
import { noop } from 'lodash'

type Event = {
  id: string
  type: string
  eventId: string
  description: string
  host: string
  category: string
  service: string
  metadata: string
  time: string
}

const EventTable = GetCosBasicTable<Event>()

const getMockEvent = (index: number): Event => {
  return {
    id: String(index),
    type: 'Info',
    eventId: 'NET00003I',
    description: `'instance "940c6a1f-1f42-4152-a87e-56c0309939df" 
at 192.168.0.8 is reachable`,
    host: 'dell13',
    category: 'Net',
    service: 'senlin',
    metadata: 'id:940c6a1f-1f42-4152a87e-56c0309939df',
    time: 'yyyy/mm/dd 00:00',
  }
}

const events = Array.from(Array(5)).map((_, index) => {
  return getMockEvent(index)
})

const vmSummary = [
  {
    name: 'Running',
    color: 'fill-chart-2',
    count: 51,
  },
  {
    name: 'Stopped',
    color: 'fill-chart-4',
    count: 1,
  },
  {
    name: 'Suspended',
    color: 'fill-chart-3',
    count: 1,
  },
  {
    name: 'Paused',
    color: 'fill-chart-6',
    count: 1,
  },
  {
    name: 'Error',
    color: 'fill-status-negative',
    count: 1,
  },
] satisfies CosCountSegmentedChartCountInfo[]

const roleSummary = [
  {
    name: 'Control',
    color: 'fill-chart-1',
    count: 1,
  },
  {
    name: 'Compute',
    color: 'fill-chart-2',
    count: 1,
  },
  {
    name: 'Storage',
    color: 'fill-chart-3',
    count: 1,
  },
] satisfies CosCountSegmentedChartCountInfo[]

export const UsageSection = () => {
  const vmTotalCount = vmSummary.reduce((total, countInfo) => {
    return total + countInfo.count
  }, 0)

  return (
    <StoryLayout.Section title="Usage">
      <div className="flex flex-col gap-y-10">
        <PanelBlock title="Chart">
          <div className="flex flex-col gap-y-6">
            <CosPanel
              title="Chart"
              time="yyyy/mm/dd 00:00"
              hyperLinkProps={{ onClick: noop }}
            >
              <CosPanel.Item topic="VM Summary" subtext="73 Instances">
                <CosCountSegmentedChart
                  overview={{ name: 'Total VM', count: vmTotalCount }}
                  countInfos={vmSummary}
                />
              </CosPanel.Item>
              <CosPanel.Item topic="Role Summary" subtext="9 Roles">
                <CosCountSegmentedChart
                  overview={{ name: 'Control-convergerd', count: 2 }}
                  countInfos={roleSummary}
                />
              </CosPanel.Item>
            </CosPanel>
            <CosPanel
              title="Chart"
              time="yyyy/mm/dd 00:00"
              hyperLinkProps={{ onClick: noop }}
            >
              <CosPanel.Row>
                <CosPanel.Col className="flex-1">
                  <CosPanel.Item topic="VM Summary" subtext="73 Instances">
                    <CosCountSegmentedChart
                      overview={{ name: 'Total VM', count: vmTotalCount }}
                      countInfos={vmSummary}
                    />
                  </CosPanel.Item>
                  <CosPanel.Item topic="Role Summary" subtext="9 Roles">
                    <CosCountSegmentedChart
                      overview={{ name: 'Control-convergerd', count: 2 }}
                      countInfos={roleSummary}
                    />
                  </CosPanel.Item>
                </CosPanel.Col>
                <CosPanel.Item className="flex-1">
                  <div className="flex flex-row justify-between">
                    <CosPercentagePieChart
                      title="vCPU"
                      unit="vCPU"
                      total={144}
                      used={28}
                    />
                    <CosPercentagePieChart
                      title="Memory"
                      unit="GB"
                      total={755.1}
                      used={124.4}
                    />
                    <CosPercentagePieChart
                      title="Storage"
                      unit="GB"
                      total={24401.9}
                      used={578.8}
                    />
                  </div>
                </CosPanel.Item>
              </CosPanel.Row>
            </CosPanel>
          </div>
        </PanelBlock>

        <PanelBlock title="Table">
          <CosPanel
            title="Events"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <EventTable rows={events}>
              <EventTable.Column property="type" label="Type" />
              <EventTable.Column
                property="eventId"
                label="Event ID"
                emphasize
              />
              <EventTable.Column property="description" label="Description" />
              <EventTable.Column property="host" label="Host" />
              <EventTable.Column property="category" label="Category" />
              <EventTable.Column property="service" label="Service" />
              <EventTable.Column property="metadata" label="Metadata" />
              <EventTable.Column property="time" label="Time" />
            </EventTable>
          </CosPanel>
        </PanelBlock>
      </div>
    </StoryLayout.Section>
  )
}
