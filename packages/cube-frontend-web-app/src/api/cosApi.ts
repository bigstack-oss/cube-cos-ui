import axios, { AxiosInstance } from 'axios'
import { BaseAPI } from '@cube-frontend/api/sdk/base'
import {
  Configuration,
  DataCentersApi,
  EventsApi,
  FirmwaresApi,
  GrafanaApi,
  HealthApi,
  IntegrationsApi,
  LicensesApi,
  LogoutApi,
  MetricsApi,
  NodesApi,
  NotificationsApi,
  ServicesApi,
  SettingsApi,
  SupportFilesApi,
  TriggersApi,
  TuningsApi,
  UserInfoApi,
} from '@cube-frontend/api'
import {
  devAccessTokenRequestInterceptor,
  devAccessTokenErrorInterceptor,
} from './devAccessTokenInterceptor'
import { samlAuthErrorInterceptor } from './samlAuthErrorInterceptor'
import { config, validateStatus } from './utils'

const cosApi = axios.create({
  baseURL: '/',
  validateStatus,
})

/**
 * Bind all methods of an API instance to the instance itself.
 * This is necessary because `this` is lost when passing methods as callbacks,
 * like in the following example:
 *
 * ```tsx
 *  const { data: dataCenters, isLoading } = useCosGetRequest(
 *    dataCentersApi.getDataCenters,
 *  )
 * ```
 *
 * This results in the inability to access `this.configuration`
 * from the `dataCentersApi` instance within the `getDataCenters` method.
 */
function bindMethods(apiInstance: BaseAPI) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(apiInstance)).map((key) => {
    const instanceObj = apiInstance as unknown as Record<string, unknown>
    if (instanceObj[key] instanceof Function && key !== 'constructor')
      instanceObj[key] = instanceObj[key].bind(apiInstance)
  })
}

const createApiInstance = <T extends BaseAPI>(
  ApiClass: new (
    config: Configuration,
    basePath?: string,
    axiosInstance?: AxiosInstance,
  ) => T,
): T => {
  const apiInstance = new ApiClass(config, undefined, cosApi)
  bindMethods(apiInstance)
  return apiInstance
}

export const dataCentersApi = createApiInstance(DataCentersApi)
export const eventsApi = createApiInstance(EventsApi)
export const grafanaApi = createApiInstance(GrafanaApi)
export const healthApi = createApiInstance(HealthApi)
export const integrationsApi = createApiInstance(IntegrationsApi)
export const licenseApi = createApiInstance(LicensesApi)
export const logoutApi = createApiInstance(LogoutApi)
export const metricsApi = createApiInstance(MetricsApi)
export const nodesApi = createApiInstance(NodesApi)
export const notificationsApi = createApiInstance(NotificationsApi)
export const servicesApi = createApiInstance(ServicesApi)
export const settingsApi = createApiInstance(SettingsApi)
export const supportFilesApi = createApiInstance(SupportFilesApi)
export const triggersApi = createApiInstance(TriggersApi)
export const tuningsApi = createApiInstance(TuningsApi)
export const userInfoApi = createApiInstance(UserInfoApi)
export const firmwaresApi = createApiInstance(FirmwaresApi)

if (import.meta.env.DEV) {
  cosApi.interceptors.request.use(devAccessTokenRequestInterceptor)
  cosApi.interceptors.response.use(undefined, devAccessTokenErrorInterceptor)
} else {
  cosApi.interceptors.response.use(undefined, samlAuthErrorInterceptor)
}

export default cosApi
