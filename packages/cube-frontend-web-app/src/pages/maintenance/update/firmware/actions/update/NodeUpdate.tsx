import {
  CosButton,
  CosNagging,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'
import { UpdateStatus } from './UpdateStatus'
import { UpgradeProgressRow } from './updateActionUtils'

type NodeUpdateProps = {
  upgradeProgressRows: UpgradeProgressRow[]
  isRolling: boolean
}

const UpgradeProgressTable = GetCosBasicTable<UpgradeProgressRow>()

export const NodeUpdate = (props: NodeUpdateProps) => {
  const { isRolling, upgradeProgressRows } = props

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        Currently updating the following nodes...
      </div>
      <UpgradeProgressTable rows={upgradeProgressRows}>
        <UpgradeProgressTable.Column label="Host" property="host" />
        <UpgradeProgressTable.Column label="Status" property="status">
          {(status) => <UpdateStatus status={status} />}
        </UpgradeProgressTable.Column>
        <UpgradeProgressTable.Column label="Phase" property="phase">
          {(phase) => {
            return phase ? (
              <div className="font-semibold text-cosmos-primary">
                {upperFirst(phase)}
              </div>
            ) : (
              <div>-</div>
            )
          }}
        </UpgradeProgressTable.Column>
        <UpgradeProgressTable.Column label="Updating Details" property="status">
          {(status) =>
            status.description ? upperFirst(status.description) : '-'
          }
        </UpgradeProgressTable.Column>
        <UpgradeProgressTable.Column property="status">
          {(status) => {
            if (status.current === 'failed')
              return (
                <div className="flex justify-end">
                  <CosButton
                    size="sm"
                    type="warning"
                    onClick={() => window.alert('click')}
                  >
                    Continue Anyway
                  </CosButton>
                </div>
              )
            return null
          }}
        </UpgradeProgressTable.Column>
      </UpgradeProgressTable>
      {isRolling && (
        <div className="primary-body2 text-functional-text">
          Each node will be updated one by one. Running VMs will be
          automatically evacuated before update.
        </div>
      )}
      <CosNagging
        variant="top"
        type="warning"
        title="If a node fails to update, please resolve the issue manually to
        continue."
        className="w-full"
        titleClassName="font-normal text-functional-text"
      />
    </div>
  )
}
