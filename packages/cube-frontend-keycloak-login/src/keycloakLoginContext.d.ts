interface Window {
  /**
   * This object is dynamically added to the Window object in `login.ftl`.
   * In development mode, it's set up in `keycloakLoginContextSetupDev.ts`.
   */
  keycloakLoginContext: {
    resourcesPath: string
    incorrectCredentials: boolean
    // Keycloak does not provide a built-in template variable that explicitly
    // indicates a session timeout.
    // Currently, this value is determined solely on error messages, such as
    // checking if `message.type` equals `error` and `message.summary` contains
    // `timed out`. This is not reliable due to potential variations in message
    // content and localization.
    sessionTimedOut: boolean
    formActionUrl: string
    authSelectedCredentials: string | undefined
    loginGreeting: string
  }
}
