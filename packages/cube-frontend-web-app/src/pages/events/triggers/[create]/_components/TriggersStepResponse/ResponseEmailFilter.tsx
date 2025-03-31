import { useState } from 'react'
import { CosDropdown } from '@cube-frontend/ui-library'

/**
 * The filters are temporarily disabled for phase 1
 * The implementation will be completed in the next phase
 */
export const ResponseEmailFilter = () => {
  const [filter] = useState<string>('Send Notifications')
  const [email] = useState<string>('Email')

  return (
    <div className="mb-6 flex w-fit items-center gap-3">
      <CosDropdown
        type="regular"
        variant="in-table"
        selectedItems={[filter]}
        disabled={true}
      >
        <CosDropdown.Trigger>{filter}</CosDropdown.Trigger>
      </CosDropdown>
      <CosDropdown
        type="regular"
        variant="in-table"
        selectedItems={[email]}
        disabled={true}
      >
        <CosDropdown.Trigger>{email}</CosDropdown.Trigger>
      </CosDropdown>
    </div>
  )
}
