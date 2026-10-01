import { FormHTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { mainContentPaddingTopClass } from '../../keycloakLoginStyles'
import { LoginCopyright } from '../LoginForm/LoginCopyright'

export type AuthFormProps = PropsWithChildren<{
  action: string
  className?: string
  noValidate?: FormHTMLAttributes<HTMLFormElement>['noValidate']
}>

/**
 * The left half of `AuthLayout`: a native form that posts to Keycloak's login
 * action, a 504px content column, and the copyright footer.
 */
export const AuthForm = (props: AuthFormProps) => {
  const { action, className, noValidate, children } = props

  return (
    <form
      className={twMerge(
        'flex h-full w-1/2 flex-col items-center',
        mainContentPaddingTopClass,
        className,
      )}
      method="post"
      action={action}
      noValidate={noValidate}
    >
      <div className="flex w-[504px] flex-col items-center [&>*]:w-full">
        {children}
      </div>
      <LoginCopyright />
    </form>
  )
}
