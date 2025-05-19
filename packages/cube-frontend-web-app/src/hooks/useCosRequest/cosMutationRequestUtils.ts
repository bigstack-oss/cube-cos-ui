import { AxiosResponse, HttpStatusCode } from 'axios'

export type CosMutationApiRequest<T> = () => Promise<CosMutationApiResponse<T>>

export type CosMutationApiResponse<T> = AxiosResponse<
  CosMutationApiInnerResponse<T>
>

type CosMutationApiInnerResponse<T> = {
  code: HttpStatusCode
  msg: string
  status: string
  data?: T
}
