import { ChangeEvent, useState } from 'react'
import { GetLicensesProductsEnum } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'

const products = Object.values(GetLicensesProductsEnum)

export type ProductFilterProps = {
  selectedProducts: GetLicensesProductsEnum[]
  handleProductsSelect: (products: GetLicensesProductsEnum[]) => void
  handleClearProductsClick: () => void
}

export const ProductFilter = (props: ProductFilterProps) => {
  const { selectedProducts, handleProductsSelect, handleClearProductsClick } =
    props

  const [productSearchValue, setProductSearchValue] = useState('')

  const handleProductSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductSearchValue(e.target.value)
  }

  const handleProductClick = (product: GetLicensesProductsEnum) => {
    const productSet = new Set(selectedProducts)

    if (productSet.has(product)) {
      handleProductsSelect(selectedProducts.filter((p) => p !== product))
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
      <CosDropdown.Trigger placeholder="Select Products">
        {selectedProducts.length > 0 ? `Products` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {products.map((product) => {
          if (
            productSearchValue &&
            !product.toLowerCase().includes(productSearchValue.toLowerCase())
          ) {
            return null
          }
          return (
            <CosDropdown.Item
              key={product}
              item={product}
              onClick={() => handleProductClick(product)}
            >
              {product}
            </CosDropdown.Item>
          )
        })}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
