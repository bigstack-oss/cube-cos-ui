import { GetEventsTypeEnum } from '@cube-frontend/api'

export const isValidEventsType = (type: string | null): boolean => {
  return Object.values(GetEventsTypeEnum).includes(
    type as unknown as GetEventsTypeEnum,
  )
}

export const getEventsType = (
  searchParams: URLSearchParams,
): GetEventsTypeEnum => {
  const urlEventsType = searchParams.get('eventsType')

  if (urlEventsType && isValidEventsType(urlEventsType)) {
    return urlEventsType as GetEventsTypeEnum
  } else {
    return GetEventsTypeEnum.System
  }
}
