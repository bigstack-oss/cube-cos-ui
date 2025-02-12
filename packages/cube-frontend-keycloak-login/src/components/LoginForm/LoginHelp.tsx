import { CosHyperlink } from '@cube-frontend/ui-library'

export const LoginHelp = () => {
  return (
    <div className="mt-12 flex items-center justify-center gap-x-3">
      <span className="primary-body2 text-functional-text">
        Couldn’t log in ?
      </span>
      <CosHyperlink
        variant="text-only"
        href="https://www.bigstack.co/contact-us"
        target="_blank"
      >
        Contact Support
      </CosHyperlink>
    </div>
  )
}
