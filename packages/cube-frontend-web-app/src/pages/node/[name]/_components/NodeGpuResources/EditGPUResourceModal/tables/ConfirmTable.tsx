import { twMerge } from 'tailwind-merge'
import {
  ListNodeGPUCardsResponseDataInner,
  ListNodeGPUCardsResponseDataInnerProfilesInner,
} from '@cube-frontend/api'
import { GetInfoTable } from '@cube-frontend/web-app/components/InfoTable/InfoTable'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { confirmTableStyles } from './tableStyles'
import { getResourceTypeLabel } from '../editGPUResourceUtils'

const ConfirmTableInfoTable =
  GetInfoTable<ListNodeGPUCardsResponseDataInnerProfilesInner>()

type ConfirmTableProps = {
  confirmTableData: ListNodeGPUCardsResponseDataInner
}

export const ConfirmTable = (props: ConfirmTableProps) => {
  const { confirmTableData } = props

  const isPgpu = confirmTableData.resourceType === 'pgpu'

  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="primary-body3 flex font-semibold text-functional-title">
        GPU Resource
      </div>
      <table className={confirmTableStyles.table()}>
        <thead className={confirmTableStyles.thead()}>
          <tr>
            <th className={confirmTableStyles.th()}>GPU card</th>
            <th className={confirmTableStyles.th()}>GPU type</th>
            <th className={confirmTableStyles.th()}>PCI Address</th>
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
              {getResourceTypeLabel(confirmTableData.resourceType)}
            </td>
            <td className={confirmTableStyles.td({ isLast: isPgpu })}>
              {confirmTableData.pciAddress}
            </td>
          </tr>
          {isPgpu ? null : (
            <tr>
              <td colSpan={3} className={confirmTableStyles.bodyTd()}>
                <ConfirmTableInfoTable
                  rows={confirmTableData.profiles ?? []}
                  title={`Profiles/ ID (${confirmTableData.profiles?.length ?? 0})`}
                  scrollBehavior="vertical"
                >
                  <ConfirmTableInfoTable.Column property="name" />
                  <ConfirmTableInfoTable.Column property="vramMiB" label="VRAM">
                    {(vramMiB) => toReadableSizeString(vramMiB, 'MiB')}
                  </ConfirmTableInfoTable.Column>
                  <ConfirmTableInfoTable.Column
                    property="count"
                    label="Counts"
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
