import {
  CosTableInput,
  CosTableInputProps,
} from '../CosTableInput/CosTableInput'

export const CosPaginationGoToPageInput = (props: CosTableInputProps) => {
  return (
    <div className="secondary-body4 flex items-center">
      <div className="p-[10px]">Go to</div>
      <div className="w-[60px]">
        <CosTableInput {...props} />
      </div>
    </div>
  )
}
