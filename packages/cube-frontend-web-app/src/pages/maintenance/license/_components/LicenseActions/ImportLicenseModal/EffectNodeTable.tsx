import { VerifyLicenseResponseData } from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'
import { ComponentProps } from 'react'
import { renderExpiredDays } from '../../utils'

export type EffectNodeRow = VerifyLicenseResponseData['effectNodes'][number] &
  CosTableRow

const EffectNodeBasicTable = GetCosBasicTable<EffectNodeRow>()

export type EffectNodeTableProps = ComponentProps<typeof EffectNodeBasicTable>

export const EffectNodeTable = (props: EffectNodeTableProps) => {
  return (
    <EffectNodeBasicTable {...props}>
      <EffectNodeBasicTable.Column label="Host affected" property="name" />
      <EffectNodeBasicTable.Column label="Roles" property="role" />
      <EffectNodeBasicTable.Column label="Current status" property="status">
        {(status) => upperFirst(status.current)}
      </EffectNodeBasicTable.Column>
      <EffectNodeBasicTable.Column label="Expiration" property="expiry">
        {renderExpiredDays}
      </EffectNodeBasicTable.Column>
    </EffectNodeBasicTable>
  )
}
