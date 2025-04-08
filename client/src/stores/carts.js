import { request } from '@/api'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('carts', () => {
  async function addCart(id) {
    try {
      const response = await request.post('/api/cart/add-cart/' + id)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  return { addCart }
})
