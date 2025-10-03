import { GrafanaApiGetGrafanaStoragesRequest } from '@cube-frontend/api'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { grafanaApi } from '@cube-frontend/web-app/api/cosApi'
import ScrollContainer from '@cube-frontend/web-app/components/ScrollContainer/ScrollContainer'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { computeTitleBarHyperlinkProps } from '../utils'
import { StorageBandwidthPanel } from './StorageBandwidthPanel'
import { StorageIopsPanel } from './StorageIopsPanel'
import { StorageLatencyPanel } from './StorageLatencyPanel'
import { useTranslation } from 'react-i18next'

export const StoragePanels = () => {
  const { t } = useTranslation()
  const { dataCenter } = useContext(DataCenterContext)

  const { data: grafanaLinkResponse } = useCosGetRequest(
    grafanaApi.getGrafanaStorages,
    (): GrafanaApiGetGrafanaStoragesRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  return (
    <CosGeneralPanel.Container>
      <CosGeneralPanel.TitleBar
        title={t('home.chart.storage.title')}
        hyperLinkProps={computeTitleBarHyperlinkProps(grafanaLinkResponse, t)}
      />
      <ScrollContainer
        className={twMerge(
          'flex items-stretch gap-x-4 [&>*]:min-w-[350px] [&>*]:flex-1',
        )}
      >
        <StorageBandwidthPanel />
        <StorageIopsPanel />
        <StorageLatencyPanel />
      </ScrollContainer>
    </CosGeneralPanel.Container>
  )
}
