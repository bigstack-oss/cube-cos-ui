import {
  GrafanaApiGetGrafanaHostsRequest,
  Node,
  NodeStatusEnum,
} from '@cube-frontend/api'
import {
  CosBackButton,
  CosHyperlink,
  CosLoadingSpinner,
} from '@cube-frontend/ui-library'
import { grafanaApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { noop } from 'lodash'
import { useContext } from 'react'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'

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

  const renderIPMIOperationSpinner = () => {
    const render = (text: string, colorClass: string) => {
      return (
        <>
          <CosBackButton.Divider />
          <div className="flex items-center gap-x-1.5">
            <span
              className={twMerge('secondary-body6 font-semibold', colorClass)}
            >
              {text}
            </span>
            <CosLoadingSpinner variant="dot45" className={colorClass} />
          </div>
        </>
      )
    }

    if (node?.status === NodeStatusEnum.PoweringOn) {
      return render('Powering On', twMerge('text-status-positive-text'))
    }

    if (node?.status === NodeStatusEnum.PoweringOff) {
      return render('Powering Off', twMerge('text-status-negative'))
    }

    if (node?.status === NodeStatusEnum.PoweringCycle) {
      return render('Powering Cycle', twMerge('text-functional-text'))
    }

    return null
  }

  const getTitleBottomContent = () => {
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
        {renderIPMIOperationSpinner()}
      </>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <CosBackButton
        isLoading={!node}
        onClick={noop}
        titleRightContent={getLinks()}
        titleBottomContent={getTitleBottomContent()}
        backButtonContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.NODES_PAGE,
          },
        }}
      >
        {node?.hostname ?? ''}
      </CosBackButton>
      {node?.ipmi.isSupported && (
        <Link to={CosRoutesEnum.NODE_IPMI_CONTROL_PAGE(node.hostname)}>
          <CosHyperlink variant="text-inline" onClick={noop}>
            IPMI Control
          </CosHyperlink>
        </Link>
      )}
    </div>
  )
}
