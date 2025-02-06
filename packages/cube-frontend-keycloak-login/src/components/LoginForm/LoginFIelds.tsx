import {
  CosCheckbox,
  CosInput,
  CosNagging,
  CosPasswordInput,
  CosStroke,
} from '@cube-frontend/ui-library'

export const LoginFields = () => {
  const { incorrectCredentials } = window.keycloakLoginContext

  return (
    <div className="flex flex-col gap-y-[23px]">
      <CosStroke type="dot" color="border-chart-2" />
      {incorrectCredentials && (
        <CosNagging
          className="w-full"
          type="error"
          variant="top"
          title="Invalid username or password."
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
