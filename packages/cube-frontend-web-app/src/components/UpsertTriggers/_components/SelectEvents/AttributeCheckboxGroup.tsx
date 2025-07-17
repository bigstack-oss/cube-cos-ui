import { CosCheckbox, CosCheckboxGrid } from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'

type AttributeCheckboxGroupProps<T extends string> = {
  label: string
  isAllChecked: boolean | null
  attributes: T[]
  selectedAttributes: T[]
  onAttributesChange: (attribute: T) => void
  onAllAttributesChange: () => void
}

export const AttributeCheckboxGroup = <T extends string>(
  props: AttributeCheckboxGroupProps<T>,
) => {
  const {
    label,
    isAllChecked,
    attributes,
    selectedAttributes,
    onAttributesChange,
    onAllAttributesChange,
  } = props
  return (
    <div className="flex flex-col gap-y-6">
      <CosCheckbox
        label={'All ' + label}
        checked={isAllChecked}
        onChange={onAllAttributesChange}
      />
      <CosCheckboxGrid direction="wrap" className="col-span-3">
        {attributes.map((attribute) => (
          <CosCheckbox
            key={attribute}
            label={upperFirst(attribute)}
            checked={selectedAttributes.includes(attribute)}
            onChange={() => onAttributesChange(attribute)}
          />
        ))}
      </CosCheckboxGrid>
    </div>
  )
}
