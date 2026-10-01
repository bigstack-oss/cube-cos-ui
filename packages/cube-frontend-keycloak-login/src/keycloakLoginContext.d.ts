/**
 * The page-level message Keycloak hands the template (`message.type` and
 * `message.summary`). The `.ftl` only passes it on when Keycloak's base
 * template would have shown it, so a page renders whatever it receives.
 */
export type KeycloakMessage = {
  type: 'success' | 'warning' | 'error' | 'info'
  summary: string
}

type KeycloakPageContextBase = {
  resourcesPath: string
  formActionUrl: string
}

export type LoginPageContext = KeycloakPageContextBase & {
  pageId: 'login'
  incorrectCredentials: boolean
  // Keycloak does not provide a built-in template variable that explicitly
  // indicates a session timeout.
  // Currently, this value is determined solely on error messages, such as
  // checking if `message.type` equals `error` and `message.summary` contains
  // `timed out`. This is not reliable due to potential variations in message
  // content and localization.
  sessionTimedOut: boolean
  authSelectedCredentials: string | undefined
  loginGreeting: string
  isRememberMeEnabled: boolean
}

export type OtpCredential = {
  id: string
  userLabel: string
}

/** Set in `login-otp.ftl`. */
export type LoginOtpPageContext = KeycloakPageContextBase & {
  pageId: 'login-otp'
  message: KeycloakMessage | undefined
  otpCredentials: OtpCredential[]
  selectedCredentialId: string | undefined
  otpError: string | undefined
}

export type TotpPolicy = {
  type: 'totp' | 'hotp'
  algorithm: string
  digits: number
  period: number
  initialCounter: number
}

/** Set in `login-config-totp.ftl`. */
export type LoginConfigTotpPageContext = KeycloakPageContextBase & {
  pageId: 'login-config-totp'
  message: KeycloakMessage | undefined
  /** Keycloak's `mode` request parameter; `manual` means "Unable to scan?". */
  mode: string | undefined
  supportedApplications: string[]
  totpSecret: string
  totpSecretEncoded: string
  /** Base64 PNG, without the `data:` prefix. */
  totpSecretQrCode: string
  manualUrl: string
  qrUrl: string
  policy: TotpPolicy
  isUserLabelRequired: boolean
  isAppInitiatedAction: boolean
  totpError: string | undefined
  userLabelError: string | undefined
}

/** Set in `login-update-password.ftl`. */
export type LoginUpdatePasswordPageContext = KeycloakPageContextBase & {
  pageId: 'login-update-password'
  message: KeycloakMessage | undefined
  username: string
  isAppInitiatedAction: boolean
  passwordError: string | undefined
  passwordConfirmError: string | undefined
}

export type KeycloakLoginContext =
  | LoginPageContext
  | LoginOtpPageContext
  | LoginConfigTotpPageContext
  | LoginUpdatePasswordPageContext

export type KeycloakPageId = KeycloakLoginContext['pageId']

declare global {
  interface Window {
    /**
     * This object is dynamically added to the Window object by each `.ftl`
     * page (`login.ftl`, `login-otp.ftl`, ...); `pageId` says which one.
     * In development mode, it's set up in `keycloakLoginContextSetupDev.ts`.
     */
    keycloakLoginContext: KeycloakLoginContext
  }
}
