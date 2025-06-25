import {
  CosButton,
  CosStackCard,
  CosStroke,
  CosTag,
} from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'
import { useContext } from 'react'

import { TriggersAddButton } from '../TriggersAddButton'
import { TriggersNextButton } from '../TriggersNextButton'
import { TriggersPreviousButton } from '../TriggersPreviousButton'
import { TriggersSubtractButton } from '../TriggersSubtractButton'
import { TriggersCreateContext } from '../../create/context'
import { groupAttributeByName } from '../../create/utils'

export const TriggersStepEvent = () => {
  const { goToResponse, formValue, isFormValueValid } = useContext(
    TriggersCreateContext,
  )

  const groupedAttributes = groupAttributeByName(formValue.formAttributes)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-6 rounded-[5px] bg-grey-0 px-6 py-4 [box-shadow:0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]">
        <div className="flex items-center justify-between">
          <TriggersAddButton disabled={true} type="ghost">
            Add Attribute
          </TriggersAddButton>
          <CosButton disabled={true} type="ghost">
            Reset
          </CosButton>
        </div>
        {Object.entries(groupedAttributes).map(
          ([groupName, groupAttributes]) => (
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
          ),
        )}
      </div>
      <CosStroke type="dot" />
      <div className="flex items-center gap-x-4">
        <TriggersPreviousButton />
        <TriggersNextButton
          disabled={!isFormValueValid}
          onClick={goToResponse}
        />
      </div>
    </div>
  )
}
