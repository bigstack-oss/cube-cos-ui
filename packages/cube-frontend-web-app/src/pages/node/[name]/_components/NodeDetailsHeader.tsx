import { GrafanaApiGetGrafanaHostsRequest, Node } from '@cube-frontend/api'
import { CosBackButton, CosHyperlink } from '@cube-frontend/ui-library'
import { grafanaApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { noop } from 'lodash'
import { MouseEvent, useContext } from 'react'
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

  const getLinks = () => {
    if (grafanaLinkResponse && !grafanaLinkResponse.enabled) return undefined

    return (
      <>
        <CosBackButton.Divider />
        <CosBackButton.Link
          href={grafanaLinkResponse?.link}
          target="_blank"
          onClick={noop}
        >
          Monitor
        </CosBackButton.Link>
      </>
    )
  }

  const getBarCharts = () => {
    return (
      <>
        <CosBackButton.BarChart
          label="CPU"
          progress={node?.vcpu.usedPercent ?? 0}
        />
        <CosBackButton.Divider />
        <CosBackButton.BarChart
          label="RAM"
          progress={node?.memory.usedPercent ?? 0}
        />
        <CosBackButton.Divider />
        <CosBackButton.BarChart
          label="Partition"
          progress={node?.storage.usedPercent ?? 0}
        />
      </>
    )
  }

  const onIPMILinkClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (!node) {
      e.preventDefault()
    }
  }

  return (
    <div className="flex items-center justify-between">
      <CosBackButton
        isLoading={!node}
        onClick={noop}
        titleRightContent={getLinks()}
        titleBottomContent={getBarCharts()}
        backButtonContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.NODES_PAGE,
          },
        }}
      >
        {node?.hostname ?? ''}
      </CosBackButton>
      <Link
        to={CosRoutesEnum.NODE_IPMI_CONTROL_PAGE(node?.hostname)}
        onClick={onIPMILinkClick}
      >
        <CosHyperlink variant="text-inline" onClick={noop} disabled={!node}>
          IPMI Control
        </CosHyperlink>
      </Link>
    </div>
  )
}
