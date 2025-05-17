import { useProductsStore } from '@/stores/products'

export const useValidation = () => {
  const productsStore = useProductsStore()

  const validateMin = (e) => {
    const value = +e.target.value
    if (value + 10 <= productsStore.selectedMax) {
      productsStore.selectedMin = value
    } else {
      productsStore.selectedMin = productsStore.selectedMax - 10
    }
  }
  const validateMax = (e) => {
    const value = +e.target.value
    if (value - 10 >= productsStore.selectedMin) {
      productsStore.selectedMax = value
    } else {
      productsStore.selectedMax = productsStore.selectedMin + 10
    }
  }
  return { validateMin, validateMax }
}
