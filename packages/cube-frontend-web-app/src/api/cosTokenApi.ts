import { TokensApi } from '@cube-frontend/api'
import axios from 'axios'
import { config, validateStatus } from './utils'

const cosTokenApi = axios.create({
  baseURL: '/',
  validateStatus,
})

export const tokenApi = new TokensApi(config, undefined, cosTokenApi)
