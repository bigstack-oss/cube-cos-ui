import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import {
  KeycloakLoginContext,
  LoginConfigTotpPageContext,
  LoginOtpPageContext,
  LoginUpdatePasswordPageContext,
} from '../keycloakLoginContext'
import { KeycloakPage } from './KeycloakPage'

const base = {
  resourcesPath: '/resources',
  formActionUrl: 'http://kc/login-actions/authenticate?session_code=abc',
}

const render = (context: KeycloakLoginContext): string =>
  renderToStaticMarkup(<KeycloakPage context={context} />)

// The first tag carrying `attribute`, whatever order React writes them in.
const findTag = (html: string, attribute: string): string =>
  html.match(new RegExp(`<[^>]*${attribute}[^>]*>`))?.[0] ?? ''

const otpContext: LoginOtpPageContext = {
  ...base,
  pageId: 'login-otp',
  message: undefined,
  otpCredentials: [{ id: 'cred-1', userLabel: 'Phone' }],
  selectedCredentialId: 'cred-1',
  otpError: undefined,
}

const configTotpContext: LoginConfigTotpPageContext = {
  ...base,
  pageId: 'login-config-totp',
  message: undefined,
  mode: undefined,
  supportedApplications: ['FreeOTP', 'Google Authenticator'],
  totpSecret: 'raw-secret',
  totpSecretEncoded: 'ENCO DED',
  totpSecretQrCode: 'QRBASE64',
  manualUrl: 'http://kc/manual',
  qrUrl: 'http://kc/qr',
  policy: {
    type: 'totp',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    initialCounter: 0,
  },
  isUserLabelRequired: false,
  isAppInitiatedAction: false,
  totpError: undefined,
  userLabelError: undefined,
}

const updatePasswordContext: LoginUpdatePasswordPageContext = {
  ...base,
  pageId: 'login-update-password',
  message: undefined,
  username: 'alice',
  isAppInitiatedAction: false,
  passwordError: undefined,
  passwordConfirmError: undefined,
}

describe('KeycloakPage', () => {
  it('renders the login page for pageId login', () => {
    const html = render({
      ...base,
      pageId: 'login',
      incorrectCredentials: false,
      sessionTimedOut: false,
      authSelectedCredentials: undefined,
      loginGreeting: '',
      isRememberMeEnabled: true,
    })

    expect(html).toContain('Log in to the Data Center')
    expect(html).toContain('name="username"')
    expect(html).toContain(`action="${base.formActionUrl}"`)
  })

  it('renders the OTP page with Keycloak field names', () => {
    const html = render(otpContext)

    expect(html).toContain('Enter your one-time code')
    expect(html).toContain('name="otp"')
    expect(html).toContain('name="login"')
    expect(html).not.toContain('name="selectedCredentialId"')
  })

  it('asks which device only when there is more than one', () => {
    const html = render({
      ...otpContext,
      otpCredentials: [
        { id: 'cred-1', userLabel: 'Phone' },
        { id: 'cred-2', userLabel: '' },
      ],
      selectedCredentialId: 'cred-2',
    })

    expect(html.match(/name="selectedCredentialId"/g)).toHaveLength(2)
    expect(findTag(html, 'value="cred-2"')).toContain('checked=""')
    expect(findTag(html, 'value="cred-1"')).not.toContain('checked')
    expect(html).toContain('Device 2')
  })

  it("shows Keycloak's own error text", () => {
    const html = render({
      ...otpContext,
      otpError: 'Invalid authenticator code.',
    })

    expect(html).toContain('Invalid authenticator code.')
  })

  it('renders the TOTP setup page with the QR code', () => {
    const html = render(configTotpContext)

    expect(html).toContain('Set up two-factor authentication')
    expect(html).toContain('src="data:image/png;base64, QRBASE64"')
    expect(html).toContain('href="http://kc/manual"')
    expect(html).toContain('FreeOTP, Google Authenticator')
    expect(html).toContain('name="totp"')
    expect(findTag(html, 'name="totpSecret"')).toContain('value="raw-secret"')
    expect(html).toContain('name="userLabel"')
    expect(html).toContain('name="logout-sessions"')
    expect(html).not.toContain('name="mode"')
    expect(html).not.toContain('name="cancel-aia"')
  })

  it('renders the manual setup mode with the key and policy', () => {
    const html = render({ ...configTotpContext, mode: 'manual' })

    expect(html).toContain('ENCO DED')
    expect(html).toContain('href="http://kc/qr"')
    expect(findTag(html, 'name="mode"')).toContain('value="manual"')
    expect(html).toContain('Time-based')
    expect(html).not.toContain('QRBASE64')
  })

  it('offers Cancel on an application-initiated action', () => {
    const html = render({ ...configTotpContext, isAppInitiatedAction: true })

    expect(findTag(html, 'name="cancel-aia"')).toContain('value="true"')
  })

  it('renders the update password page with Keycloak field names', () => {
    const html = render({
      ...updatePasswordContext,
      passwordConfirmError: "Passwords don't match.",
      message: {
        type: 'warning',
        summary: 'You need to change your password.',
      },
    })

    expect(html).toContain('Update your password')
    expect(findTag(html, 'name="username"')).toContain('value="alice"')
    expect(html).toContain('name="password-new"')
    expect(html).toContain('name="password-confirm"')
    expect(html).toContain('Passwords don&#x27;t match.')
    expect(html).toContain('You need to change your password.')
  })
})
