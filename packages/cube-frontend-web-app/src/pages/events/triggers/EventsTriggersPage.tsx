import { CosStroke } from '@cube-frontend/ui-library'
import { EventsTriggersTable } from './_components/EventsTriggersTable/EventsTriggersTable'

export const EventsTriggersPage = () => {
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-6 bg-white px-6 py-4">
        <h5 className="secondary-h4">Triggers</h5>
        <CosStroke type="dot" />
        <EventsTriggersTable />
      </div>
    </div>
  )
}
