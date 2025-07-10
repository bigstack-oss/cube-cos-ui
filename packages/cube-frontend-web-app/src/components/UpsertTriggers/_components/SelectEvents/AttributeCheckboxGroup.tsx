import { CosCheckbox, CosCheckboxGrid } from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'

type AttributeCheckboxGroupProps = {
  label: string
  isAllChecked: boolean | null
  attributes: string[]
  selectedAttributes: string[]
  onAttributesChange: (attribute: string) => void
  onAllAttributesChange: () => void
}

export const AttributeCheckboxGroup = (props: AttributeCheckboxGroupProps) => {
  const {
    label,
    isAllChecked,
    attributes,
    selectedAttributes,
    onAttributesChange,
    onAllAttributesChange,
  } = props
  return (
    <CosCheckboxGrid direction="wrap" className="col-span-3">
      <CosCheckbox
        label={'All ' + label}
        checked={isAllChecked}
        onChange={onAllAttributesChange}
      />
      {attributes.map((attribute) => (
        <CosCheckbox
          key={attribute}
          label={upperFirst(attribute)}
          checked={selectedAttributes.includes(attribute)}
          onChange={() => onAttributesChange(attribute)}
        />
      ))}
    </CosCheckboxGrid>
  )
}
