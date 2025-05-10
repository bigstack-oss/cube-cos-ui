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
  observedServiceNames: Set<string>,
): HealthUIData => {
  const { services = [] } = healths ?? {}

  let errorCount = 0
  const errorServices: GetHealthsResponseDataServicesInner[] = []

  services.forEach((service) => {
    const ng = service.status.current === 'ng'

    if (ng) {
      errorCount++
    }

    if (ng || observedServiceNames.has(service.name)) {
      errorServices.push(service)
    }
  })

  return {
    errorCount,
    errorServices,
  }
}
