import { request } from '@/api'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useNotificationStore } from './notification'

export const useFeaturedStore = defineStore('featured', () => {
  const featuredData = ref([])
  const singleFeatured = ref([])
  const notificationStore = useNotificationStore()

  const loading = reactive({
    getFeatured: false,
    deleteFeatured: false,
    updateFeatured: false,
    addFeatured: false,
  })

  async function getFeatured() {
    loading.getFeatured = true
    try {
      const { data } = await request.get('/api/featured/')
      featuredData.value = data
    } catch (error) {
      console.error('Failed to fetch featured data: ', error)
    } finally {
      loading.getFeatured = false
    }
  }
  async function getSingleFeatured(id) {
    try {
      const { data } = await request.get('/api/featured/' + id)
      singleFeatured.value = data
    } catch (error) {
      console.log('Error fetching single featured:', error)
    }
  }

  const deleteFeatured = async (id) => {
    loading.deleteFeatured = true
    try {
      const response = await request.delete('/api/featured/delete/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(response.data?.message || 'Featured deleted successfully')
      await getFeatured()
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification(
        error.response?.data?.message || 'Failed to delete featured',
      )
      console.error(error)
    } finally {
      loading.deleteFeatured = false
    }
  }

  return { getFeatured, featuredData, getSingleFeatured, singleFeatured, deleteFeatured, loading }
})
