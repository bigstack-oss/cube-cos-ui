/**
 * In the local dev environment, it's impossible to integrate our login flow
 * since our Keycloak instance is in staging environment. After a successful
 * login, it will only redirect to the staging COS UI.
 *
 * Therefore, in the local dev environment,  we need to call the `getToken` API
 * using a username, password and data center to obtain an access token for
 * accessing protected APIs.
 */
import { InternalAxiosRequestConfig } from 'axios'
import { tokenApi } from './cosTokenApi'
import dayjs from 'dayjs'

const ACCESS_TOKEN_KEY = 'accessToken'
const EXPIRES_KEY = 'expires'

const renewToken = async () => {
  const {
    VITE_USERNAME: name,
    VITE_PASSWORD: password,
    VITE_DATA_CENTER: dataCenter,
  } = import.meta.env

  const res = await tokenApi.getToken({
    dataCenter,
    getTokensRequest: { name, password },
  })

  const { token: accessToken, expires } = res.data.data
  const accessTokenExpires = dayjs().add(expires.access, 'second').toISOString()

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(EXPIRES_KEY, accessTokenExpires)

  return accessToken
}

const getDevAccessToken = async (): Promise<string> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const expires = localStorage.getItem(EXPIRES_KEY)

  if (accessToken && expires && dayjs().isBefore(dayjs(expires))) {
    return accessToken
  }

  return renewToken()
}

const devAccessTokenInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  const devAccessToken = await getDevAccessToken()
  config.headers.Authorization = `Bearer ${devAccessToken}`
  return config
}

export default devAccessTokenInterceptor
