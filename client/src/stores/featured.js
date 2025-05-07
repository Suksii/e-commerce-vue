import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFeaturedStore = defineStore('featured', () => {
  const featuredData = ref([])
  const singleFeatured = ref([])

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
      const { data } = await request.get('/api//featured/' + id)
      singleFeatured.value = data
    } catch (error) {}
  }

  return { getFeatured, featuredData, getSingleFeatured, singleFeatured }
})
