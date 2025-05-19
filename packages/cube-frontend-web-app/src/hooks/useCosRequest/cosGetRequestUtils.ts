import { AxiosResponse, HttpStatusCode } from 'axios'

export type CosGetApiRequest<T> = () => Promise<CosGetApiResponse<T>>

export type CosGetApiResponse<T> = AxiosResponse<CosGetApiInnerResponse<T>>

export type CosGetApiInnerResponse<T> = {
  code: HttpStatusCode
  msg: string
  status: string
  data: T
}
