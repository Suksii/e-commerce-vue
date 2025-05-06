import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFeaturedStore = defineStore('featured', () => {
  const featuredData = ref([])

  async function getFeatured() {
    try {
      const { data } = await request.get('/api/featured/')
      featuredData.value = data
    } catch (error) {
      console.error('Failed to fetch featured data: ', error)
    }
  }

  return { getFeatured, featuredData }
})
