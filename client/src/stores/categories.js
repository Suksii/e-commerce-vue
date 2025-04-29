import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categoriesData = ref([])
  const singleCategoryData = ref([])

  async function fetchCategories() {
    try {
      const { data } = await request.get('/api/category/nested')
      categoriesData.value = data
    } catch (error) {
      console.error('Failed to fetch categories: ', error)
    }
  }

  async function getSingleCategory(id) {
    try {
      const { data } = await request.get('/api/category/' + id)
      singleCategoryData.value = data
    } catch (error) {
      console.error('Error fetching specific product', error)
    }
  }

  return { fetchCategories, categoriesData, getSingleCategory, singleCategoryData }
})
