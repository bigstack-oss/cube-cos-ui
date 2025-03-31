import { useContext } from 'react'
import { upperFirst } from 'lodash'
import { CosButton, CosStackCard, CosTag } from '@cube-frontend/ui-library'
import { TriggersAddButton } from '../TriggersAddButton'
import { TriggersSubtractButton } from '../TriggersSubtractButton'
import { groupAttributeByName } from '../utils'
import { TriggersCreateContext } from '../context'

export const TriggersStepEvent = () => {
  const { attributes } = useContext(TriggersCreateContext)

  const groupedAttributes = groupAttributeByName(attributes) || {}

  return (
    <div className="flex flex-col gap-6 rounded-[5px] bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <TriggersAddButton disabled={true} type="ghost">
          Add Attribute
        </TriggersAddButton>
        <CosButton disabled={true} type="ghost">
          Reset
        </CosButton>
      </div>
      {Object.entries(groupedAttributes).map(([groupName, groupAttributes]) => (
        <div key={groupName} className="flex items-center justify-between">
          <CosStackCard title={upperFirst(groupName)}>
            <div className="flex flex-wrap gap-2">
              {groupAttributes.map((attr) => (
                <CosTag key={attr.value} color="blue" variant="stroke">
                  {attr.value}
                </CosTag>
              ))}
            </div>
          </CosStackCard>
          <TriggersSubtractButton disabled={true} type="ghost">
            Remove
          </TriggersSubtractButton>
        </div>
      ))}
    </div>
  )
}
