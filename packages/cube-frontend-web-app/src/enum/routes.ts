export enum Routes {
  ROOT_ROUTE = '/',
  /** Home Page */
  HOME_PAGE = '/home',
  HOME_CHART_PAGE = '/home/chart',
  HOME_HEALTH_PAGE = '/home/health',
  HOME_HEALTH_DETAIL_PAGE = '/home/health/:module',
  HOME_MANAGE_PAGE = '/home/manage',
  /** Nodes Page */
  NODES_PAGE = '/nodes',
  NODES_DETAIL_PAGE = '/nodes/:name',
  /** Integrations Page */
  INTEGRATIONS_PAGE = '/integrations',
  /** Maintenance Page */
  MAINTENANCE_PAGE = '/maintenance',
  MAINTENANCE_SUPPORT_FILES_PAGE = '/maintenance/support-files',
  MAINTENANCE_LICENSE_PAGE = '/maintenance/license',
  /** Events Page */
  EVENTS_PAGE = '/events',
  EVENTS_TRIGGERS_PAGE = '/events/triggers',
  EVENTS_TRIGGERS_CREATE_PAGE = '/events/triggers/create',
  EVENTS_TUNINGS_PAGE = '/events/tunings',
  EVENTS_TUNINGS_CREATE_PAGE = '/events/tunings/create',
  EVENTS_TUNINGS_EDIT_PAGE = '/events/tunings/edit',
  EVENTS_CHART_PAGE = '/events/chart',
  /** Settings Page */
  SETTINGS_PAGE = '/settings',
}
