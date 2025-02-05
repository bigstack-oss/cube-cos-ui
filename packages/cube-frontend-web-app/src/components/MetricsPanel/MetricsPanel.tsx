import { GetMetricsResponseData } from '@cube-frontend/api'
import { CosPanel } from '@cube-frontend/web-app/components/CosPanel/CosPanel'
import { metricsApi } from '@cube-frontend/web-app/utils/cosApi'
import { useEffect, useState } from 'react'

const dataCenter = 'dell13'

const MetricsPanel = () => {
  const [metrics, setMetrics] = useState<GetMetricsResponseData | undefined>()

  useEffect(() => {
    metricsApi.getMetricsOverview(dataCenter).then((metricsResponse) => {
      setMetrics(metricsResponse.data.data)
    })
  }, [])

  if (!metrics) {
    return <div>Loading...</div>
  }

  return (
    <CosPanel title="Chart">
      <div>
        <div className="flex flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4">
          <span>VM Summary</span>
          <div>
            <p>total: {metrics.vm.status.total}</p>
            <p>error: {metrics.vm.status.error}</p>
            <p> paused: {metrics.vm.status.paused}</p>
            <p> running: {metrics.vm.status.running}</p>
            <p> stopped: {metrics.vm.status.stopped}</p>
            <p> suspended: {metrics.vm.status.suspend}</p>
            <p> unknown: {metrics.vm.status.unknown}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4">
          <span>Host Summary</span>
          <div>
            <p>compute: {metrics.host.role.compute}</p>
            <p>storage: {metrics.host.role.storage}</p>
            <p>control: {metrics.host.role.control}</p>
            <p>controlConverged: {metrics.host.role.controlConverged}</p>
            <p>others: {metrics.host.role.others}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4">
          <span>vCPU</span>
          <div>
            <p>used percentage: {metrics.vm.usage.vcpu.usedPercent * 100} %</p>
            <p>
              {metrics.vm.usage.vcpu.usedCores}/
              {metrics.vm.usage.vcpu.totalCores} vCPU used
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4">
          <span>Memory</span>
          <div>
            <p>
              used percentage: {metrics.vm.usage.memory.usedPercent * 100} %
            </p>
            <p>
              {metrics.vm.usage.memory.usedMiB}/
              {metrics.vm.usage.memory.totalMiB} MiB used
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4">
          <span>Storage</span>
          <div>
            <p>
              used percentage: {metrics.vm.usage.storage.usedPercent * 100} %
            </p>
            <p>
              {metrics.vm.usage.storage.usedMiB}/
              {metrics.vm.usage.storage.totalMiB} MiB used
            </p>
          </div>
        </div>
      </div>
    </CosPanel>
  )
}

export default MetricsPanel
