import { CosHyperlink } from '@cube-frontend/ui-library'
import { twMerge } from 'tailwind-merge'

export const LoginFooter = () => {
  return (
    <footer
      className={twMerge(
        'mt-[30px] flex items-center justify-center gap-x-2',
        'height-sm:mt-[45px]',
        'height-md:mt-[90px]',
        'height-lg:mt-[120px]',
        'height-xl:mt-auto',
      )}
    >
      <span className="primary-body2 text-functional-border-darker">
        Copyright©Bigstack
      </span>
      <CosHyperlink variant="text-inline" color="secondary" href="...">
        Terms & Policy
      </CosHyperlink>
    </footer>
  )
}
