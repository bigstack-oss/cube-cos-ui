import { HealthHistory } from './_components/healthHistory/HealthHistory'
import { HealthCheck } from './_components/healthCheck/HealthCheck'

export const HomeHealthPage = () => {
  return (
    <div className="mt-6">
      <HealthCheck />
      <HealthHistory />
    </div>
  )
}
