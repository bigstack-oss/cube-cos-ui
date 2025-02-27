import { HealthAccordion } from './_components/healthAccordion/HealthAccordion'
import { HealthCheck } from './_components/healthCheck/HealthCheck'

export const HomeHealthPage = () => {
  return (
    <div className="mt-6">
      <HealthCheck />
      <HealthAccordion />
    </div>
  )
}
