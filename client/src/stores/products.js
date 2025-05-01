import { request } from '@/api'
import { useDebounce } from '@/composables/useDebounce'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const productsData = ref([])
  const singleProduct = ref({})
  const selectedImage = ref('')
  const searchQuery = ref('')

  const debouncedValue = useDebounce(searchQuery, 1000)

  async function getProducts(sortBy = 'name', order = 'desc') {
    try {
      const { data } = await request.get('/api/products', {
        params: { sortBy, order },
      })
      productsData.value = data
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  async function searchProducts() {
    try {
      const { data } = await request.get('/api/products/search', {
        params: {
          name: debouncedValue.value,
        },
      })
      productsData.value = data
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  async function getProduct(id) {
    try {
      const { data } = await request.get('/api/products/' + id)

      if (data.images && data.images.length > 0) {
        selectedImage.value = data.images[0]
      }
      singleProduct.value = data
    } catch (error) {
      console.error('Error fetching specific product', error)
    }
  }
  return {
    getProducts,
    productsData,
    getProduct,
    singleProduct,
    selectedImage,
    searchProducts,
    debouncedValue,
    searchQuery,
  }
})
