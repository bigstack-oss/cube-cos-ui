import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { GetInfoTable } from '@cube-frontend/web-app/components/InfoTable/InfoTable'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { GPUProfileRow, GpuTypeLabelKeyMap } from '../../utils'
import { ConfirmTableData } from '../editGPUResourceUtils'
import { confirmTableStyles } from './tableStyles'

const ConfirmTableInfoTable = GetInfoTable<GPUProfileRow>()

type ConfirmTableProps = {
  confirmTableData: ConfirmTableData
}

export const ConfirmTable = (props: ConfirmTableProps) => {
  const { confirmTableData } = props

  const { t } = useTranslation()

  const isPgpu = confirmTableData.resourceType === 'pgpu'

  const profileRows = confirmTableData.editedProfiles
  const profileCount = profileRows.length

  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="primary-body3 flex font-semibold text-functional-title">
        {t('nodes.details.gpuList.title')}
      </div>
      <table className={confirmTableStyles.table()}>
        <thead className={confirmTableStyles.thead()}>
          <tr>
            <th className={confirmTableStyles.th()}>
              {t('nodes.details.gpuList.gpuCard')}
            </th>
            <th className={confirmTableStyles.th()}>
              {t('nodes.details.editGpuType.gpuType')}
            </th>
            <th className={confirmTableStyles.th()}>
              {t('nodes.details.gpuList.pciAddress')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className={twMerge(
                confirmTableStyles.td({ isLast: isPgpu }),
                'font-semibold',
              )}
            >
              {confirmTableData.name}
            </td>
            <td className={confirmTableStyles.td({ isLast: isPgpu })}>
              {t(GpuTypeLabelKeyMap[confirmTableData.resourceType])}
            </td>
            <td className={confirmTableStyles.td({ isLast: isPgpu })}>
              {confirmTableData.pciAddress}
            </td>
          </tr>
          {isPgpu ? null : (
            <tr>
              <td colSpan={3} className={confirmTableStyles.bodyTd()}>
                <ConfirmTableInfoTable
                  rows={profileRows}
                  title={`${t('nodes.details.profilesIdList.title')} (${profileCount})`}
                  scrollBehavior="vertical"
                >
                  <ConfirmTableInfoTable.Column property="name" />
                  <ConfirmTableInfoTable.Column
                    property="vramMiB"
                    label={t('nodes.details.profilesIdList.vram')}
                  >
                    {(vramMiB) => toReadableSizeString(vramMiB, 'MiB')}
                  </ConfirmTableInfoTable.Column>
                  <ConfirmTableInfoTable.Column
                    property="count"
                    label={t('nodes.details.profilesIdList.counts')}
                  />
                </ConfirmTableInfoTable>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
