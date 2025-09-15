import { CosCheckbox, GetCosBasicTable } from '@cube-frontend/ui-library'
import { UpdatableNodeRow } from './updateActionUtils'

type UpdatableNodesProps = {
  updatableNodeRows: UpdatableNodeRow[]
  isRolling: boolean
  onIsRollingCheck: () => void
}

const UpdatableNodeTable = GetCosBasicTable<UpdatableNodeRow>()

export const UpdatableNodes = (props: UpdatableNodesProps) => {
  const { updatableNodeRows, isRolling, onIsRollingCheck } = props

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        Do you want to update these nodes:
      </div>
      <UpdatableNodeTable rows={updatableNodeRows}>
        <UpdatableNodeTable.Column label="Host" property="name" />
        <UpdatableNodeTable.Column
          label="(Active) Firmware version"
          property="firmware"
          emphasize={true}
        >
          {(firmware) => firmware.active}
        </UpdatableNodeTable.Column>
        <UpdatableNodeTable.Column
          label="(Inactive) Firmware version"
          property="firmware"
          emphasize={true}
        >
          {(firmware) => firmware.inactive}
        </UpdatableNodeTable.Column>
      </UpdatableNodeTable>
      <div className="flex items-start gap-x-2">
        <CosCheckbox
          label="Rolling update — each node will be updated one by one. If any node is
          currently hosting running VMs, they will be automatically evacuated
          before the update to avoid service disruption."
          labelClassName="max-w-none"
          checked={isRolling}
          onChange={onIsRollingCheck}
        />
      </div>
    </div>
  )
}
