import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotificationStore } from './notification'

export const useBrandStore = defineStore('brands', () => {
  const notificationStore = useNotificationStore()
  const brandData = ref([])
  const singleBrand = ref([])

  async function fetchBrands() {
    try {
      const { data } = await request.get('/api/brand')
      brandData.value = data
    } catch (error) {
      console.error('Error while fetching brands:', error)
    }
  }

  async function fetchSingleBrand(id) {
    try {
      const { data } = await request.get('/api/brand/' + id)
      singleBrand.value = data
    } catch (error) {
      console.error('Error fetching specific brand', error)
    }
  }

  async function deleteBrand(id) {
    try {
      const response = await request.delete('/api/brand/delete/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(response.data?.message || 'Brand deleted successfully')
      await fetchBrands()
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification(error.response?.data?.message || 'Failed to delete brand')
      console.error(error)
    }
  }
  return { fetchBrands, brandData, fetchSingleBrand, singleBrand, deleteBrand }
})
