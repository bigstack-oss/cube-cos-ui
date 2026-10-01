import CubeCOSLogo from '@cube-frontend/ui-library/assets/cubecos_full_logo.svg?react'

export type LoginHeaderProps = {
  title: string
  description: string
}

export const LoginHeader = (props: LoginHeaderProps) => {
  const { title, description } = props

  return (
    <header className="flex flex-col gap-y-4">
      <CubeCOSLogo className="w-[133px]" />
      <h1 className="primary-h1 text-functional-title">{title}</h1>
      <p className="primary-body2 text-functional-text">{description}</p>
    </header>
  )
}
