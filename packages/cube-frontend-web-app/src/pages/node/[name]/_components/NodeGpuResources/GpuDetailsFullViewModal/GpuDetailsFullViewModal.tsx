import { CosContentSwitcher, CosModal } from '@cube-frontend/ui-library'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { GPUResourceType } from '@cube-frontend/api'
import { FullViewInstanceTable } from './FullViewInstanceTable'
import { FullViewProfileTable } from './FullViewProfileTable'
import { GpuResourceRow, getProfilesByResourceType } from '../utils'

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
    profiles: 'Profiles / ID',
    instances: 'Attached Instances',
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
      title={`${resource?.name} Details`}
      isCancelButtonVisible={false}
      actionText="Close"
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
