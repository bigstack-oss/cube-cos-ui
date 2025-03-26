import { CosDropdown } from '@cube-frontend/ui-library'
import { ChangeEvent, useState } from 'react'

// TODO: extract products enum to the openAPI docs.
export type ProductItem = {
  name: string
}

const products = [
  { name: 'CubeCOS' },
  { name: 'CubeCMP' },
] satisfies ProductItem[]

export type ProductFilterProps = {
  selectedProducts: ProductItem[]
  handleProductsSelect: (products: ProductItem[]) => void
  handleClearProductsClick: () => void
}

export const ProductFilter = (props: ProductFilterProps) => {
  const { selectedProducts, handleProductsSelect, handleClearProductsClick } =
    props

  const [productSearchValue, setProductSearchValue] = useState('')

  const handleProductSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductSearchValue(e.target.value)
  }

  const handleProductClick = (product: ProductItem) => {
    const productSet = new Set(selectedProducts.map((f) => f.name))

    if (productSet.has(product.name)) {
      handleProductsSelect(
        selectedProducts.filter((p) => p.name !== product.name),
      )
    } else {
      handleProductsSelect([...selectedProducts, product])
    }
  }

  const handleSelectAllProduct = (checked: boolean) => {
    if (checked) {
      handleProductsSelect(products)
    } else {
      handleProductsSelect([])
    }
  }

  return (
    <CosDropdown
      type="search-checkbox"
      variant="default"
      selectedItems={selectedProducts}
      searchValue={productSearchValue}
      onSearchChange={handleProductSearchChange}
      onAllCheckChange={handleSelectAllProduct}
      onClearClick={handleClearProductsClick}
    >
      <CosDropdown.Trigger placeholder="Select a Product">
        {selectedProducts.length > 0 ? `Products` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {products.map((product) => {
          if (
            productSearchValue &&
            !product.name
              .toLowerCase()
              .includes(productSearchValue.toLowerCase())
          ) {
            return null
          }
          return (
            <CosDropdown.Item
              key={product.name}
              item={product}
              onClick={() => handleProductClick(product)}
            >
              {product.name}
            </CosDropdown.Item>
          )
        })}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
