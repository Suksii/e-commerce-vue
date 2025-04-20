import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const productsData = ref([])
  const singleProduct = ref({})
  const selectedImage = ref('')

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
  async function getProduct(id) {
    try {
      const { data } = await request('api/products/' + id)

      if (data.images && data.images.length > 0) {
        selectedImage.value = data.images[0]
      }
      console.log(singleProduct.value)

      singleProduct.value = data
    } catch (error) {
      console.error('Error fetching specific product', error)
    }
  }
  return { getProducts, productsData, getProduct, singleProduct, selectedImage }
})
