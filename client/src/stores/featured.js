import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotificationStore } from './notification'

export const useFeaturedStore = defineStore('featured', () => {
  const featuredData = ref([])
  const singleFeatured = ref([])
  const notificationStore = useNotificationStore()

  async function getFeatured() {
    try {
      const { data } = await request.get('/api/featured/')
      featuredData.value = data
    } catch (error) {
      console.error('Failed to fetch featured data: ', error)
    }
  }
  async function getSingleFeatured(id) {
    try {
      const { data } = await request.get('/api/featured/' + id)
      singleFeatured.value = data
    } catch (error) {}
  }

  const deleteFeatured = async (id) => {
    try {
      const response = await request.delete('/api/featured/delete/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(response.data?.message || 'Featured deleted successfully')
      getFeatured()
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification(
        error.response?.data?.message || 'Failed to delete featured',
      )
      console.error(error)
    }
  }

  return { getFeatured, featuredData, getSingleFeatured, singleFeatured, deleteFeatured }
})
