import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBrandStore = defineStore('brands', () => {
  const brandData = ref([])

  async function fetchBrands() {
    try {
      const { data } = await request.get('/api/brand')
      brandData.value = data
    } catch (error) {
      console.error('Error while fetching brands:', error)
    }
  }
  return { fetchBrands, brandData }
})
