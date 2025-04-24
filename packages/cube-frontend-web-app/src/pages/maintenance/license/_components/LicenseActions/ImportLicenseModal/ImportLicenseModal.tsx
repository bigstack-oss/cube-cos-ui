import { VerifyLicenseResponseData } from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { EffectNodeTable } from './EffectNodeTable'
import { ImportLicenseTable } from './ImportLicenseTable'

export type ImportLicenseModalProps = {
  licenseVerifyInfo: VerifyLicenseResponseData
  actionButtonLoading: boolean
  onActionClick: () => void
  onCloseClick: () => void
}

export const ImportLicenseModal = (props: ImportLicenseModalProps) => {
  const {
    licenseVerifyInfo,
    actionButtonLoading,
    onActionClick,
    onCloseClick,
  } = props

  const effectNodeRows = licenseVerifyInfo.effectNodes.map((node) => ({
    id: node.name,
    ...node,
  }))

  return (
    <CosModal
      isOpen={!!licenseVerifyInfo}
      title="Import License"
      actionText="Yes, import license"
      actionButtonProps={{ loading: actionButtonLoading }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-5">
        <p className="primary-body2 text-functional-text">
          Do you want to import the license to the data center? It'll take about
          a few minutes.
        </p>
        <ImportLicenseTable license={licenseVerifyInfo.license} />
        <p className="primary-body2 text-functional-text">
          Here are the nodes that will be affected:
        </p>
        <EffectNodeTable rows={effectNodeRows} />
      </div>
    </CosModal>
  )
}
