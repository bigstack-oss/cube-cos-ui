import { useTranslation } from 'react-i18next'
import { Node, NodeNetworkInterfacesInner } from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosTableRow,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'

type NodeNetworksProps = {
  node: Node | undefined
}

type NetworkRow = CosTableRow & NodeNetworkInterfacesInner

const NetworkTable = GetCosBasicTable<NetworkRow>()

export const NodeNetworks = (props: NodeNetworksProps) => {
  const { node } = props

  const { t } = useTranslation()

  const getNetworkRows = (): NetworkRow[] => {
    const networks = node?.networkInterfaces ?? []
    return networks.map((network) => ({
      id: network.busIdSlaves,
      ...network,
    }))
  }

  return (
    <CosGeneralPanel
      leftSlot={
        <div className="primary-body3 text-functional-text">
          {t('nodes.details.network.title')}
        </div>
      }
    >
      <NetworkTable isLoading={!node} rows={getNetworkRows()}>
        <NetworkTable.Column
          label={t('nodes.details.network.label')}
          property="label"
          emphasize={true}
        />
        <NetworkTable.Column
          label={t('nodes.details.network.interface')}
          property="interface"
        />
        <NetworkTable.Column
          label={t('nodes.details.network.busIdSlaves')}
          property="busIdSlaves"
        />
        <NetworkTable.Column
          label={t('nodes.details.network.driver')}
          property="driver"
        />
        <NetworkTable.Column
          label={t('nodes.details.network.state')}
          property="state"
        />
        <NetworkTable.Column
          label={t('nodes.details.network.speed')}
          property="speed"
        />
      </NetworkTable>
    </CosGeneralPanel>
  )
}
