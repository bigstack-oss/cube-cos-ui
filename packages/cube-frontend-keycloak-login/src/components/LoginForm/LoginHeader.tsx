import CubeCOSLogo from '@cube-frontend/ui-library/assets/cubecos_full_logo.svg?react'

export const LoginHeader = () => {
  return (
    <header className="flex flex-col gap-y-4">
      <CubeCOSLogo className="w-[133px]" />
      <h1 className="primary-h1 text-functional-title">
        Log in to the Data Center
      </h1>
      <p className="primary-body2 text-functional-text">
        Welcome to COS cloud service platform!
      </p>
    </header>
  )
}
