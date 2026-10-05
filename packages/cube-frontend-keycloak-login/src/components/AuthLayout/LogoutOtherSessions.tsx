import { CosCheckbox } from '@cube-frontend/ui-library'

/** Keycloak's `logout-sessions` option, unchecked by default as in Keycloak 26 (22 had it checked). */
export const LogoutOtherSessions = () => {
  return (
    <CosCheckbox
      name="logout-sessions"
      value="on"
      label="Sign out from other devices"
      // The library caps checkbox labels at 152px, which wraps this one.
      labelClassName="max-w-none"
    />
  )
}
