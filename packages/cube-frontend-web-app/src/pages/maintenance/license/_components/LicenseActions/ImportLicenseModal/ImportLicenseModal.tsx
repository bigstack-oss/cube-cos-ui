import { VerifyLicenseResponseData } from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { EffectNodeTable } from './EffectNodeTable'
import { ImportLicenseTable } from './ImportLicenseTable'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()

  const effectNodeRows = licenseVerifyInfo.effectNodes.map((node) => ({
    id: node.name,
    ...node,
  }))

  return (
    <CosModal
      className="h-[780px] max-h-screen"
      isOpen={!!licenseVerifyInfo}
      title={t('maintenance.license.importLicense')}
      actionText={t('maintenance.license.yesImportLicense')}
      actionButtonProps={{ loading: actionButtonLoading }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-5">
        <p className="primary-body2 text-functional-text">
          {t('maintenance.license.importLicenseConfirmation')}
        </p>
        <ImportLicenseTable license={licenseVerifyInfo.license} />
        <p className="primary-body2 text-functional-text">
          {t('maintenance.license.affectedNodes')}
        </p>
        <EffectNodeTable rows={effectNodeRows} />
      </div>
    </CosModal>
  )
}
