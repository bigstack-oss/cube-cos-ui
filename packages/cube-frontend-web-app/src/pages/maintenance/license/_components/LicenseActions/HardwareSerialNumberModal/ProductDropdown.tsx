import { GetNodesProductsEnum } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'

export type ProductDropdownProps = {
  selectedProduct: GetNodesProductsEnum | undefined
  handleProductSelect: (products: GetNodesProductsEnum) => void
}

export const ProductDropdown = (props: ProductDropdownProps) => {
  const { selectedProduct, handleProductSelect } = props

  return (
    <CosDropdown
      type="regular"
      variant="default"
      selectedItems={[selectedProduct]}
    >
      <CosDropdown.Trigger placeholder="Product">
        {selectedProduct ? `${selectedProduct}` : 'Select a Product'}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {Object.values(GetNodesProductsEnum).map((product) => (
          <CosDropdown.Item
            key={product}
            item={product}
            onClick={() => handleProductSelect(product)}
          >
            {product}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
