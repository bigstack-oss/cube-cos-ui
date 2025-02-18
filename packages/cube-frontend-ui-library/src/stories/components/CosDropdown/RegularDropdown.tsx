import { ChangeEvent, useState } from 'react'
import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'
import { CosDropdownVariant } from '../../../components/CosDropdown/utils'

type OptionType = {
  code: string
  name: string
  disabled: boolean
}

const countries = [
  {
    code: 'tw',
    name: 'Taiwan',
    disabled: false,
  },
  {
    code: 'kr',
    name: 'Korea',
    disabled: false,
  },
  {
    code: 'jp',
    name: 'Japan',
    disabled: false,
  },
  {
    code: 'us',
    name: 'United States',
    disabled: true,
  },
]

type RegularDropdownProps = {
  variant: CosDropdownVariant
  isDisabled: boolean
  hasDefaultValue: boolean
  hasSearchbar: boolean
  label?: string
}

export const RegularDropdown = (props: RegularDropdownProps) => {
  const { variant, isDisabled, hasDefaultValue, hasSearchbar, label } = props

  const [searchValue, setSearchValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<OptionType[]>(
    hasDefaultValue ? [countries[0]] : [],
  )

  const handleCountryClick = (country: OptionType) => {
    if (isDisabled) return
    setSelectedCountry([country])
  }

  const handleClearClick = () => {
    setSelectedCountry([])
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return hasSearchbar ? (
    <CosDropdown
      type="search"
      variant={variant}
      label={label}
      selectedItems={selectedCountry}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onClearClick={handleClearClick}
      disabled={isDisabled}
    >
      <CosDropdown.Trigger placeholder="Select a Country">
        {selectedCountry.length > 0 ? selectedCountry[0].name : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {countries.map((country) => {
          if (
            searchValue &&
            !country.name.toLowerCase().includes(searchValue.toLowerCase())
          ) {
            return null
          }
          return (
            <CosDropdown.Item
              key={country.code}
              item={country}
              disabled={country.disabled}
              onClick={() => handleCountryClick(country)}
            >
              {country.name}
            </CosDropdown.Item>
          )
        })}
      </CosDropdown.Menu>
    </CosDropdown>
  ) : (
    <CosDropdown
      type="regular"
      variant={variant}
      label={label}
      selectedItems={selectedCountry}
      disabled={isDisabled}
    >
      <CosDropdown.Trigger placeholder="Select a Country">
        {selectedCountry.length > 0 ? selectedCountry[0].name : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {countries.map((country) => (
          <CosDropdown.Item
            key={country.code}
            item={country}
            disabled={country.disabled}
            onClick={() => handleCountryClick(country)}
          >
            {country.name}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
