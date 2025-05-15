import { CosButton } from '@cube-frontend/ui-library'

export const TuningsPreviousButton = () => {
  return (
    <CosButton
      size="md"
      type="ghost"
      usage="text-only"
      onClick={() => history.back()}
      className="w-fit"
    >
      Previous
    </CosButton>
  )
}
