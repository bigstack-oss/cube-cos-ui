import { CosButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useNavigate } from 'react-router'

type IPMICancelButtonProps = {
  nodeName: string
}

export const IPMICancelButton = (props: IPMICancelButtonProps) => {
  const { nodeName } = props

  const navigate = useNavigate()

  return (
    <CosButton
      type="ghost"
      onClick={() => navigate(CosRoutesEnum.NODE_DETAIL_PAGE(nodeName))}
    >
      Cancel
    </CosButton>
  )
}
