export type BodyBoxHeaderProps = {
  includeExtraBold?: boolean
}

export const BodyBoxHeader = (props: BodyBoxHeaderProps) => {
  const { includeExtraBold = false } = props

  return (
    <div className="flex flex-col">
      <div className="primary-body2 grid grid-cols-2 gap-10">
        <div className="grid grid-cols-4">
          <span className="font-normal">Regular</span>
          <span className="font-medium">Medium</span>
          <span className="font-semibold">Semi Bold</span>
          {includeExtraBold && (
            <span className="font-extrabold">Extra Bold</span>
          )}
        </div>
      </div>
      <hr className="my-3" />
    </div>
  )
}
