import {
  GetHealthsResponseData,
  GetHealthsResponseDataServicesInner,
} from '@cube-frontend/api'

export const toHealthUIData = (healths: GetHealthsResponseData | undefined) => {
  let errorCount = 0
  const errorServices: GetHealthsResponseDataServicesInner[] = []
  const categories: Record<string, GetHealthsResponseDataServicesInner[]> = {}

  if (!healths) {
    return {
      errorCount,
      errorServices,
      categories,
    }
  }

  healths.services.forEach((service) => {
    if (service.status.current === 'ng') {
      errorCount++
    }
  })

  healths.services.forEach((service) => {
    if (service.status.current === 'ng') {
      errorServices.push(service)
    }
  })

  healths.services.forEach((service) => {
    if (!categories[service.category]) {
      categories[service.category] = []
    }
    categories[service.category].push(service)
  })

  return {
    errorCount,
    errorServices,
    categories,
  }
}
