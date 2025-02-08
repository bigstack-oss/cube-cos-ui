import { ChangeEvent, useState } from 'react'
import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'
import { CosDropdownVariant } from '../../../components/CosDropdown/utils'

type OptionType = {
  code: string
  name: string
  disabled: boolean
}

const fruits = [
  {
    code: 'apple',
    name: 'Apple',
    disabled: false,
  },
  {
    code: 'banana',
    name: 'Banana',
    disabled: false,
  },
  {
    code: 'cherry',
    name: 'Cherry',
    disabled: false,
  },
  {
    code: 'durian',
    name: 'Durian',
    disabled: true,
  },
  {
    code: 'grape',
    name: 'Grape',
    disabled: false,
  },
  {
    code: 'kiwi',
    name: 'Kiwi',
    disabled: false,
  },
  {
    code: 'lemon',
    name: 'Lemon',
    disabled: false,
  },
  {
    code: 'mango',
    name: 'Mango',
    disabled: false,
  },
  {
    code: 'orange',
    name: 'Orange',
    disabled: false,
  },
  {
    code: 'pear',
    name: 'Pear',
    disabled: false,
  },
  {
    code: 'strawberry',
    name: 'Strawberry',
    disabled: false,
  },
  {
    code: 'watermelon',
    name: 'Watermelon',
    disabled: false,
  },
]

type CheckboxDropdownProps = {
  variant: CosDropdownVariant
  isDisabled: boolean
  hasDefaultValue: boolean
  hasSearchbar: boolean
  label?: string
}

export const CheckboxDropdown = (props: CheckboxDropdownProps) => {
  const { variant, isDisabled, hasDefaultValue, hasSearchbar, label } = props

  const [searchValue, setSearchValue] = useState('')
  const [selectedFruits, setSelectedFruits] = useState<OptionType[]>(
    hasDefaultValue ? [fruits[0]] : [],
  )

  const handleFruitClick = (fruit: OptionType) => {
    if (isDisabled) return

    const fruitSet = new Set(selectedFruits.map((f) => f.code))

    if (fruitSet.has(fruit.code)) {
      setSelectedFruits(selectedFruits.filter((f) => f.code !== fruit.code))
    } else {
      setSelectedFruits([...selectedFruits, fruit])
    }
  }

  const handleAllFruitsSelect = (checked: boolean) => {
    if (isDisabled) return

    if (checked) {
      setSelectedFruits(fruits.filter((fruit) => !fruit.disabled))
    } else {
      setSelectedFruits([])
    }
  }

  const handleClearClick = () => {
    setSelectedFruits([])
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return hasSearchbar ? (
    <CosDropdown
      type="search-checkbox"
      variant={variant}
      label={label}
      selectedItems={selectedFruits}
      onAllCheckChange={handleAllFruitsSelect}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onClearClick={handleClearClick}
      disabled={isDisabled}
    >
      <CosDropdown.Trigger placeholder="Select Fruits">
        {selectedFruits.length > 0
          ? `${selectedFruits.length} selected`
          : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {fruits.map((fruit) => {
          if (
            searchValue &&
            !fruit.name.toLowerCase().includes(searchValue.toLowerCase())
          ) {
            return null
          }
          return (
            <CosDropdown.Item
              key={fruit.code}
              checked={selectedFruits.some((f) => f.code === fruit.code)}
              disabled={fruit.disabled}
              onClick={() => handleFruitClick(fruit)}
            >
              {fruit.name}
            </CosDropdown.Item>
          )
        })}
      </CosDropdown.Menu>
    </CosDropdown>
  ) : (
    <CosDropdown
      type="checkbox"
      variant={variant}
      label={label}
      selectedItems={selectedFruits}
      onAllCheckChange={handleAllFruitsSelect}
      disabled={isDisabled}
    >
      <CosDropdown.Trigger placeholder="Select Fruits">
        {selectedFruits.length > 0
          ? `${selectedFruits.length} selected`
          : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {fruits.map((fruit) => (
          <CosDropdown.Item
            key={fruit.code}
            checked={selectedFruits.some((f) => f.code === fruit.code)}
            disabled={fruit.disabled}
            onClick={() => handleFruitClick(fruit)}
          >
            {fruit.name}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
