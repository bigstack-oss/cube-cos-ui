import { CosHyperlink, CosInput, CosStroke } from '@cube-frontend/ui-library'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { AuthForm } from '../components/AuthLayout/AuthForm'
import { AuthFormButtons } from '../components/AuthLayout/AuthFormButtons'
import { LogoutOtherSessions } from '../components/AuthLayout/LogoutOtherSessions'
import { PageMessage } from '../components/AuthLayout/PageMessage'
import { toFieldError } from '../components/AuthLayout/messageText'
import { LoginHeader } from '../components/LoginForm/LoginHeader'
import { LoginConfigTotpPageContext, TotpPolicy } from '../keycloakLoginContext'

export type ConfigTotpPageProps = {
  context: LoginConfigTotpPageContext
}

// This page is taller than the login page, so it starts closer to the top
// (overriding every breakpoint of the shared padding) and scrolls within the
// left half rather than past the carousel.
const configTotpFormClass = twMerge(
  'overflow-y-auto pb-10',
  'pt-12',
  'height-sm:pt-12',
  'height-md:pt-16',
  'height-lg:pt-20',
  'height-xl:pt-24',
)

type SetupStepProps = PropsWithChildren<{
  step: number
  title: string
}>

const SetupStep = (props: SetupStepProps) => {
  const { step, title, children } = props

  return (
    <li className="flex gap-x-3">
      <span className="primary-body4 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-50 font-semibold text-primary">
        {step}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-y-2">
        <p className="primary-body2 text-functional-text">{title}</p>
        {children}
      </div>
    </li>
  )
}

const getPolicyRows = (policy: TotpPolicy): [string, string][] => {
  const rows: [string, string][] = [
    ['Type', policy.type === 'hotp' ? 'Counter-based' : 'Time-based'],
    ['Algorithm', policy.algorithm],
    ['Digits', `${policy.digits}`],
  ]

  if (policy.type === 'hotp') {
    rows.push(['Counter', `${policy.initialCounter}`])
  } else {
    rows.push(['Interval', `${policy.period}`])
  }

  return rows
}

/** Replaces Keycloak's `login-config-totp.ftl`. */
export const ConfigTotpPage = (props: ConfigTotpPageProps) => {
  const {
    formActionUrl,
    message,
    mode,
    supportedApplications,
    totpSecret,
    totpSecretEncoded,
    totpSecretQrCode,
    manualUrl,
    qrUrl,
    policy,
    isUserLabelRequired,
    isAppInitiatedAction,
    totpError,
    userLabelError,
  } = props.context

  const isManualMode = mode === 'manual'

  const renderScanOrKeyStep = () => {
    if (isManualMode) {
      return (
        <SetupStep step={2} title="Open the application and enter this key:">
          <span className="primary-body2 w-fit select-all break-all rounded-[5px] bg-grey-50 px-3 py-2 font-semibold tracking-wider text-functional-title">
            {totpSecretEncoded}
          </span>
          <CosHyperlink variant="text-only" href={qrUrl}>
            Scan a QR code instead
          </CosHyperlink>
        </SetupStep>
      )
    }

    return (
      <SetupStep step={2} title="Open the application and scan this QR code:">
        <img
          className="size-40"
          src={`data:image/png;base64, ${totpSecretQrCode}`}
          alt="QR code for your authenticator app"
        />
        <CosHyperlink variant="text-only" href={manualUrl}>
          Unable to scan?
        </CosHyperlink>
      </SetupStep>
    )
  }

  return (
    <AuthForm
      action={formActionUrl}
      noValidate={true}
      className={configTotpFormClass}
    >
      <LoginHeader
        title="Set up two-factor authentication"
        description="Link an authenticator app to your account to finish logging in."
      />
      <CosStroke
        className="mb-[23px] mt-12"
        type="dot"
        color="border-chart-2"
      />
      <div className="flex flex-col gap-y-[23px]">
        <PageMessage message={message} />
        <ol className="flex flex-col gap-y-4">
          <SetupStep
            step={1}
            title="Install one of these applications on your mobile:"
          >
            <p className="primary-body2 font-semibold text-functional-title">
              {supportedApplications.join(', ')}
            </p>
          </SetupStep>
          {renderScanOrKeyStep()}
          {isManualMode && (
            <SetupStep
              step={3}
              title="Use these values if the application lets you set them:"
            >
              <dl className="primary-body2 grid w-fit grid-cols-[auto_auto] gap-x-6 gap-y-1">
                {getPolicyRows(policy).map(([term, value]) => (
                  <div key={term} className="contents">
                    <dt className="text-functional-text-light">{term}</dt>
                    <dd className="font-semibold text-functional-title">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </SetupStep>
          )}
          <SetupStep
            step={isManualMode ? 4 : 3}
            title="Enter the one-time code the application shows, and name the device so you can tell it apart later."
          />
        </ol>
        <CosInput
          name="totp"
          label="One-time code"
          placeholder="One-time code"
          autoComplete="one-time-code"
          inputMode="numeric"
          required={true}
          errorMessage={toFieldError(totpError)}
        />
        <input type="hidden" name="totpSecret" value={totpSecret} />
        {mode !== undefined && <input type="hidden" name="mode" value={mode} />}
        <CosInput
          name="userLabel"
          label="Device name"
          placeholder="Device name"
          autoComplete="off"
          required={isUserLabelRequired}
          errorMessage={toFieldError(userLabelError)}
        />
        <LogoutOtherSessions />
      </div>
      <AuthFormButtons
        submitLabel="Finish setup"
        isAppInitiatedAction={isAppInitiatedAction}
      />
    </AuthForm>
  )
}
