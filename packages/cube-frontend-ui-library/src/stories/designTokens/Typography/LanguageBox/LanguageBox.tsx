import { ReactNode } from 'react'

export type LanguageBoxProps = {
  language: string
  typefaces: ReactNode
  description: string
  diagram: {
    headingText: string
    bodyText: string
  }
}

export const LanguageBox = (props: LanguageBoxProps) => {
  const { language, typefaces, description, diagram } = props

  return (
    <div>
      <div className="grid w-full grid-cols-[300px_180px_300px_280px] gap-x-10 pb-[30px] pt-5">
        <span className="primary-h1 text-functional-text">{language}</span>
        <div className="flex flex-col gap-y-2.5">{typefaces}</div>
        <span className="primary-body2 text-functional-text opacity-[.56]">
          {description}
        </span>
        <div className="flex flex-col gap-y-2.5">
          <span className="primary-h1 text-functional-title">
            {diagram.headingText}
          </span>
          <span className="primary-body1 text-functional-text">
            {diagram.bodyText}
          </span>
        </div>
      </div>
      <hr />
    </div>
  )
}
