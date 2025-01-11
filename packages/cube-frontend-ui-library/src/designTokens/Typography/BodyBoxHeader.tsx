import classNames from 'classnames'

export const BodyBoxHeader = () => {
  return (
    <div className="flex flex-col">
      <div
        className={classNames(
          'primary-body2 grid grid-cols-2 items-center gap-10',
        )}
      >
        <div className="grid grid-cols-3">
          <span className="font-normal">Regular</span>
          <span className="font-medium">Medium</span>
          <span className="font-semibold">Semi Bold</span>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  )
}
