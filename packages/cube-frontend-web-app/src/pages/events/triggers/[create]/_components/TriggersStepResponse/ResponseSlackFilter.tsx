import { useState } from 'react'
import { CosDropdown } from '@cube-frontend/ui-library'

/**
 * The filters are temporarily disabled for phase 1
 * The implementation will be completed in the next phase
 */
export const ResponseSlackFilter = () => {
  const [filter] = useState<string>('Send Notifications')
  const [slackChannel] = useState<string>('Slack Channel')

  return (
    <div className="mb-6 flex w-fit items-center gap-3">
      <CosDropdown
        size="sm"
        type="radio"
        selectedItems={[filter]}
        disabled={true}
      >
        <CosDropdown.Trigger>{filter}</CosDropdown.Trigger>
      </CosDropdown>
      <CosDropdown
        size="sm"
        type="radio"
        selectedItems={[slackChannel]}
        disabled={true}
      >
        <CosDropdown.Trigger>{slackChannel}</CosDropdown.Trigger>
      </CosDropdown>
    </div>
  )
}
