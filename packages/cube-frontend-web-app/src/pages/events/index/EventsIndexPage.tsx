import { useTranslation } from 'react-i18next'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { EventsRefreshButton } from './_components/EventsRefreshButton'
import { EventsTableFilter } from './_components/EventsTableFilter'
import { EventsTable } from './_components/EventsTable'
import { useEvents } from './_components/useEvents'
import { useEventsQuery } from './_components/useEventsQuery'

export const EventsIndexPage = () => {
  const { t } = useTranslation()

  const {
    eventsQuery,
    onTypeChange,
    onKeywordChange,
    onDatesChange,
    onFieldChange,
    onFieldAllCheckChange,
    onFieldClear,
    onPageNumChange,
    onPageSizeChange,
  } = useEventsQuery()

  const {
    events,
    isEventsLoading,
    getResource: onEventsRefresh,
    totalItems,
  } = useEvents(eventsQuery)

  return (
    <CosGeneralPanel
      topic={t('events.title')}
      rightSlot={
        <EventsRefreshButton
          onEventsRefresh={onEventsRefresh}
          isEventsLoading={isEventsLoading}
        />
      }
    >
      <div className="flex flex-col gap-y-6">
        <EventsTableFilter
          eventsQuery={eventsQuery}
          onTypeChange={onTypeChange}
          onKeywordChange={onKeywordChange}
          onDatesChange={onDatesChange}
          onFieldChange={onFieldChange}
          onFieldAllCheckChange={onFieldAllCheckChange}
          onFieldClear={onFieldClear}
        />
        <EventsTable
          isEventsLoading={isEventsLoading}
          events={events}
          currentPage={eventsQuery.currentPage}
          itemsPerPage={eventsQuery.itemsPerPage}
          totalItems={totalItems}
          onPageNumChange={onPageNumChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </CosGeneralPanel>
  )
}
