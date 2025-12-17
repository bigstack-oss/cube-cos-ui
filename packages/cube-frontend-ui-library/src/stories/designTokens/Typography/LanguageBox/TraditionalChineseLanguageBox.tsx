import { LanguageBox } from './LanguageBox'

export const TraditionalChineseLanguageBox = () => {
  return (
    <LanguageBox
      language="Traditional Chinese"
      typefaces={
        <>
          <span className="primary-h2 font-inter text-functional-text">
            Inter
          </span>
          <span className="secondary-h2 font-urbanist text-functional-text">
            Urbanist
          </span>
          <span className="primary-h2 font-noto-sans-tc text-functional-text">
            Noto Sans TC
          </span>
        </>
      }
      description="In Traditional Chinese mode, Chinese text is displayed using Noto Sans TC. For mixed Chinese–English content, English text follows the existing heading and body font rules (Inter / Urbanist), while Chinese text uses Noto Sans TC, displayed alongside the English fonts."
      diagram={{
        headingText: '中英並用的Heading',
        bodyText: '中英並用的Body',
      }}
    />
  )
}
