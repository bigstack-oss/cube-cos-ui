import type {
  KeycloakLoginContext,
  KeycloakPageId,
} from './keycloakLoginContext'

// Pick the page with `?page=<pageId>`, e.g. `?page=login-config-totp`, and
// add any of these flags to see other states:
// - `errors`: Keycloak's field errors for the page.
// - `manual`: the "Unable to scan?" mode of `login-config-totp`.
// - `aia`: an application-initiated action, which adds the Cancel button.
// - `devices`: two OTP devices on `login-otp`, which adds the selector.
const getDevContext = (params: URLSearchParams): KeycloakLoginContext => {
  const pageId = (params.get('page') ?? 'login') as KeycloakPageId
  const hasErrors = params.has('errors')
  const isAppInitiatedAction = params.has('aia')

  const base = {
    resourcesPath: '/resources',
    formActionUrl:
      'http://localhost:8642/auth/realms/master/login-actions/authenticate?session_code=a6ESSp_K4BexArNGC3-vShOEDcO79tvomSu8SJrN8_k&execution=336de572-f999-43b8-af68-961e86711af7&client_id=security-admin-console&tab_id=AQCFEittHgs',
  }

  switch (pageId) {
    case 'login-otp':
      return {
        ...base,
        pageId,
        message: undefined,
        otpCredentials: params.has('devices')
          ? [
              { id: 'b3c1d9e2-0001', userLabel: 'Work phone' },
              { id: 'b3c1d9e2-0002', userLabel: 'Backup tablet' },
            ]
          : [{ id: 'b3c1d9e2-0001', userLabel: 'Work phone' }],
        selectedCredentialId: 'b3c1d9e2-0001',
        otpError: hasErrors ? 'Invalid authenticator code.' : undefined,
      }
    case 'login-config-totp':
      return {
        ...base,
        pageId,
        message: hasErrors
          ? undefined
          : {
              type: 'warning',
              summary:
                'You need to set up Mobile Authenticator to activate your account.',
            },
        mode: params.has('manual') ? 'manual' : undefined,
        supportedApplications: [
          'FreeOTP',
          'Google Authenticator',
          'Microsoft Authenticator',
        ],
        totpSecret: 'Kj2N3rTq8vLmP0aXcYz1',
        totpSecretEncoded: 'JNVD EM3S KRYD Q5SM NVID AYKY MN4X UMI',
        // A placeholder pattern, not a scannable code.
        totpSecretQrCode:
          'iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0AQAAAAB84SuKAAAAxUlEQVR42sWVUQ7CMAxDcwPf/5a5gbHTAeMzRoJI6/p+qtrOsuJn1c+5qlAgZhMwSLGLjPgAZhNydTe+4O6qmC0DbN70bdg2CmXq298NT4oShFu+O5YYqTIgYJmJ1lLNjpijRHn03GfLPq310pnj55Z9mjSNmIQpKdMIXjPGxOFbBYzJQoL47K8du4vsxmnNPbts5glkzxOmHVUlfM2T80knXKeT6DhCdpZ1+RrxNGMXErYe9ZQeMOCZ51pl6Gsebfi//68H4FbeLo31nMYAAAAASUVORK5CYII=',
        manualUrl: '?page=login-config-totp&manual',
        qrUrl: '?page=login-config-totp',
        policy: {
          type: 'totp',
          algorithm: 'SHA1',
          digits: 6,
          period: 30,
          initialCounter: 0,
        },
        isUserLabelRequired: false,
        isAppInitiatedAction,
        totpError: hasErrors ? 'Invalid authenticator code.' : undefined,
        userLabelError: undefined,
      }
    case 'login-update-password':
      return {
        ...base,
        pageId,
        message: hasErrors
          ? undefined
          : {
              type: 'warning',
              summary:
                'You need to change your password to activate your account.',
            },
        username: 'admin',
        isAppInitiatedAction,
        passwordError: undefined,
        passwordConfirmError: hasErrors ? "Passwords don't match." : undefined,
      }
    case 'login':
    default:
      return {
        ...base,
        pageId: 'login',
        incorrectCredentials: false,
        sessionTimedOut: false,
        authSelectedCredentials: undefined,
        loginGreeting: '',
        isRememberMeEnabled: true,
      }
  }
}

if (import.meta.env.DEV) {
  window.keycloakLoginContext = getDevContext(
    new URLSearchParams(window.location.search),
  )
}
