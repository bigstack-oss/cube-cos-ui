import { GrafanaApiGetGrafanaHostsRequest, Node } from '@cube-frontend/api'
import { CosHyperlink, CosSkeleton } from '@cube-frontend/ui-library'
import ChevronLeft from '@cube-frontend/ui-library/icons/monochrome/chevron_left.svg?react'
import { grafanaApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { noop } from 'lodash'
import { useContext } from 'react'
import { Link } from 'react-router'
import { HeaderProgressBarChart } from './HeaderProgressBarChart'

type NodeDetailsHeaderProps = {
  node: Node | undefined
}

const VerticalBar = () => {
  return <span className="h-4 w-px bg-functional-border-darker" />
}

export const NodeDetailsHeader = (props: NodeDetailsHeaderProps) => {
  const { node } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { data: grafanaLinkResponse } = useCosGetRequest(
    grafanaApi.getGrafanaHosts,
    (): GrafanaApiGetGrafanaHostsRequest | undefined => {
      if (!node) return undefined
      return {
        dataCenter: dataCenter!.name,
        hostname: node.hostname,
      }
    },
  )

  const renderBackButton = () => {
    return (
      <Link to="/nodes" className="p-1">
        <ChevronLeft className="icon-md" />
      </Link>
    )
  }

  const renderBarCharts = () => {
    return (
      <div className="flex items-center gap-x-3">
        <HeaderProgressBarChart
          isLoading={!node}
          label="CPU"
          progress={node?.vcpu.usedPercent ?? 0}
        />
        <VerticalBar />
        <HeaderProgressBarChart
          isLoading={!node}
          label="RAM"
          progress={node?.memory.usedPercent ?? 0}
        />
        <VerticalBar />
        <HeaderProgressBarChart
          isLoading={!node}
          label="Partition"
          progress={node?.storage.usedPercent ?? 0}
        />
      </div>
    )
  }

  if (!node) {
    return (
      <div className="flex items-start gap-x-4">
        {renderBackButton()}
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-3">
            <CosSkeleton className="h-6 w-[92px]" />
            <VerticalBar />
            <CosSkeleton className="h-4 w-[60px]" />
          </div>
          {renderBarCharts()}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-x-4">
      {renderBackButton()}
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-3">
          <span className="primary-h3 text-functional-title">
            {node.hostname}
          </span>
          {(!grafanaLinkResponse || grafanaLinkResponse.enabled) && (
            <>
              <VerticalBar />
              <CosHyperlink
                variant="text-only"
                size="sm"
                href={grafanaLinkResponse?.link}
                target="_blank"
                onClick={noop}
              >
                Grafana
              </CosHyperlink>
            </>
          )}
        </div>
        {renderBarCharts()}
      </div>
    </div>
  )
}
