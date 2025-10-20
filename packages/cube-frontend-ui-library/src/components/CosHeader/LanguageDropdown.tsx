import { CosDropdown } from '../../components/CosDropdown/CosDropdown'

type LanguageOption = {
  label: string
  value: string
  onClick: (value: string) => void
}

export type LanguageDropdownProps = {
  currentLanguage: string
  languageOptions: LanguageOption[]
}

export const LanguageDropdown = (props: LanguageDropdownProps) => {
  const { currentLanguage, languageOptions } = props

  return (
    <CosDropdown type="radio" selectedItems={[currentLanguage]}>
      <CosDropdown.Trigger placeholder="Select an Item">
        {languageOptions.find((i) => i.value === currentLanguage)?.label}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {languageOptions.map(({ label, value, onClick }) => (
          <CosDropdown.Item
            key={value}
            item={value}
            onClick={() => onClick(value)}
          >
            {label}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
