import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CosContentSwitcher, CosModal } from '@cube-frontend/ui-library'
import { GPUResourceType } from '@cube-frontend/api'
import {
  GpuResourceRow,
  getProfilesByResourceType,
  isProfileRemainingSupported,
} from '../utils'
import { FullViewDeviceProfileTable } from './FullViewDeviceProfileTable'
import { FullViewInstanceTable } from './FullViewInstanceTable'
import { FullViewProfileTable } from './FullViewProfileTable'

type FullViewTab = 'profiles' | 'instances'

export type GpuDetailsFullViewModalProps = {
  isModalOpen: boolean
  nodeName: string
  resource: GpuResourceRow | undefined
  onClose: () => void
}

export const GpuDetailsFullViewModal = (
  props: GpuDetailsFullViewModalProps,
) => {
  const { isModalOpen, nodeName, resource, onClose } = props

  const { t } = useTranslation()

  const isPgpu = resource?.resourceType === GPUResourceType.Pgpu

  const deviceProfile = resource?.deviceProfile ?? null

  /**
   * A pgpu card has no profile list — its Profiles tab holds the single Cyborg
   * device profile instead. A card missing that name has nothing to show there,
   * so the tab stays closed, the same way the card's own Profiles section
   * renders nothing.
   */
  const isProfilesTabEmpty = isPgpu && !deviceProfile

  const [activeTab, setActiveTab] = useState<FullViewTab>('profiles')

  useEffect(() => {
    if (isProfilesTabEmpty) {
      setActiveTab('instances')
    } else {
      setActiveTab('profiles')
    }
  }, [isProfilesTabEmpty])

  const profiles = useMemo(() => {
    return resource ? getProfilesByResourceType(resource) : []
  }, [resource])

  const tabTitleMap: Record<FullViewTab, string> = {
    profiles: t('nodes.details.profilesIdList.title'),
    instances: t('nodes.details.attachedInstancesList.title'),
  }

  const renderProfilesTab = (): ReactNode => {
    if (isPgpu) {
      return (
        deviceProfile && (
          <FullViewDeviceProfileTable
            title={tabTitleMap['profiles']}
            deviceProfile={deviceProfile}
          />
        )
      )
    }

    return (
      <FullViewProfileTable
        title={tabTitleMap['profiles']}
        profiles={profiles}
        isRemainingVisible={
          !!resource && isProfileRemainingSupported(resource.resourceType)
        }
      />
    )
  }

  const tableContentMap: Record<FullViewTab, () => ReactNode> = {
    profiles: renderProfilesTab,
    instances: () => (
      <FullViewInstanceTable
        title={tabTitleMap['instances']}
        nodeName={nodeName}
        resourceType={resource?.resourceType ?? GPUResourceType.Unset}
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
            disabled={isProfilesTabEmpty}
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
