import { AxiosResponse, HttpStatusCode } from 'axios'
import { isObject } from 'lodash'

export type CosApiResponse<T> = AxiosResponse<{
  code: HttpStatusCode
  msg: string
  status: string
  data: T
}>

export type CosRequestError = {
  native: Error
  api: CosApiError | undefined
}

export type CosApiError = Pick<
  CosApiResponse<unknown>['data'],
  'code' | 'msg' | 'status'
>

export const isCosApiResponse = (
  value: unknown,
): value is CosApiResponse<unknown> => {
  return (
    isObject(value) && 'code' in value && 'msg' in value && 'status' in value
  )
}

export const isCosRequestError = (value: unknown): value is CosRequestError => {
  return isObject(value) && 'nativeError' in value && 'apiError' in value
}
