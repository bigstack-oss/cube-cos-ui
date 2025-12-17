import { LanguageBox } from './LanguageBox'

export const EnglishLanguageBox = () => {
  return (
    <LanguageBox
      language="English"
      typefaces={
        <>
          <span className="primary-h2 font-inter text-functional-text">
            Inter
          </span>
          <span className="secondary-h2 font-urbanist text-functional-text">
            Urbanist
          </span>
        </>
      }
      description="CubeCOS uses English as its default language. Typography usage follows the heading and body text guidelines described above."
      diagram={{
        headingText: 'Heading',
        bodyText: 'Body',
      }}
    />
  )
}
