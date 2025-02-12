import { CosHyperlink } from '@cube-frontend/ui-library'
import { twMerge } from 'tailwind-merge'

export const LoginCopyright = () => {
  return (
    <footer
      className={twMerge(
        'flex items-center justify-center gap-x-2',
        'mt-[30px]',
        'height-sm:mt-14',
        'height-md:mt-[72px]',
        'height-lg:mt-[120px]',
        'height-xl:mt-[174px]',
      )}
    >
      <span className="primary-body2 text-functional-border-darker">
        Copyright©Bigstack
      </span>
      <CosHyperlink
        variant="text-inline"
        color="secondary"
        href="TODO: terms and policy href"
      >
        Terms & Policy
      </CosHyperlink>
    </footer>
  )
}
