import { CosDropdown } from '@cube-frontend/ui-library'
import { languageMenu } from '../i18n/i18n'
import { useTranslation } from 'react-i18next'

export const LanguageDropdown = () => {
  const { i18n } = useTranslation()

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
            onClick={() => i18n.changeLanguage(value)}
          >
            {label}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
