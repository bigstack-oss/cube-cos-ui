import axios from 'axios'
import {
  NodesApi,
  HealthApi,
  EventsApi,
  LogoutApi,
  DataCentersApi,
  MetricsApi,
  IntegrationsApi,
  UserInfoApi,
} from '@cube-frontend/api'
import devAccessTokenInterceptor from './devAccessTokenInterceptor'
import { config, validateStatus } from './utils'

const cosApi = axios.create({ validateStatus })

export const userInfoApi = new UserInfoApi(config, undefined, cosApi)
export const logoutApi = new LogoutApi(config, undefined, cosApi)
export const dataCentersApi = new DataCentersApi(config, undefined, cosApi)
export const integrationsApi = new IntegrationsApi(config, undefined, cosApi)
export const metricsApi = new MetricsApi(config, undefined, cosApi)
export const healthApi = new HealthApi(config, undefined, cosApi)
export const nodesApi = new NodesApi(config, undefined, cosApi)
export const eventsApi = new EventsApi(config, undefined, cosApi)

if (import.meta.env.DEV) {
  cosApi.interceptors.request.use(devAccessTokenInterceptor)
}

export default cosApi
