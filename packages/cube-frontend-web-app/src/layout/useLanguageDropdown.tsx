import { useTranslation } from 'react-i18next'
import { SupportedLanguage } from '../i18n/utils'

export type LanguageOption = {
  label: string
  value: SupportedLanguage
  onClick: (v: string) => void
}

type UseLanguageDropdown = {
  languageOptions: LanguageOption[]
  currentLanguage: SupportedLanguage
}

export const useLanguageDropdown = (): UseLanguageDropdown => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language as SupportedLanguage

  const languageOptions = [
    {
      label: 'English',
      value: 'en-US',
      onClick: i18n.changeLanguage,
    },
    {
      label: '繁體中文',
      value: 'zh-TW',
      onClick: i18n.changeLanguage,
    },
  ] satisfies LanguageOption[]

  return { currentLanguage, languageOptions }
}
