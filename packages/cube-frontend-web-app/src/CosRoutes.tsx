import { Navigate, Route, Routes } from 'react-router'
import { CosRoutesEnum } from './enum/routes'
import { HomeLayout } from './pages/home/HomeLayout'
import { HomeOverviewPage } from './pages/home/overview/HomeOverviewPage'
import { HomeChartPage } from './pages/home/chart/HomeChartPage'
import { HomeHealthPage } from './pages/home/health/HomeHealthPage'
import { HealthDetailsPage } from './pages/home/health/[module]/HealthDetailsPage'
import { NodeListPage } from './pages/node/NodeListPage'
import { NodeDetailsPage } from './pages/node/[name]/NodeDetailsPage'
import { NodeIPMIControlPage } from './pages/node/[name]/ipmi-control/NodeIPMIControlPage'
import { IntegrationsPage } from './pages/integrations/IntegrationsPage'
import { MaintenanceLayout } from './pages/maintenance/MaintenanceLayout'
import { MaintenanceSupportFilesPage } from './pages/maintenance/supportFiles/MaintenanceSupportFilesPage'
import { MaintenanceTuningsPage } from './pages/maintenance/tunings/MaintenanceTuningsPage'
import { CreateTuningsPage } from './pages/maintenance/tunings/create/CreateTuningsPage'
import { EditTuningsPage } from './pages/maintenance/tunings/edit/EditTuningsPage'
import { MaintenanceLicensePage } from './pages/maintenance/license/MaintenanceLicensePage'
import { EventsLayout } from './pages/events/EventsLayout'
import { EventsIndexPage } from './pages/events/index/EventsIndexPage'
import { EventsTriggersPage } from './pages/events/triggers/EventsTriggersPage'
import { TriggersCreatePage } from './pages/events/triggers/[create]/TriggersCreatePage'
import { EventsChartPage } from './pages/events/chart/EventsChartPage'
import { SettingsPage } from './pages/settings/SettingsPage'
import { HttpErrorDisplay } from './components/ErrorDisplay/HttpErrorDisplay'

export const CosRoutes = () => {
  return (
    <Routes>
      <Route
        path={CosRoutesEnum.ROOT_ROUTE}
        index={true}
        element={<Navigate to={CosRoutesEnum.HOME_PAGE} replace={true} />}
      />
      <Route path={CosRoutesEnum.HOME_PAGE} element={<HomeLayout />}>
        <Route index={true} element={<HomeOverviewPage />} />
        <Route
          path={CosRoutesEnum.HOME_CHART_PAGE}
          element={<HomeChartPage />}
        />
        <Route
          path={CosRoutesEnum.HOME_HEALTH_PAGE}
          element={<HomeHealthPage />}
        />
        <Route
          path={CosRoutesEnum.HOME_HEALTH_DETAIL_PAGE()}
          element={<HealthDetailsPage />}
        />
      </Route>
      <Route path={CosRoutesEnum.NODES_PAGE} element={<NodeListPage />} />
      <Route
        path={CosRoutesEnum.NODE_DETAIL_PAGE()}
        element={<NodeDetailsPage />}
      />
      <Route
        path={CosRoutesEnum.NODE_IPMI_CONTROL_PAGE()}
        element={<NodeIPMIControlPage />}
      />
      <Route
        path={CosRoutesEnum.INTEGRATIONS_PAGE}
        element={<IntegrationsPage />}
      />
      <Route
        path={CosRoutesEnum.MAINTENANCE_PAGE}
        element={<MaintenanceLayout />}
      >
        <Route
          path={CosRoutesEnum.MAINTENANCE_SUPPORT_FILES_PAGE}
          element={<MaintenanceSupportFilesPage />}
        />
        <Route
          path={CosRoutesEnum.MAINTENANCE_TUNINGS_PAGE}
          element={<MaintenanceTuningsPage />}
        />
        <Route
          path={CosRoutesEnum.MAINTENANCE_LICENSE_PAGE}
          element={<MaintenanceLicensePage />}
        />
      </Route>
      <Route path={CosRoutesEnum.EVENTS_PAGE} element={<EventsLayout />}>
        <Route
          index={true}
          path={CosRoutesEnum.EVENTS_PAGE}
          element={<EventsIndexPage />}
        />
        <Route
          path={CosRoutesEnum.EVENTS_TRIGGERS_PAGE}
          element={<EventsTriggersPage />}
        />
        <Route
          path={CosRoutesEnum.EVENTS_CHART_PAGE}
          element={<EventsChartPage />}
        />
      </Route>
      {/* Create & edit tunings route are placed outside of EventsLayout because
        the shared tabs should not be displayed on those pages. */}
      <Route
        path={CosRoutesEnum.MAINTENANCE_TUNINGS_CREATE_PAGE}
        element={<CreateTuningsPage />}
      />
      <Route
        path={CosRoutesEnum.MAINTENANCE_TUNINGS_EDIT_PAGE}
        element={<EditTuningsPage />}
      />
      <Route
        path={CosRoutesEnum.EVENTS_TRIGGERS_CREATE_PAGE}
        element={<TriggersCreatePage />}
      />
      <Route path={CosRoutesEnum.SETTINGS_PAGE} element={<SettingsPage />} />
      <Route
        path="*"
        element={
          <div className="flex size-full items-center justify-center">
            <HttpErrorDisplay statusCode={404} />
          </div>
        }
      />
    </Routes>
  )
}
