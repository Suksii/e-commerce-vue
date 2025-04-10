import { request } from '@/api'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useNotificationStore } from './notification'

export const useCartStore = defineStore('carts', () => {
  const carts = reactive([])
  const notificationStore = useNotificationStore()

  async function addCart(id, quantity) {
    try {
      const response = await request.post('/api/cart/add-cart/' + id, { quantity })
      notificationStore.isError = false
      notificationStore.showNotification(
        response.data?.message || 'Product successfully added to cart..',
      )
      await getCarts()
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification(error.response?.data?.message)
      console.error('Error while adding product to cart:', error)
    }
  }
  async function getCarts() {
    try {
      const { data } = await request.get('api/cart/carts')

      carts.splice(0, carts.length, ...data)
    } catch (error) {
      console.error('Error while fetching carts:', error)
    }
  }
  return { addCart, getCarts, carts }
})
