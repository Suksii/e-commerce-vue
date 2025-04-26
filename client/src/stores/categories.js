import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categoriesData = ref([])

  async function fetchCategories() {
    try {
      const { data } = await request.get('/api/category/nested')
      console.log(data)

      categoriesData.value = data
    } catch (error) {
      console.error('Failed to fetch categories: ', error)
    }
  }
  return { fetchCategories, categoriesData }
})
