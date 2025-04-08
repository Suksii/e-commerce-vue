import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotificationStore } from './notification'

export const useCartStore = defineStore('carts', () => {
  const carts = ref([])
  const notificationStore = useNotificationStore()

  async function addCart(id) {
    try {
      const response = await request.post('/api/cart/add-cart/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(
        response.data.message || 'Product successfully added to cart..',
      )
    } catch (error) {
      notificationStore.isError = false
      notificationStore.showNotification(error.response.data.message)
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
