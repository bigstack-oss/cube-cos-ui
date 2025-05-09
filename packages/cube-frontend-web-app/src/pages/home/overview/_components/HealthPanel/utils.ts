import {
  GetHealthsResponseData,
  GetHealthsResponseDataServicesInner,
} from '@cube-frontend/api'

type HealthUIData = {
  errorCount: number
  errorServices: GetHealthsResponseDataServicesInner[]
}

export const toHealthUIData = (
  healths: GetHealthsResponseData | undefined,
): HealthUIData => {
  const { services = [] } = healths ?? {}

  let errorCount = 0
  const errorServices: GetHealthsResponseDataServicesInner[] = []

  services.forEach((service) => {
    if (service.status.current === 'ng') {
      errorCount++
      errorServices.push(service)
    }
  })

  return {
    errorCount,
    errorServices,
  }
}
