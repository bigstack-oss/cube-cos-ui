import { CosButton } from '@cube-frontend/ui-library'

export type AuthFormButtonsProps = {
  submitLabel: string
  /**
   * Keycloak's `isAppInitiatedAction`: the user asked for this step from the
   * account console, so they may back out of it with `cancel-aia`.
   */
  isAppInitiatedAction: boolean
}

export const AuthFormButtons = (props: AuthFormButtonsProps) => {
  const { submitLabel, isAppInitiatedAction } = props

  return (
    <div className="mt-12 flex gap-x-4">
      <CosButton className="flex-1" htmlType="submit" size="lg">
        {submitLabel}
      </CosButton>
      {isAppInitiatedAction && (
        <CosButton
          className="flex-1"
          type="secondary"
          htmlType="submit"
          size="lg"
          name="cancel-aia"
          value="true"
        >
          Cancel
        </CosButton>
      )}
    </div>
  )
}
