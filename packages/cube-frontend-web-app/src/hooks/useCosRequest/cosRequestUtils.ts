import { HttpStatusCode, isCancel } from 'axios'
import { isObject } from 'lodash'
import { CosGetApiResponse } from './cosGetRequestUtils'
import { CosMutationApiResponse } from './cosMutationRequestUtils'

export type CosRequestError = {
  native: Error
  api: CosApiError | undefined
}

export type CosApiError = {
  code: HttpStatusCode
  msg: string
  status: string
}

export type Nullish<T> = T | null | undefined

export type GetParamFn<T> = () => T | null | undefined

export const isCosApiResponse = (
  value: unknown,
): value is CosGetApiResponse<unknown> | CosMutationApiResponse<unknown> => {
  const isAxiosResponse = isObject(value) && 'data' in value
  return (
    isAxiosResponse &&
    isObject(value.data) &&
    'code' in value.data &&
    'msg' in value.data &&
    'status' in value.data
  )
}

export const isCosRequestError = (value: unknown): value is CosRequestError => {
  return isObject(value) && 'nativeError' in value && 'apiError' in value
}

export const isNullish = <T>(value: T): value is Required<T> => {
  return value === null || value === undefined
}

export const getNativeError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error
  }
  try {
    return new Error(JSON.stringify(error))
  } catch {
    return new Error(String(error))
  }
}

/**
 * Executes a promise and suppresses any errors that occur.
 */
export const silentPromise = async (
  callback: () => Promise<unknown>,
): Promise<void> => {
  try {
    await callback()
  } catch (error) {
    if (isCancel(error)) return
    console.error(error)
  }
}
