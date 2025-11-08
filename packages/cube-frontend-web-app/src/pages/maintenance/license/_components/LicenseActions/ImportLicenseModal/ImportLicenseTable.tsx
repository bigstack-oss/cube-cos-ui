import { useTranslation } from 'react-i18next'
import { upperFirst } from 'lodash'
import { VerifyLicenseResponseDataLicense } from '@cube-frontend/api'
import { CosDetailsTable } from '@cube-frontend/ui-library'
import { formatLicenseDate } from '@cube-frontend/web-app/utils/date'
import { useFeatureTranslations } from '../../useFeatureTranslations'
import { useOnlyTranslateNA } from '../../useOnlyTranslateNA'

export type ImportLicenseTableProps = {
  license: VerifyLicenseResponseDataLicense
}

export const ImportLicenseTable = (props: ImportLicenseTableProps) => {
  const { license } = props

  const { t } = useTranslation()

  const featureTranslations = useFeatureTranslations()

  const onlyTranslateNA = useOnlyTranslateNA()

  return (
    <CosDetailsTable header={license.name || 'Unnamed License'}>
      <CosDetailsTable.Row title={t('maintenance.license.product')}>
        {license.product.name}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title={t('maintenance.license.status')}>
        {upperFirst(license.status.current)}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title={t('maintenance.license.feature')}>
        {featureTranslations[license.product.feature]}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title={t('maintenance.license.supportPlan')}>
        {onlyTranslateNA(license.supportPlan)}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title={t('maintenance.license.issueDate')}>
        {formatLicenseDate(license.issue.date)}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title={t('maintenance.license.issuer')}>
        {license.issue.by}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title={t('maintenance.license.expireDate')}>
        {formatLicenseDate(license.expiry.date)}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title={t('maintenance.license.hardwareSerials')}>
        {license.issue.hardware}
      </CosDetailsTable.Row>
    </CosDetailsTable>
  )
}
