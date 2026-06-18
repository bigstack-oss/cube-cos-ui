import {
  ListNodeGPUCardsResponseDataInnerAttachedInstancesInner,
  ListNodeGPUCardsResponseDataInnerAttachedInstancesInnerLinks,
} from '@cube-frontend/api'
import {
  GetCosBasicTable,
  CosTableRow,
  CosPagination,
  ItemsPerPage,
  CosHyperlink,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'
import { useMemo, useState } from 'react'
import { getItemsInView } from './utils'
import { useTranslation } from 'react-i18next'

type InstanceTableRow = CosTableRow &
  ListNodeGPUCardsResponseDataInnerAttachedInstancesInner

const InstanceTable = GetCosBasicTable<InstanceTableRow>()

type FullViewInstanceTableProps = {
  title: string
  instances: ListNodeGPUCardsResponseDataInnerAttachedInstancesInner[]
}

export const FullViewInstanceTable = (props: FullViewInstanceTableProps) => {
  const { title, instances } = props

  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [itemPerPage, setItemPerPage] = useState<ItemsPerPage>(
    DEFAULT_ITEMS_PER_PAGE,
  )

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onItemsPerPageChange = (page: ItemsPerPage) => {
    setItemPerPage(page)
  }

  const instancesInView = useMemo<InstanceTableRow[]>(() => {
    return getItemsInView(instances, currentPage, itemPerPage)
  }, [instances, currentPage, itemPerPage])

  const renderMemoryUsage = (
    memory: ListNodeGPUCardsResponseDataInnerAttachedInstancesInner['memoryUsage'],
  ) => {
    const { total, used, sizeUnit } = toReadableUsedSize({
      used: memory.allocatedMiB,
      total: memory.totalMiB,
      originalSizeUnit: 'MiB',
    })
    return `${used} ${sizeUnit} / ${total} ${sizeUnit}`
  }

  const renderActions = (
    links: ListNodeGPUCardsResponseDataInnerAttachedInstancesInnerLinks,
  ) => {
    return (
      <div className="flex w-full flex-row gap-x-4">
        <CosHyperlink
          size="sm"
          variant="text-inline"
          href={links.console}
          target="_blank"
        >
          {t('nodes.details.attachedInstancesList.console')}
        </CosHyperlink>
        <CosHyperlink
          size="sm"
          variant="text-inline"
          href={links.grafana}
          target="_blank"
        >
          Grafana
        </CosHyperlink>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="primary-body3 font-semibold text-functional-title">
        {title}
      </div>
      <InstanceTable rows={instancesInView}>
        <InstanceTable.Column
          property="name"
          label={t('nodes.details.attachedInstancesList.instance')}
          emphasize
        />
        <InstanceTable.Column
          property="profileAlias"
          label={t('nodes.details.attachedInstancesList.alias')}
        />
        <InstanceTable.Column
          property="utilizationPercent"
          label={t('nodes.details.attachedInstancesList.utilization')}
        >
          {(utilizationPercent) => `${utilizationPercent} %`}
        </InstanceTable.Column>
        <InstanceTable.Column
          property="memoryUsage"
          label={t('nodes.details.attachedInstancesList.memory')}
        >
          {(memory) => renderMemoryUsage(memory)}
        </InstanceTable.Column>
        <InstanceTable.Column
          property="links"
          label={t('nodes.details.attachedInstancesList.action')}
        >
          {(links) => renderActions(links)}
        </InstanceTable.Column>
      </InstanceTable>
      <CosPagination
        totalItems={instances.length}
        currentPage={currentPage}
        itemsPerPage={itemPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  )
}
