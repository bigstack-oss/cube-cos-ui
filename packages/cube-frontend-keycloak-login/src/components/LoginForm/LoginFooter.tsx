import { CosHyperlink } from '@cube-frontend/ui-library'

export const LoginFooter = () => {
  return (
    <footer className="mt-auto flex items-center justify-center gap-x-2">
      <span className="primary-body2 text-functional-border-darker">
        Copyright©Bigstack
      </span>
      <CosHyperlink variant="text-inline" color="secondary" href="...">
        Terms & Policy
      </CosHyperlink>
    </footer>
  )
}
