import {
  CosTableInput,
  CosTableInputProps,
} from '../CosTableInput/CosTableInput'

export const CosPaginationGoToPageInput = (props: CosTableInputProps) => {
  return (
    <div className="secondary-body4 flex items-center">
      <div className="p-[10px]">Go to</div>
      {/* Use table input because the space for error message/icon is limited
          in pagination. */}
      <CosTableInput {...props} className="h-7 w-[59px]" />
    </div>
  )
}
