import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CosContentSwitcher, CosModal } from '@cube-frontend/ui-library'
import { GPUResourceType } from '@cube-frontend/api'
import { GpuResourceRow, getProfilesByResourceType } from '../utils'
import { FullViewInstanceTable } from './FullViewInstanceTable'
import { FullViewProfileTable } from './FullViewProfileTable'

type FullViewTab = 'profiles' | 'instances'

export type GpuDetailsFullViewModalProps = {
  isModalOpen: boolean
  resource: GpuResourceRow | undefined
  onClose: () => void
}

export const GpuDetailsFullViewModal = (
  props: GpuDetailsFullViewModalProps,
) => {
  const { isModalOpen, resource, onClose } = props

  const { t } = useTranslation()

  const isPgpu = resource?.resourceType === GPUResourceType.Pgpu

  const [activeTab, setActiveTab] = useState<FullViewTab>('profiles')

  useEffect(() => {
    if (isPgpu) {
      setActiveTab('instances')
    } else {
      setActiveTab('profiles')
    }
  }, [isPgpu])

  const profiles = useMemo(() => {
    return resource ? getProfilesByResourceType(resource) : []
  }, [resource])

  const tabTitleMap: Record<FullViewTab, string> = {
    profiles: t('nodes.details.profilesIdList.title'),
    instances: t('nodes.details.attachedInstancesList.title'),
  }

  const tableContentMap: Record<FullViewTab, () => ReactNode> = {
    profiles: () => (
      <FullViewProfileTable
        title={tabTitleMap['profiles']}
        profiles={profiles}
      />
    ),
    instances: () => (
      <FullViewInstanceTable
        title={tabTitleMap['instances']}
        instances={resource?.attachedInstances ?? []}
      />
    ),
  }

  const tableContent = tableContentMap[activeTab]

  return (
    <CosModal
      isOpen={isModalOpen}
      title={`${resource?.name} ${t('nodes.details.fullViewModal.details')}`}
      isCancelButtonVisible={false}
      actionText={t('nodes.details.fullViewModal.actionText')}
      onActionClick={onClose}
      onCloseClick={onClose}
    >
      <div className="flex flex-col gap-y-8">
        <CosContentSwitcher variant="default">
          <CosContentSwitcher.Item
            isActive={activeTab === 'profiles'}
            onClick={() => setActiveTab('profiles')}
            disabled={isPgpu}
          >
            {tabTitleMap['profiles']}
          </CosContentSwitcher.Item>
          <CosContentSwitcher.Item
            isActive={activeTab === 'instances'}
            onClick={() => setActiveTab('instances')}
          >
            {tabTitleMap['instances']}
          </CosContentSwitcher.Item>
        </CosContentSwitcher>
        {tableContent()}
      </div>
    </CosModal>
  )
}
