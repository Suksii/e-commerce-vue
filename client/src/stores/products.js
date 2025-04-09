import { request } from '@/api'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useProducts = defineStore('products', () => {
  const productsData = reactive([])
  async function getProducts() {
    try {
      const { data } = await request.get('/api/products/get-products')
      productsData = data
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }
  return { getProducts, productsData }
})
