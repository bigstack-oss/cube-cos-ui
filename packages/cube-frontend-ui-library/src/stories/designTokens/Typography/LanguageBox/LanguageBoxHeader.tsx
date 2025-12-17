export const LanguageBoxHeader = () => {
  return (
    <div className="flex flex-col">
      <div className="primary-body2 grid grid-cols-2 gap-y-2.5">
        <div className="grid grid-cols-[300px_180px_300px_280px] gap-x-10">
          <span className="secondary-h5 text-functional-title">
            Language Mode
          </span>
          <span className="secondary-h5 text-functional-title">Typefaces</span>
          <span className="secondary-h5 text-functional-title">
            Description
          </span>
          <span className="font-extrabold">Diagram</span>
        </div>
      </div>
      <hr className="mb-6 mt-3" />
    </div>
  )
}
