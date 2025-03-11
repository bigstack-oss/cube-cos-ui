import { Navigate, Route, Routes } from 'react-router'
import { Routes as CosRoutesEnum } from './enum/routes'
/** Home Page */
import { HomeLayout } from './pages/home/HomeLayout'
import { HomeOverviewPage } from './pages/home/overview/HomeOverviewPage'
import { HomeChartPage } from './pages/home/chart/HomeChartPage'
import { HomeHealthPage } from './pages/home/health/HomeHealthPage'
import { HomeManagePage } from './pages/home/manage/HomeManagePage'
import { HealthDetailsPage } from './pages/home/health/[module]/HealthDetailsPage'
import { SettingsPage } from './pages/settings/SettingsPage'
/** Events Page */
import { EventsLayout } from './pages/events/EventsLayout'
import { EventsIndexPage } from './pages/events/index/EventsIndexPage'
import { EventsTriggersPage } from './pages/events/triggers/EventsTriggersPage'
import { EventsTuningsPage } from './pages/events/tunings/EventsTuningsPage'
import { EventsChartPage } from './pages/events/chart/EventsChartPage'

export const CosRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        index={true}
        element={<Navigate to="/home" replace={true} />}
      />
      <Route path={CosRoutesEnum.HOME_PAGE} element={<HomeLayout />}>
        <Route index={true} element={<HomeOverviewPage />} />
        <Route path="/home/chart" element={<HomeChartPage />} />
        <Route path="/home/health" element={<HomeHealthPage />} />
        <Route path="/home/health/:module" element={<HealthDetailsPage />} />
        <Route path="/home/manage" element={<HomeManagePage />} />
      </Route>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path={CosRoutesEnum.EVENTS_PAGE} element={<EventsLayout />}>
        <Route
          path={CosRoutesEnum.EVENTS_PAGE}
          index={true}
          element={<EventsIndexPage />}
        />
        <Route
          path={CosRoutesEnum.EVENTS_TRIGGERS_PAGE}
          element={<EventsTriggersPage />}
        />
        <Route
          path={CosRoutesEnum.EVENTS_TUNINGS_PAGE}
          element={<EventsTuningsPage />}
        />
        <Route
          path={CosRoutesEnum.EVENTS_CHART_PAGE}
          element={<EventsChartPage />}
        />
      </Route>
      <Route path="*" element={<div>TODO: Not Found Page</div>} />
    </Routes>
  )
}
