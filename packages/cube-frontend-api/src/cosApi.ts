import axios from 'axios'
import {
  NodesApi,
  HealthApi,
  EventsApi,
  LogoutApi,
  DataCentersApi,
  Configuration,
  MetricsApi,
  IntegrationsApi,
  UserInfoApi,
} from '../dist/index'

const config = new Configuration({ basePath: '.' })

const validateStatus = (status: number) => {
  if (status >= 200 && status <= 300) return true
  return false
}

const cosApi = axios.create({
  headers: {
    // TODO: Currently, we don't integration actual authentication.
    // We are using a mock token for now.
    ...(import.meta.env.VITE_TEST_TOKEN && {
      Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
    }),
  },
  validateStatus,
})

export const userInfoApi = new UserInfoApi(config, undefined, cosApi)
export const logoutApi = new LogoutApi(config, undefined, cosApi)
export const dataCentersApi = new DataCentersApi(config, undefined, cosApi)
export const integrationsApi = new IntegrationsApi(config, undefined, cosApi)
export const metricsApi = new MetricsApi(config, undefined, cosApi)
export const healthApi = new HealthApi(config, undefined, cosApi)
export const nodesApi = new NodesApi(config, undefined, cosApi)
export const eventsApi = new EventsApi(config, undefined, cosApi)

export default cosApi
