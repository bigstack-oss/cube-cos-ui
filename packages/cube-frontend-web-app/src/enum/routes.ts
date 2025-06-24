export const CosRoutesEnum = {
  ROOT_ROUTE: '/',
  /** Home Page */
  HOME_PAGE: '/home',
  HOME_CHART_PAGE: '/home/chart',
  HOME_HEALTH_PAGE: '/home/health',
  HOME_HEALTH_DETAIL_PAGE: (moduleName = ':module') =>
    `/home/health/${moduleName}` as const,
  HOME_MANAGE_PAGE: '/home/manage',
  /** Nodes Page */
  NODES_PAGE: '/nodes',
  NODES_DETAIL_PAGE: (hostname = ':name') => `/nodes/${hostname}` as const,
  /** Integrations Page */
  INTEGRATIONS_PAGE: '/integrations',
  /** Maintenance Page */
  MAINTENANCE_PAGE: '/maintenance',
  MAINTENANCE_SUPPORT_FILES_PAGE: '/maintenance/support-files',
  MAINTENANCE_TUNINGS_PAGE: '/maintenance/tunings',
  MAINTENANCE_TUNINGS_CREATE_PAGE: '/maintenance/tunings/create',
  MAINTENANCE_TUNINGS_EDIT_PAGE: '/maintenance/tunings/edit',
  MAINTENANCE_LICENSE_PAGE: '/maintenance/license',
  /** Events Page */
  EVENTS_PAGE: '/events',
  EVENTS_TRIGGERS_PAGE: '/events/triggers',
  EVENTS_TRIGGERS_CREATE_PAGE: '/events/triggers/create',
  EVENTS_CHART_PAGE: '/events/chart',
  /** Settings Page */
  SETTINGS_PAGE: '/settings',
} as const
