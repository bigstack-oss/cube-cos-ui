interface Window {
  /**
   * This object is dynamically added to the Window object in `login.ftl`.
   * In development mode, it's set up in `keycloakLoginContextSetupDev.ts`.
   */
  keycloakLoginContext: {
    resourcesPath: string
    incorrectCredentials: boolean
    formActionUrl: string
    authSelectedCredentials: string | undefined
  }
}
