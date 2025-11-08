import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import {
  NodeLicenseCurrentStatus,
  VerifyLicenseResponseData,
} from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'
import { renderExpiredDays } from '../../utils'
import { useNodeLicenseStatusTranslations } from '../../useNodeLicenseStatusTranslations'

export type EffectNodeRow = VerifyLicenseResponseData['effectNodes'][number] &
  CosTableRow

const EffectNodeBasicTable = GetCosBasicTable<EffectNodeRow>()

export type EffectNodeTableProps = ComponentProps<typeof EffectNodeBasicTable>

export const EffectNodeTable = (props: EffectNodeTableProps) => {
  const { t } = useTranslation()

  const nodeLicenseStatusTranslations = useNodeLicenseStatusTranslations()

  return (
    <EffectNodeBasicTable {...props}>
      <EffectNodeBasicTable.Column
        label={t('maintenance.license.hostAffected')}
        property="name"
      />
      <EffectNodeBasicTable.Column
        label={t('maintenance.license.roles')}
        property="role"
      />
      <EffectNodeBasicTable.Column
        label={t('maintenance.license.currentStatus')}
        property="status"
      >
        {(status) =>
          nodeLicenseStatusTranslations[
            // Type assertion is needed here due to the OpenAPI spec is not correct
            // Once the spec is fixed, we can safely remove this assertion.
            status.current as NodeLicenseCurrentStatus
          ]
        }
      </EffectNodeBasicTable.Column>
      <EffectNodeBasicTable.Column
        label={t('maintenance.license.expired')}
        property="expiry"
      >
        {(expiry) => renderExpiredDays(expiry, t)}
      </EffectNodeBasicTable.Column>
    </EffectNodeBasicTable>
  )
}
