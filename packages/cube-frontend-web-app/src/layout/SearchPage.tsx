import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  eventsApi,
  integrationsApi,
  licenseApi,
  nodesApi,
  notificationsApi,
  triggersApi,
  tuningsApi,
} from '../api/cosApi'
import { DataCenterContext } from '../context/DataCenterContext'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'
import {
  EventsApiGetEventsRequest,
  GetAbstractedEventsResponseData,
  GetIntegratedStoragesResponseDataInner,
  GetIntegrationsResponseDataInner,
  LicensesApiGetLicensesRequest,
  ListTuningResponseDataTuningsInnerStatus,
  Node,
  NodesApiGetNodesRequest,
  TuningsApiListTuningsRequest,
  Notification,
  NotificationsApiGetNotificationsRequest,
  TriggersApiGetTriggersRequest,
  GetServicesResponseDataInner,
  GetMeResponseData,
} from '@cube-frontend/api'
import { NodeTable } from '../pages/node/_components/NodeTable'
import { noop, range, uniqueId, upperFirst } from 'lodash'
import { GlobalSearchContext } from '../context/GlobalSearchContext'
import {
  CosButton,
  CosDashboardPanel,
  CosIconText,
  CosLoadingSpinner,
  CosTableRow,
  GetCosBasicTable,
  GetCosViewDetailsTable,
  renderCosNotificationLink,
  useExpandedRowIdSet,
} from '@cube-frontend/ui-library'
import { useSupportFilesTable } from '../pages/maintenance/supportFiles/_components/useSupportFilesTable'
import { SupportFilesTable } from '../pages/maintenance/supportFiles/_components/SupportFilesTable'
import {
  LicenseRow,
  LicenseTable,
} from '../pages/maintenance/license/_components/LicenseTable'
import { formatEventTime } from '../utils/date'
import dayjs from 'dayjs'
import {
  TuningRow,
  tuningToRow,
} from '../pages/maintenance/tunings/tuningsUtils'
import { HostPreviewTableCell } from '../components/HostPreviewTableCell/HostPreviewTableCell'
import { useTuningHostsModal } from '../pages/maintenance/tunings/useTuningHostsModal'
import { HostListModal } from '../components/HostPreviewTableCell/HostListModal'
import { CosRoutesEnum } from '../enum/routes'
import { Link } from 'react-router'
import { mockGetIntegrationsStoragesApi } from '../pages/integrations/storages/mock'
import {
  ApplicationIntegrationKey,
  applicationIntegrationUIData,
} from '../utils/applicationIntegration'
import {
  NotificationRow,
  notificationToTableRow,
} from '../pages/notifications/notificationsPageUtils'
import { notificationToToastArgs } from '../utils/notification'
import { mockI18n } from '../hooks/usePollNotifications/mockI18n'
import { twMerge } from 'tailwind-merge'
import {
  getTriggerResponse,
  mapToTriggerTableRow,
  TriggerRow,
} from '../pages/events/triggers/utils'
import { useTimeRange } from '../components/TimeRangeDropdown/useTimeRange'
import { healthTimeRanges } from '../pages/home/health/healthTimeRangeUtils'
import { useServices } from '../hooks/useServices/useServices'
import {
  groupServicesByCategory,
  ServiceCategory,
  sortCategoryServicesByModuleCount,
} from '../pages/home/health/_components/healthHistory/healthHistoryUtils'
import { pipe } from 'lodash/fp'
import { CategoryHealthPanelSkeleton } from '../pages/home/health/_components/healthHistory/CategoryHealthPanelSkeleton'
import { CategoryHealthPanel } from '../pages/home/health/_components/healthHistory/CategoryHealthPanel'

const skeletonRowCount = 25

const getNavigateLink = (
  keyword: string,
  route: (typeof CosRoutesEnum)[keyof typeof CosRoutesEnum],
) => {
  return `${route}?keyword=${keyword}`
}

const NodeSection = () => {
  const { dataCenter } = useContext(DataCenterContext)
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const { data: nodesData, isLoading } = useCosGetRequest(
    nodesApi.getNodes,
    () => {
      if (!debouncedKeyword) return null
      return {
        dataCenter: dataCenter!.name,
        keyword: debouncedKeyword,
      } satisfies NodesApiGetNodesRequest
    },
  )

  const rows = useMemo<Node[]>(() => {
    const nodes = nodesData?.nodes ?? []
    return nodes.map((node) => ({
      ...node,
      // Adjust `id` because `id` will be an empty string when the node is in `down` status.
      id: node.id || uniqueId('node'),
    }))
  }, [nodesData?.nodes])

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([])

  return (
    <CosDashboardPanel
      title="Nodes"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link to={getNavigateLink(keyword, CosRoutesEnum.NODES_PAGE)} />
      }
    >
      <NodeTable
        rows={rows}
        isLoading={isLoading}
        disabledRowIds={[]}
        skeletonRowCount={25}
        selectedRowIds={selectedNodeIds}
        showHeaderCheckbox={false}
        onCheckChange={() => {}}
      />
    </CosDashboardPanel>
  )
}

const HealthSection = () => {
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const { now, timeRange, onTimeRangeChange } = useTimeRange({
    includes: healthTimeRanges,
    defaultValue: '24h',
  })

  const { services, isLoadingServices } = useServices()

  const categories = useMemo<ServiceCategory[]>(
    () =>
      pipe(
        groupServicesByCategory,
        sortCategoryServicesByModuleCount,
        (categories) => {
          const categoriesResult: ServiceCategory[] = []

          categories.forEach((category) => {
            const servicesResult: GetServicesResponseDataInner[] = []

            category.services.forEach((service) => {
              if (
                service.name
                  .toLowerCase()
                  .includes(debouncedKeyword.toLowerCase())
              ) {
                servicesResult.push(service)
                return
              }

              // service.modules
              const modulesResult: GetMeResponseData[] = []
              service.modules.forEach((module) => {
                if (
                  module.name
                    .toLowerCase()
                    .includes(debouncedKeyword.toLowerCase())
                ) {
                  modulesResult.push(module)
                }
              })

              if (modulesResult.length > 0) {
                servicesResult.push({
                  ...service,
                  modules: modulesResult,
                })
              }
            })

            const resultCategory: ServiceCategory = {
              ...category,
              services: servicesResult,
            }

            if (resultCategory.services.length > 0) {
              categoriesResult.push(resultCategory)
            }
          })

          return categoriesResult
        },
      )(services),
    [debouncedKeyword, services],
  )

  return (
    <CosDashboardPanel
      title="Health"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link to={getNavigateLink(keyword, CosRoutesEnum.HOME_HEALTH_PAGE)} />
      }
    >
      <div className="flex flex-col gap-y-3">
        {isLoadingServices || !debouncedKeyword
          ? range(0, 3).map((index) => (
              <CategoryHealthPanelSkeleton key={index} />
            ))
          : categories.map((category) => (
              <CategoryHealthPanel
                key={category.name}
                category={category}
                timeRange={timeRange}
                now={now}
                past={timeRange}
              />
            ))}
      </div>
    </CosDashboardPanel>
  )
}

const SupportFilesSection = () => {
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const { rows, showLoading, deleteModal, downloadModal } =
    useSupportFilesTable({ keyword: debouncedKeyword })

  return (
    <CosDashboardPanel
      title="Support Files"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link
          to={getNavigateLink(
            keyword,
            CosRoutesEnum.MAINTENANCE_SUPPORT_FILES_PAGE,
          )}
        />
      }
    >
      <SupportFilesTable
        rows={rows}
        isLoading={showLoading}
        skeletonRowCount={skeletonRowCount}
        onDownloadClick={downloadModal.open}
        onDeleteClick={deleteModal.open}
      />
    </CosDashboardPanel>
  )
}

const LicenseSection = () => {
  const { dataCenter } = useContext(DataCenterContext)
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const { data: licenseData, isLoading } = useCosGetRequest(
    licenseApi.getLicenses,
    () => {
      if (!debouncedKeyword) return
      return {
        dataCenter: dataCenter!.name,
        keyword: debouncedKeyword,
      } satisfies LicensesApiGetLicensesRequest
    },
  )

  const rows: LicenseRow[] =
    licenseData?.licenses?.map((license) => ({
      ...license,
      id: license.serial,
    })) || []

  return (
    <CosDashboardPanel
      title="License"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link
          to={getNavigateLink(keyword, CosRoutesEnum.MAINTENANCE_LICENSE_PAGE)}
        />
      }
    >
      <LicenseTable
        rows={rows}
        isLoading={isLoading}
        skeletonRowCount={skeletonRowCount}
      />
    </CosDashboardPanel>
  )
}

type ResponseEvent = GetAbstractedEventsResponseData['events'][number]

type TableEvent = ResponseEvent & { eventId: string }

export const EventTable = GetCosBasicTable<TableEvent>()

/**
 * The `id` field from the response is either `NET00003I` or `SDN00001I`, which will be duplicated.
 * Therefore, I map this `id` to `eventId` and assign an index to `id`, making it unique for use in the Table component.
 */
const mapToTableEvent = (e: ResponseEvent, index: number): TableEvent => ({
  ...e,
  id: String(index),
  eventId: e.id,
})

const EventsSection = () => {
  const { dataCenter } = useContext(DataCenterContext)
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const startDate = useRef(dayjs().subtract(30, 'day').format())
  const endDate = useRef(dayjs().add(1, 'day').format())

  const { data: eventsData, isLoading } = useCosGetRequest(
    eventsApi.getEvents,
    () => {
      if (!debouncedKeyword) return
      return {
        dataCenter: dataCenter!.name,
        type: 'system',
        keyword: debouncedKeyword,
        start: startDate.current,
        stop: endDate.current,
        pageNum: 1,
        pageSize: 10,
      } satisfies EventsApiGetEventsRequest
    },
  )

  const rows = useMemo<TableEvent[]>(() => {
    return eventsData?.events.map(mapToTableEvent) || []
  }, [eventsData?.events])

  return (
    <CosDashboardPanel
      title="Events"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link to={getNavigateLink(keyword, CosRoutesEnum.EVENTS_PAGE)} />
      }
    >
      <EventTable rows={rows} isLoading={isLoading}>
        <EventTable.Column label="Severity" property="severity" />
        <EventTable.Column
          label="Event ID"
          property="eventId"
          emphasize={true}
        />
        <EventTable.Column label="Description" property="description" />
        <EventTable.Column label="Metadata" property="metadata">
          {(metadata) => `${JSON.stringify(metadata)}`}
        </EventTable.Column>
        <EventTable.Column label="Time" property="time">
          {(time) => (
            <span className="text-nowrap">{formatEventTime(time)}</span>
          )}
        </EventTable.Column>
      </EventTable>
    </CosDashboardPanel>
  )
}

const TuningTable = GetCosBasicTable<TuningRow>()

const TuningsSection = () => {
  const { dataCenter } = useContext(DataCenterContext)
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const intervenedRowIdsRef = useRef<Set<string>>(new Set())

  const { data: listTuningsResponse, isLoading } = useCosGetRequest(
    tuningsApi.listTunings,
    () => {
      if (!debouncedKeyword) return null
      return {
        dataCenter: dataCenter!.name,
        keyword: debouncedKeyword,
        pageNum: 1,
        pageSize: 10,
      } satisfies TuningsApiListTuningsRequest
    },
  )

  const [rows, setRows] = useState<TuningRow[]>([])
  useEffect(() => {
    const tunings = listTuningsResponse?.tunings ?? []
    setRows((oldRows) => {
      const oldRowsMap: Map<string, TuningRow> = new Map(
        oldRows.map((row) => [row.id, row]),
      )
      return tunings.map((tuning) => {
        const newRow = tuningToRow(tuning)
        // For tunings with manual interventions, keep the state intact and
        // sync it using additional API calls.
        if (intervenedRowIdsRef.current.has(newRow.id)) {
          return oldRowsMap.get(newRow.id) ?? newRow
        }
        return newRow
      })
    })
  }, [listTuningsResponse])

  const {
    isHostsModalOpen,
    rowForHostModal,
    onShowHostsClick,
    onHostsModalClose,
  } = useTuningHostsModal(rows)

  const renderUpdateTime = (
    status: ListTuningResponseDataTuningsInnerStatus,
  ) => {
    const { updatedAt } = status
    if (!updatedAt) {
      return <span className="text-functional-text-light">Never</span>
    }
    return dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')
  }

  return (
    <CosDashboardPanel
      title="Tunings"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link
          to={getNavigateLink(keyword, CosRoutesEnum.MAINTENANCE_TUNINGS_PAGE)}
        />
      }
    >
      <TuningTable isLoading={isLoading} rows={rows}>
        <TuningTable.Column
          property="name"
          label="Name (Keys)"
          emphasize={true}
        >
          {(name, row) => (
            <div className="flex gap-x-2">
              <span>{name}</span>
              {row.status.isUpdating && (
                <CosLoadingSpinner className="ml-2" variant="dot45" />
              )}
            </div>
          )}
        </TuningTable.Column>
        <TuningTable.Column property="hosts" label="Hosts">
          {(hosts, row) => (
            <HostPreviewTableCell
              hostNames={hosts.map((h) => h.name)}
              onShowAllClick={() => onShowHostsClick(row)}
            />
          )}
        </TuningTable.Column>
        <TuningTable.Column property="status" label="Update Time">
          {renderUpdateTime}
        </TuningTable.Column>
        <TuningTable.Column property="description" label="Description" />
        <TuningTable.Column property="value" label="Value" />
      </TuningTable>
      <HostListModal
        isOpen={isHostsModalOpen}
        hostNames={rowForHostModal?.hosts.map((h) => h.name) ?? []}
        onCloseClick={onHostsModalClose}
      />
    </CosDashboardPanel>
  )
}

export type StorageRow = CosTableRow & GetIntegratedStoragesResponseDataInner

const StorageTable = GetCosBasicTable<StorageRow>()

const storageToRow = (storage: GetIntegratedStoragesResponseDataInner) => ({
  id: storage.name,
  ...storage,
})

export const IntegrationStoragesSection = () => {
  const { dataCenter } = useContext(DataCenterContext)
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const { data, isLoading } = useCosGetRequest(
    // integrationsApi.getIntegratedStorages,
    // @ts-expect-error - Temporarily using mock data until backend API is ready
    mockGetIntegrationsStoragesApi,
    () => {
      if (!debouncedKeyword) return null
      return {
        dataCenter: dataCenter!.name,
      }
    },
  )

  const rows = useMemo(() => data?.map(storageToRow) || [], [data])

  const renderStorageName = (name: string, row: StorageRow) => (
    <div className="flex items-center gap-x-2">
      <span>{name}</span>
      {row.isDefault && <CosIconText type="primary">default</CosIconText>}
    </div>
  )

  const renderUpdateTime = (updatedAt: string) =>
    dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')

  return (
    <CosDashboardPanel
      title="Storages"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link
          to={getNavigateLink(keyword, CosRoutesEnum.MAINTENANCE_TUNINGS_PAGE)}
        />
      }
    >
      <div className="pt-2">
        <StorageTable rows={rows} isLoading={isLoading}>
          <StorageTable.Column label="Storage" property="name" emphasize={true}>
            {renderStorageName}
          </StorageTable.Column>
          <StorageTable.Column label="Type" property="type">
            {upperFirst}
          </StorageTable.Column>
          <StorageTable.Column label="Vendor" property="vendor" />
          <StorageTable.Column label="Update Time" property="updatedAt">
            {renderUpdateTime}
          </StorageTable.Column>
          <StorageTable.Column label="Management IP" property="managementIp" />
          {/* <StorageTable.Column>
            {(_, row) => <StorageRowActions row={row} />}
          </StorageTable.Column> */}
        </StorageTable>
      </div>
    </CosDashboardPanel>
  )
}

type ApplicationRow = CosTableRow & GetIntegrationsResponseDataInner

const ApplicationTable = GetCosBasicTable<ApplicationRow>()

const applicationToRow = (item: GetIntegrationsResponseDataInner) => ({
  id: uniqueId('integration'),
  ...item,
})

const renderApplicationName = (name: string) => {
  const key = name as ApplicationIntegrationKey
  const uiData = applicationIntegrationUIData[key]

  if (!uiData) {
    console.warn(`No UI data is defined for application: ${name}`)
    return upperFirst(name)
  }

  return uiData.displayName
}

const IntegrationApplicationsSection = () => {
  const { dataCenter } = useContext(DataCenterContext)
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const { data, isLoading } = useCosGetRequest(
    integrationsApi.getIntegratedApplications,
    () => {
      if (!debouncedKeyword) return null
      return {
        dataCenter: dataCenter!.name,
      }
    },
  )

  const rows = useMemo(() => data?.map(applicationToRow) || [], [data])

  return (
    <CosDashboardPanel
      title="Applications"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link
          to={getNavigateLink(
            keyword,
            CosRoutesEnum.INTEGRATIONS_APPLICATIONS_PAGE,
          )}
        />
      }
    >
      <ApplicationTable rows={rows} isLoading={isLoading}>
        <ApplicationTable.Column property="url" fitContent={true}>
          {(url) => (
            <a target="_blank" href={url}>
              <CosButton type="light" size="sm">
                Connect
              </CosButton>
            </a>
          )}
        </ApplicationTable.Column>
        <ApplicationTable.Column
          label="Application"
          property="name"
          emphasize={true}
        >
          {renderApplicationName}
        </ApplicationTable.Column>
        <ApplicationTable.Column
          label="Shown on header"
          property="isHeaderShortcutEnabled"
        >
          {(isHeaderShortcutEnabled) => (
            <span className="primary-body3 text-functional-text-light">
              {/*
               * TODO: In Phase 1, all applications are `Required`.
               * Should discuss the `Non-Required` wording with the team in Phase 2.
               */}
              {isHeaderShortcutEnabled ? 'Required' : 'Non-Required'}
            </span>
          )}
        </ApplicationTable.Column>
        <ApplicationTable.Column label="Description" property="description" />
        <ApplicationTable.Column property="isBuiltIn">
          {(isBuiltIn) => (
            <span className="primary-body3 text-nowrap text-functional-text-light">
              {/*
               * TODO: In Phase 1, all integrations are `Built-in`.
               * Should discuss the `Non-Built-in` wording with the team in Phase 2.
               */}
              {isBuiltIn ? 'Built in' : 'Non Built in'}
            </span>
          )}
        </ApplicationTable.Column>
      </ApplicationTable>
    </CosDashboardPanel>
  )
}

const TriggersTable = GetCosBasicTable<TriggerRow>()

const TriggersSection = () => {
  const { dataCenter } = useContext(DataCenterContext)
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const { data: listTriggersResponse, isLoading } = useCosGetRequest(
    triggersApi.getTriggers,
    () => {
      if (!debouncedKeyword) return null
      return {
        dataCenter: dataCenter!.name,
        pageNum: 1,
        pageSize: 10,
      } satisfies TriggersApiGetTriggersRequest
    },
  )

  const intervenedTriggerNamesRef = useRef<Set<string>>(new Set())

  const [rows, setRows] = useState<TriggerRow[]>([])

  useEffect(() => {
    const triggers = listTriggersResponse?.triggers ?? []

    // Built-in triggers appear at the beginning of the row list
    const sortedTriggers = [...triggers].sort((a, b) => {
      if (a.isBuiltIn === b.isBuiltIn) return 0
      return a.isBuiltIn ? -1 : 1
    })

    setRows((oldRows) => {
      const oldRowsMap: Map<string, TriggerRow> = new Map(
        oldRows.map((row) => [row.name, row]),
      )

      return sortedTriggers.map((trigger) => {
        const newRow = mapToTriggerTableRow(trigger)
        // For triggers with manual interventions, keep the state intact and
        // sync it using additional API calls.
        if (intervenedTriggerNamesRef.current.has(trigger.name)) {
          return oldRowsMap.get(trigger.name) ?? newRow
        }
        return newRow
      })
    })
  }, [listTriggersResponse])

  return (
    <CosDashboardPanel
      title="Triggers"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link
          to={getNavigateLink(keyword, CosRoutesEnum.EVENTS_TRIGGERS_PAGE)}
        />
      }
    >
      <TriggersTable rows={rows} isLoading={isLoading}>
        <TriggersTable.Column label="Triggers" property="name" emphasize={true}>
          {(name, row) => (
            <div className="flex items-center gap-2">
              {name}
              {row.isProcessing && <CosLoadingSpinner variant="dot120" />}
            </div>
          )}
        </TriggersTable.Column>
        <TriggersTable.Column label="Description" property="description">
          {(description) => <span>{description || '-'}</span>}
        </TriggersTable.Column>
        <TriggersTable.Column label="Response" property="response">
          {(response) => (
            <span className="whitespace-nowrap">
              {getTriggerResponse(response.types)}
            </span>
          )}
        </TriggersTable.Column>
        {/* <TriggersTable.Column label="Status">
          {(_, row) => (
            <TriggersStatusToggle row={row} onChange={onToggleChange} />
          )}
        </TriggersTable.Column>
        <TriggersTable.Column>
          {(_, row) => (
            <TriggersActionCell row={row} onDeleteClick={onDeleteClick} />
          )}
        </TriggersTable.Column> */}
      </TriggersTable>
    </CosDashboardPanel>
  )
}

const NotificationsTable = GetCosViewDetailsTable<NotificationRow>()

const NotificationSection = () => {
  const { dataCenter } = useContext(DataCenterContext)
  const { keyword, debouncedKeyword } = useContext(GlobalSearchContext)

  const { isLoading, data: pagedNotifications } = useCosGetRequest(
    notificationsApi.getNotifications,
    () => {
      if (!debouncedKeyword) return null
      return {
        dataCenter: dataCenter!.name,
        past: '30d',
        keyword: debouncedKeyword,
        pageNum: 1,
        pageSize: 10,
      } satisfies NotificationsApiGetNotificationsRequest
    },
  )

  const rows = useMemo<NotificationRow[]>(
    () => (pagedNotifications?.notifications ?? []).map(notificationToTableRow),
    [pagedNotifications?.notifications],
  )

  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const computeDetailTitle = (row: NotificationRow): string => {
    let description: string = 'No details'

    if ('additionalInfo' in row && 'description' in row.additionalInfo) {
      description = row.additionalInfo.description ?? ''
    }

    return description
  }

  const renderMessage = (row: NotificationRow) => {
    const { messageI18nKey, messageI18nArgs, linkProps } =
      notificationToToastArgs({
        ...row,
        id: row.eventId,
      } as Notification)

    return (
      <div className="text-wrap">
        {mockI18n(messageI18nKey, messageI18nArgs)}
        {!!linkProps &&
          renderCosNotificationLink({
            ...linkProps,
            className: twMerge(linkProps.className, 'ml-2'),
          })}
      </div>
    )
  }

  return (
    <CosDashboardPanel
      title="Notifications"
      useContentWrapper={false}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={
        <Link to={getNavigateLink(keyword, CosRoutesEnum.NOTIFICATIONS_PAGE)} />
      }
    >
      <NotificationsTable
        isLoading={isLoading}
        rows={rows}
        expandedRowIdSet={expandedRowIdSet}
        onExpandChange={onExpandChange}
        getDetailItems={() => []}
        detailTitle={computeDetailTitle}
      >
        <NotificationsTable.Column
          label="Timestamp"
          property="time"
          fitContent={true}
        >
          {(time) => (
            <span className="whitespace-nowrap">
              {dayjs.respectTzOffset(time).format('YYYY/MM/DD HH:mm:ss')}
            </span>
          )}
        </NotificationsTable.Column>
        <NotificationsTable.Column
          label="Type"
          property="eventId"
          fitContent={true}
        >
          {(eventId) => (
            <span className="whitespace-nowrap">
              {eventId.endsWith('E') ? 'Error / Failure' : 'Success'}
            </span>
          )}
        </NotificationsTable.Column>
        <NotificationsTable.Column label="Message" property="additionalInfo">
          {(_, row) => renderMessage(row)}
        </NotificationsTable.Column>
      </NotificationsTable>
    </CosDashboardPanel>
  )
}

export const SearchPage = () => {
  const { keyword } = useContext(GlobalSearchContext)

  return (
    <div className="flex flex-col gap-y-6">
      <p>Result for "{keyword}"</p>
      <div className="flex flex-col gap-y-6">
        <NodeSection />
        <HealthSection />
        <SupportFilesSection />
        <LicenseSection />
        <EventsSection />
        <TuningsSection />
        <IntegrationApplicationsSection />
        <IntegrationStoragesSection />
        <TriggersSection />
        <NotificationSection />
      </div>
    </div>
  )
}
