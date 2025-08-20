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
  NODE_DETAIL_PAGE: (hostname = ':name') => `/nodes/${hostname}` as const,
  NODE_IPMI_CONTROL_PAGE: (hostname = ':name') =>
    `/nodes/${hostname}/ipmi-control` as const,
  /** Integrations Page */
  INTEGRATIONS_PAGE: '/integrations',
  INTEGRATIONS_APPLICATIONS_PAGE: '/integrations/applications',
  INTEGRATIONS_STORAGES_PAGE: '/integrations/storages',
  INTEGRATIONS_STORAGES_CREATE_PAGE: '/integrations/storages/create',
  INTEGRATIONS_STORAGES_EDIT_PAGE: (storageName = ':name') =>
    `/integrations/storages/${storageName}/edit`,
  /** Maintenance Page */
  MAINTENANCE_PAGE: '/maintenance',
  MAINTENANCE_SUPPORT_FILES_PAGE: '/maintenance/support-files',
  MAINTENANCE_TUNINGS_PAGE: '/maintenance/tunings',
  MAINTENANCE_TUNINGS_CREATE_PAGE: '/maintenance/tunings/create',
  MAINTENANCE_TUNINGS_EDIT_PAGE: '/maintenance/tunings/edit',
  MAINTENANCE_LICENSE_PAGE: '/maintenance/license',
  MAINTENANCE_UPDATE_PAGE: '/maintenance/update',
  MAINTENANCE_UPDATE_FIRMWARE_PAGE: '/maintenance/update/firmware',
  MAINTENANCE_UPDATE_FIXPACK_PAGE: '/maintenance/update/fixpack',
  /** Events Page */
  EVENTS_PAGE: '/events',
  EVENTS_TRIGGERS_PAGE: '/events/triggers',
  EVENTS_TRIGGERS_CREATE_PAGE: '/events/triggers/create',
  EVENTS_TRIGGERS_EDIT_PAGE: '/events/triggers/edit',
  EVENTS_CHART_PAGE: '/events/chart',
  /** Settings Page */
  SETTINGS_PAGE: '/settings',
  // Notifications
  NOTIFICATIONS_PAGE: '/notifications',
} as const
