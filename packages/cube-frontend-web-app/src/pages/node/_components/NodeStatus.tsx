import { NodeStatusEnum } from '@cube-frontend/api'
import { CosStatus } from '@cube-frontend/ui-library'
import { nodeStatusTranslationKeys } from '@cube-frontend/web-app/utils/node'
import { useTranslation } from 'react-i18next'

export type NodeStatusProps = {
  status: NodeStatusEnum
}

export const NodeStatus = (props: NodeStatusProps) => {
  const { status } = props

  const { t } = useTranslation()

  return (
    <CosStatus status={status} message={t(nodeStatusTranslationKeys[status])} />
  )
}
