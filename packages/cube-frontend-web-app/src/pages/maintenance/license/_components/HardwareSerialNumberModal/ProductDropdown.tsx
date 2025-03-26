import { CosDropdown } from '@cube-frontend/ui-library'

// TODO: extract products enum to the openAPI docs.
export type ProductItem = {
  name: string
}

const products = [
  { name: 'CubeCOS' },
  { name: 'CubeCMP' },
] satisfies ProductItem[]

export type ProductDropdownProps = {
  selectedProduct: ProductItem | undefined
  handleProductSelect: (products: ProductItem) => void
}

export const ProductDropdown = (props: ProductDropdownProps) => {
  const { selectedProduct, handleProductSelect } = props

  return (
    <CosDropdown
      type="regular"
      variant="default"
      selectedItems={[selectedProduct]}
    >
      <CosDropdown.Trigger placeholder="Select a Product">
        {selectedProduct ? `${selectedProduct.name}` : 'Select a Product'}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {products.map((product) => (
          <CosDropdown.Item
            key={product.name}
            item={product}
            onClick={() => handleProductSelect(product)}
          >
            {product.name}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
