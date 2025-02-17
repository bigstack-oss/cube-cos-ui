import axios from 'axios'
import { TokensApi } from '@cube-frontend/api'
import { config, validateStatus } from './utils'

const cosTokenApi = axios.create({ validateStatus })
export const tokenApi = new TokensApi(config, undefined, cosTokenApi)
