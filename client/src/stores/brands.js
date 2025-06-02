import { request } from '@/api'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useNotificationStore } from './notification'

export const useBrandStore = defineStore('brands', () => {
  const notificationStore = useNotificationStore()
  const brandData = ref([])
  const singleBrand = ref([])

  const loading = reactive({
    getBrands: false,
    deleteBrand: false,
    updateBrand: false,
    addBrand: false,
  })

  async function fetchBrands() {
    loading.getBrands = true
    try {
      const { data } = await request.get('/api/brand')
      brandData.value = data
    } catch (error) {
      console.error('Error while fetching brands:', error)
    } finally {
      loading.getBrands = false
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
    loading.deleteBrand = true
    try {
      const response = await request.delete('/api/brand/delete/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(response.data?.message || 'Brand deleted successfully')
      await fetchBrands()
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification(error.response?.data?.message || 'Failed to delete brand')
      console.error(error)
    } finally {
      loading.deleteBrand = false
    }
  }
  return { fetchBrands, brandData, fetchSingleBrand, singleBrand, deleteBrand, loading }
})
