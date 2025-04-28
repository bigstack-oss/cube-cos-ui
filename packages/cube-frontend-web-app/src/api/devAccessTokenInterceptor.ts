/**
 * In the local dev environment, it's impossible to integrate our login flow
 * since our Keycloak instance is in staging environment. After a successful
 * login, it will only redirect to the staging COS UI.
 *
 * Therefore, in the local dev environment,  we need to call the `getToken` API
 * using a username, password and data center to obtain an access token for
 * accessing protected APIs.
 */
import { HttpStatusCode, InternalAxiosRequestConfig, isAxiosError } from 'axios'
import { tokenApi } from './cosTokenApi'
import dayjs from 'dayjs'

const ACCESS_TOKEN_KEY = 'accessToken'
const EXPIRES_KEY = 'expires'
const DATA_CENTER_KEY = 'dataCenter'

export const renewToken = async () => {
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
  localStorage.setItem(DATA_CENTER_KEY, dataCenter)

  return accessToken
}

const getDevAccessToken = async (): Promise<string> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const expires = localStorage.getItem(EXPIRES_KEY)
  const dataCenter = localStorage.getItem(DATA_CENTER_KEY)

  if (dataCenter !== import.meta.env.VITE_DATA_CENTER) {
    return renewToken()
  }

  if (accessToken && expires && dayjs().isBefore(dayjs(expires))) {
    return accessToken
  }

  return renewToken()
}

export const devAccessTokenRequestInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  const devAccessToken = await getDevAccessToken()
  config.headers.Authorization = `Bearer ${devAccessToken}`
  return config
}

export const devAccessTokenErrorInterceptor = async (
  error: unknown,
): Promise<unknown> => {
  if (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  ) {
    await renewToken()
  }
  return Promise.reject(error)
}
