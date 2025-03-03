import { CosPanel } from '../../../components/CosPanel/CosPanel'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { PanelBlock } from './PanelBlock'
import { CosCountSegmentedChart } from '../../../components/CosCountSegmentedChart/CosCountSegmentedChart'
import { CosPercentagePieChart } from '../../../components/CosPercentagePieChart/CosPercentagePieChart'
import { noop } from 'lodash'
import { events, EventTable, roleSummary, vmSummary } from './mockData'

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
                <CosPanel.Col>
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
                <CosPanel.Item>
                  <div className="flex flex-row justify-between gap-x-7">
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

        {/* TODO: Add health status according to the design guidelines. */}

        <PanelBlock title="Table">
          <CosPanel
            title="Events"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
            useContentWrapper={false}
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
