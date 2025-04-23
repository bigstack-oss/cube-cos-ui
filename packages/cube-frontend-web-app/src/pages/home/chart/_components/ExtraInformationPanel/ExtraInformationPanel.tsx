import {
  GrafanaApiGetGrafanaNetworkDevicesRequest,
  GrafanaApiGetGrafanaNetworksRequest,
} from '@cube-frontend/api'
import { CosButton } from '@cube-frontend/ui-library'
import { grafanaApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext } from 'react'

export const ExtraInformationPanel = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data: networkGrafanaLinkResponse } = useCosGetRequest(
    grafanaApi.getGrafanaNetworks,
    (): GrafanaApiGetGrafanaNetworksRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const { data: deviceGrafanaLinkResponse } = useCosGetRequest(
    grafanaApi.getGrafanaNetworkDevices,
    (): GrafanaApiGetGrafanaNetworkDevicesRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const renderNetworkLink = () => {
    const buttonElement = (
      <CosButton
        size="sm"
        usage="text-only"
        loading={!networkGrafanaLinkResponse}
      >
        Network
      </CosButton>
    )

    if (!networkGrafanaLinkResponse) {
      // Grafana link is still loading.
      return buttonElement
    }

    if (!networkGrafanaLinkResponse.enabled) {
      // The related feature is disabled in Grafana.
      // Hide the hyperlink.
      return undefined
    }

    return (
      <a href={networkGrafanaLinkResponse.link} target="_blank">
        {buttonElement}
      </a>
    )
  }

  const renderDeviceLink = () => {
    const buttonElement = (
      <CosButton
        size="sm"
        usage="text-only"
        loading={!deviceGrafanaLinkResponse}
      >
        Device
      </CosButton>
    )

    if (!deviceGrafanaLinkResponse) {
      // Grafana link is still loading.
      return buttonElement
    }

    if (!deviceGrafanaLinkResponse.enabled) {
      // The related feature is disabled in Grafana.
      // Hide the hyperlink.
      return undefined
    }

    return (
      <a href={deviceGrafanaLinkResponse.link} target="_blank">
        {buttonElement}
      </a>
    )
  }

  const networkLinkElement = renderNetworkLink()
  const deviceLinkElement = renderDeviceLink()

  const hasLinks = !!networkLinkElement || !!deviceLinkElement

  return (
    hasLinks && (
      <div
        className="flex items-center gap-x-3 rounded-[5px] bg-grey-0 p-6"
        style={{
          boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)',
        }}
      >
        <div className="secondary-h4 text-functional-title">
          Extra Information
        </div>
        {networkLinkElement}
        {deviceLinkElement}
      </div>
    )
  )
}
