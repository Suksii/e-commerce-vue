import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBrandStore = defineStore('brands', () => {
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
      const { data } = await request.get('/api/brand' + id)
      singleBrand.value = data
    } catch (error) {
      console.error('Error fetching specific brand', error)
    }
  }

  return { fetchBrands, brandData, fetchSingleBrand }
})
