import { AxiosResponse, HttpStatusCode } from 'axios'
import { UseCosGetRequest } from './useCosGetRequest'

export type CosGetApiRequest<T> = () => Promise<CosGetApiResponse<T>>

export type CosGetApiResponse<T> = AxiosResponse<CosGetApiInnerResponse<T>>

export type CosGetApiInnerResponse<T> = {
  code: HttpStatusCode
  msg: string
  status: string
  data: T
}

export type CosGetRequestMiddleware = <Data>(
  getRequestHook: UseCosGetRequest<Data>,
) => UseCosGetRequest<Data>
