import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { BaseAPI } from '@cube-frontend/api/sdk/base'
import {
  NodesApi,
  HealthApi,
  EventsApi,
  LogoutApi,
  DataCentersApi,
  MetricsApi,
  IntegrationsApi,
  UserInfoApi,
  Configuration,
  ServicesApi,
} from '@cube-frontend/api'
import devAccessTokenInterceptor from './devAccessTokenInterceptor'
import { config, validateStatus } from './utils'

const cosApi = axios.create({
  baseURL: '/',
  validateStatus,
})

type UnauthorizedResponse = {
  code?: string
  msg?: string
  status?: string
}

// redirect to perform SAML auth if HTTP status code 401 is received
cosApi.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  if (response.status === 401) {
    const redirectUrl = (response.data as UnauthorizedResponse)?.msg ?? ''
    if (redirectUrl !== '') {
      window.location.replace(redirectUrl)
    }
  }

  return response
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

export const userInfoApi = createApiInstance(UserInfoApi)
export const logoutApi = createApiInstance(LogoutApi)
export const dataCentersApi = createApiInstance(DataCentersApi)
export const integrationsApi = createApiInstance(IntegrationsApi)
export const metricsApi = createApiInstance(MetricsApi)
export const healthApi = createApiInstance(HealthApi)
export const nodesApi = createApiInstance(NodesApi)
export const eventsApi = createApiInstance(EventsApi)
export const servicesApi = createApiInstance(ServicesApi)

if (import.meta.env.DEV) {
  cosApi.interceptors.request.use(devAccessTokenInterceptor)
}

export default cosApi
