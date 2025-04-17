import { useContext } from 'react'
import { upperFirst } from 'lodash'
import {
  CosButton,
  CosStackCard,
  CosStroke,
  CosTag,
} from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { groupAttributeByName } from '../../utils'
import { TriggersCreateContext } from '../../context'
import { TriggersAddButton } from '../TriggersAddButton'
import { TriggersSubtractButton } from '../TriggersSubtractButton'

export const TriggersStepEvent = () => {
  const { goToResponse, formValue, isFormValueValid, errorMessage } =
    useContext(TriggersCreateContext)

  /**
   * TODO: update api schema
   */
  const groupedAttributes = groupAttributeByName(formValue.formAttributes)

  const renderErrorMessage = () => {
    if (!errorMessage) return null
    return (
      <div className="primary-body3 text-status-negative">{errorMessage}</div>
    )
  }

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
      <div className="flex flex-col gap-2">
        {renderErrorMessage()}
        <CosButton
          size="md"
          type="primary"
          usage="icon-right"
          Icon={ChevronRight}
          disabled={!isFormValueValid}
          onClick={goToResponse}
          className="w-fit"
        >
          Next
        </CosButton>
      </div>
    </div>
  )
}
