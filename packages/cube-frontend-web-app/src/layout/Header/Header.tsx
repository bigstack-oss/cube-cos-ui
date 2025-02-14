import { CosStroke } from '@cube-frontend/ui-library'
import { IntegrationBlock } from './IntegrationBlock'
import FunctionalBlock from './FunctionalBlock'

const Header = () => {
  return (
    <div className="relative flex h-[54px] flex-row items-center justify-end gap-x-2.5 px-5">
      <IntegrationBlock />
      <div className="h-6 w-px bg-functional-border-divider" />
      <FunctionalBlock />
      <div className="absolute bottom-0 left-0 w-full px-5">
        <CosStroke />
      </div>
    </div>
  )
}

export default Header
