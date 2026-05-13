import { GetInfoTable } from '@cube-frontend/web-app/components/InfoTable/InfoTable'
import { ResourceProfile } from '../../mockResources'
import { ResourceRow } from '../../NodeResources'
import { confirmTableStyles } from './tableStyles'

const ConfirmTableInfoTable = GetInfoTable<ResourceProfile>()

type ConfirmTableProps = {
  confirmTableData: ResourceRow
}

export const ConfirmTable = (props: ConfirmTableProps) => {
  const { confirmTableData } = props

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
            <td className={confirmTableStyles.td()}>{confirmTableData.name}</td>
            <td className={confirmTableStyles.td()}>
              {confirmTableData.resourceType}
            </td>
            <td className={confirmTableStyles.td()}>
              {confirmTableData.pciAddress}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className={confirmTableStyles.bodyTd()}>
              <ConfirmTableInfoTable
                rows={confirmTableData.profiles}
                title="Profiles/ ID"
                scrollBehavior="vertical"
              >
                <ConfirmTableInfoTable.Column property="name" />
                <ConfirmTableInfoTable.Column
                  property="vramMb"
                  label="VRAM (MB)"
                />
                <ConfirmTableInfoTable.Column
                  property="counts"
                  label="Counts"
                />
              </ConfirmTableInfoTable>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
