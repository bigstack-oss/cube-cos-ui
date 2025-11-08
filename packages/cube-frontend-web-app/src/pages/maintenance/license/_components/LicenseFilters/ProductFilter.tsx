import { useTranslation } from 'react-i18next'
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

  const { t } = useTranslation()

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
      size="sm"
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedProducts}
      onAllCheckChange={handleSelectAllProduct}
      onClearSelection={handleClearProductsClick}
    >
      <CosDropdown.Trigger placeholder={t('maintenance.license.products')}>
        {selectedProducts.length > 0
          ? t('maintenance.license.products')
          : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {products.map((product) => (
          <CosDropdown.Item
            key={product}
            item={product}
            onClick={() => handleProductClick(product)}
          >
            {product}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
