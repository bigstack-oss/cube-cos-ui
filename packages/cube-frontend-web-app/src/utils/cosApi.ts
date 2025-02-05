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
  LicensesApi,
} from '@cube-frontend/api'

const config = new Configuration({ basePath: '.' })

const validateStatus = (status: number) => {
  if (status >= 200 && status <= 300) return true
  return false
}

const cosApi = axios.create({
  headers: {
    /**
     * In local dev env, we can't use the cookies from Keycloak,
     * since we will redirect to the staging cube-cos-ui application with cookies
     * after keycloak login successful.
     *
     * So need to generate a token from
     * https://10.32.10.113:4443/api/v1/datacenters/dell13/apidocs/index.html#/Tokens/getToken
     * and set it in the Authorization header.
     */
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
export const licenseApi = new LicensesApi(config, undefined, cosApi)

export default cosApi
