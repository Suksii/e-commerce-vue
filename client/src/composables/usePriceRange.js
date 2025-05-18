import { useProductsStore } from '@/stores/products'
import { computed } from 'vue'

export const usePricePrange = () => {
  const productsStore = useProductsStore()

  const minPrice = computed(() => {
    if (productsStore.allProductsData.length === 0) return 0
    return Math.floor(Math.min(...productsStore.allProductsData.map((product) => product.price)))
  })

  const maxPrice = computed(() => {
    if (productsStore.allProductsData.length === 0) return 300
    return Math.ceil(Math.max(...productsStore.allProductsData.map((product) => product.price)))
  })

  const rangeBackground = computed(() => {
    const min = minPrice.value
    const max = maxPrice.value
    const range = max - min || 1
    const minValue = ((productsStore.selectedMin - min) / range) * 100
    const maxValue = ((productsStore.selectedMax - min) / range) * 100
    return {
      background: `linear-gradient(to right, #e5e7eb ${minValue}% , #14b8a6 ${minValue}%, #14b8a6 ${maxValue}%, #e5e7eb ${maxValue}%)`,
    }
  })

  return {
    minPrice,
    maxPrice,
    rangeBackground,
  }
}
