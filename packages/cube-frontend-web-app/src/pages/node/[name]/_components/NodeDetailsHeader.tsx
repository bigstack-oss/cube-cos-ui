import { GrafanaApiGetGrafanaHostsRequest, Node } from '@cube-frontend/api'
import {
  BarChartProps,
  CosBackButton,
  CosHyperlinkProps,
} from '@cube-frontend/ui-library'
import { grafanaApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { noop } from 'lodash'
import { useContext } from 'react'
import { Link } from 'react-router'

type NodeDetailsHeaderProps = {
  node: Node | undefined
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

  const getLinks = ():
    | Pick<CosHyperlinkProps, 'children' | 'onClick' | 'href' | 'target'>[]
    | undefined => {
    if (!grafanaLinkResponse?.enabled) return undefined

    return [
      {
        children: 'Monitor',
        href: grafanaLinkResponse.link,
        target: '_blank',
        onClick: noop,
      },
    ]
  }

  const getBarCharts = (): BarChartProps[] => {
    if (!node) return []

    return [
      {
        label: 'CPU',
        progress: node.vcpu.usedPercent,
      },
      {
        label: 'RAM',
        progress: node.memory.usedPercent,
      },
      {
        label: 'Partition',
        progress: node.storage.usedPercent,
      },
    ]
  }

  return (
    <CosBackButton
      variant="bar-chart"
      isLoading={!node}
      onClick={noop}
      links={getLinks()}
      barCharts={getBarCharts()}
      backLinkContainer={{
        Component: Link,
        props: {
          to: CosRoutesEnum.NODES_PAGE,
        },
      }}
    >
      {node?.hostname ?? ''}
    </CosBackButton>
  )
}
