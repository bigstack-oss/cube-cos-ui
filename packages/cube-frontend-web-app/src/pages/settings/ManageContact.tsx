import { CosButton, CosInput, CosStroke } from '@cube-frontend/ui-library'
import { ChangeEvent, useEffect, useState } from 'react'
import { SettingsSection } from './SettingsSection'

export const ManageContact = () => {
  // TODO: Replace mock states with API response once the title prefix API is implemented.
  const [isLoading, setIsLoading] = useState(true)
  const [titlePrefix, setTitlePrefix] = useState('🚧WIP🚧')

  // Fake loading state.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const onTitlePrefixChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitlePrefix(e.target.value)
  }

  return (
    <SettingsSection>
      <h5 className="secondary-h4 text-functional-text">Manage Contact</h5>
      <CosStroke type="dot" />
      <div className="flex flex-col gap-y-1.5">
        <div className="primary-body2 font-semibold text-functional-text">
          Title prefix
        </div>
        <div className="flex items-center gap-x-6">
          <CosInput
            placeholder="Title prefix"
            isLoading={isLoading}
            value={titlePrefix}
            onChange={onTitlePrefixChange}
          />
          <CosButton usage="text-only">Save</CosButton>
        </div>
      </div>
      <p className="primary-body4 text-functional-text-light">
        This is an alias for identifying and distinguishing this cluster.
      </p>
    </SettingsSection>
  )
}
