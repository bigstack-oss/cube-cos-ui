import {
  CosCheckbox,
  CosInput,
  CosNagging,
  CosPasswordInput,
} from '@cube-frontend/ui-library'
import { useMemo } from 'react'

export const LoginFields = () => {
  const { incorrectCredentials, sessionTimedOut } = window.keycloakLoginContext

  const naggingMessage = useMemo<string | undefined>(() => {
    if (sessionTimedOut) {
      return 'Session timed out. Please login again.'
    } else if (incorrectCredentials) {
      return 'Invalid username or password.'
    }

    return undefined
  }, [incorrectCredentials, sessionTimedOut])

  return (
    <div className="flex flex-col gap-y-[23px]">
      {naggingMessage && (
        <CosNagging
          className="w-full"
          type="error"
          variant="top"
          title={naggingMessage}
        />
      )}
      <CosInput
        name="username"
        label="Username"
        placeholder="Username"
        autoFocus={true}
        tabIndex={1}
      />
      <CosPasswordInput
        name="password"
        label="Password"
        placeholder="Password"
        autoComplete="off"
        tabIndex={2}
      />
      <CosCheckbox
        name="rememberMe"
        label="Remember username"
        defaultChecked={true}
        tabIndex={3}
      />
    </div>
  )
}
