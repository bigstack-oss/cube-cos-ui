import { CosDropdown } from '@cube-frontend/ui-library'
import { useTranslation } from 'react-i18next'
import { languageMenu } from '../i18n/utils'

export const LanguageDropdown = () => {
  const { i18n } = useTranslation()

  const handleChangeLanguage = (value: string) => {
    if (value !== i18n.language) {
      i18n.changeLanguage(value)
    }
  }

  return (
    <CosDropdown type="radio" selectedItems={[i18n.language]}>
      <CosDropdown.Trigger placeholder="Select an Item">
        {languageMenu.find((i) => i.value === i18n.language)?.label}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {languageMenu.map(({ label, value }) => (
          <CosDropdown.Item
            key={value}
            item={value}
            onClick={() => handleChangeLanguage(value)}
          >
            {label}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
