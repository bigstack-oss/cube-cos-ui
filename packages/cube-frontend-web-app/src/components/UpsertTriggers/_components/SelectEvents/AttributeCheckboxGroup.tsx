import { CosCheckbox, CosCheckboxGrid } from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'

type AttributeCheckboxGroupProps<T extends string> = {
  selectAllLabel: string
  isAllChecked: boolean | null
  attributeOptions: { label: string; value: T }[]
  selectedAttributes: T[]
  onAttributesChange: (attribute: T) => void
  onAllAttributesChange: () => void
}

export const AttributeCheckboxGroup = <T extends string>(
  props: AttributeCheckboxGroupProps<T>,
) => {
  const {
    selectAllLabel,
    isAllChecked,
    attributeOptions: attributes,
    selectedAttributes,
    onAttributesChange,
    onAllAttributesChange,
  } = props

  return (
    <div className="flex flex-col gap-y-6">
      <CosCheckbox
        label={selectAllLabel}
        checked={isAllChecked}
        onChange={onAllAttributesChange}
      />
      <CosCheckboxGrid direction="wrap" className="col-span-3">
        {attributes.map((attribute) => (
          <CosCheckbox
            key={attribute.value}
            label={upperFirst(attribute.label)}
            checked={selectedAttributes.includes(attribute.value)}
            onChange={() => onAttributesChange(attribute.value)}
          />
        ))}
      </CosCheckboxGrid>
    </div>
  )
}
