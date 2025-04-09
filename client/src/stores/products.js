import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const productsData = ref([])
  async function getProducts() {
    try {
      const { data } = await request.get('/api/products')
      productsData.value = data
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }
  return { getProducts, productsData }
})
