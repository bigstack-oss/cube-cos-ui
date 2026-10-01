import { CosCheckbox } from '@cube-frontend/ui-library'

/** Keycloak's `logout-sessions` option, checked by default as in Keycloak. */
export const LogoutOtherSessions = () => {
  return (
    <CosCheckbox
      name="logout-sessions"
      value="on"
      label="Sign out from other devices"
      // The library caps checkbox labels at 152px, which wraps this one.
      labelClassName="max-w-none"
      defaultChecked={true}
    />
  )
}
