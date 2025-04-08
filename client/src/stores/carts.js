import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('carts', () => {
  const carts = ref([])

  async function addCart(id) {
    try {
      await request.post('/api/cart/add-cart/' + id)
    } catch (error) {
      console.error('Error while adding product to cart:', error)
    }
  }
  async function getCarts() {
    try {
      const { data } = await request.get('api/cart/carts')
      carts.value = data
      console.log('Carts', carts.value)
    } catch (error) {
      console.error('Error while fetching carts:', error)
    }
  }
  return { addCart, getCarts, carts }
})
