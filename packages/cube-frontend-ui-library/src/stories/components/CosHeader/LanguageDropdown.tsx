import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'

const languageMenu = [
  { label: 'English', value: 'en' },
  { label: '繁體中文', value: 'zh-TW' },
]

const currentLanguage = languageMenu[0].value
export const LanguageDropdown = () => (
  <CosDropdown type="radio" selectedItems={[currentLanguage]}>
    <CosDropdown.Trigger placeholder="Select an Item">
      {languageMenu.find((i) => i.value === currentLanguage)?.label}
    </CosDropdown.Trigger>
    <CosDropdown.Menu>
      {languageMenu.map(({ label, value }) => (
        <CosDropdown.Item
          key={value}
          item={value}
          onClick={() => alert('language change')}
        >
          {label}
        </CosDropdown.Item>
      ))}
    </CosDropdown.Menu>
  </CosDropdown>
)
