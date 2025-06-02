import { request } from '@/api'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useNotificationStore } from './notification'

export const useCartStore = defineStore('carts', () => {
  const carts = reactive([])
  const notificationStore = useNotificationStore()

  const loadingCart = ref(null)

  async function addCart(id, quantity) {
    loadingCart.value = id
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
    } finally {
      loadingCart.value = null
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
  async function deleteCart(id) {
    try {
      const response = await request.delete('/api/cart/delete-cart/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(response.data?.message)
      await getCarts()
    } catch (error) {
      console.error('Error while removing the cart:', error)
      notificationStore.isError = true
      notificationStore.showNotification(error.response?.message || 'Error while removing the cart')
    }
  }
  async function updateQuantity(id, type) {
    try {
      await request.patch('/api/cart/update-cart/' + id, { type })
      await getCarts()
    } catch (error) {
      console.error('Error updating cart quantity:', error)
    }
  }

  return { addCart, getCarts, deleteCart, updateQuantity, carts, loadingCart }
})
