import { CosApiResponse } from './cosRequestUtils'
import {
  INTERNAL_useCosRequestHandler,
  UseCosRequestHandler,
} from './useCosRequestHandler'

export type UseCosMutationRequest<Data, Params extends Array<unknown>> = Omit<
  UseCosRequestHandler<Data>,
  'oversee'
> & {
  mutateResource: (...params: Params) => Promise<Data>
}

type MutationRequest<Data, Params extends Array<unknown>> = (
  ...params: Params
) => Promise<CosApiResponse<Data>>

export const useCosMutationRequest = <Data, Params extends Array<unknown>>(
  request: MutationRequest<Data, Params>,
): UseCosMutationRequest<Data, Params> => {
  const { oversee, ...requestHandlerAttrs } =
    INTERNAL_useCosRequestHandler<Data>({
      defaultIsLoading: false,
    })

  const mutateResource = async (...params: Params): Promise<Data> => {
    return oversee(() => request(...params))
  }

  return {
    ...requestHandlerAttrs,
    mutateResource,
  }
}
