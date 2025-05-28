import { request } from '@/api'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useNotificationStore } from './notification'

export const useCategoryStore = defineStore('category', () => {
  const notificationStore = useNotificationStore()
  const categoriesData = ref([])
  const singleCategoryData = ref([])
  const childCategoriesData = ref([])
  const categoryData = reactive({
    slug: '',
    image: '',
    parentCategory: [],
    selectedCategory: '',
  })

  async function fetchCategories() {
    try {
      const { data } = await request.get('/api/category/nested')
      categoriesData.value = data
    } catch (error) {
      console.error('Failed to fetch categories: ', error)
    }
  }
  async function getChildCategories() {
    try {
      const { data } = await request.get('/api/category/child')
      childCategoriesData.value = data
    } catch (error) {
      console.error('Error fetching child categories:', error)
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

  async function fetchParentCategories() {
    try {
      const { data } = await request.get('/api/category/parent')
      categoryData.parentCategory = data.map((category) => ({
        name: category.name,
        _id: category._id,
      }))
      console.log(categoriesData.parentCategory)
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification('Error while fetching data')
      console.error('Error while fetching data:', error)
    }
  }

  async function deleteCategory(id) {
    try {
      const response = await request.delete('/api/category/delete/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(response.data.message || 'Category deleted successfully')
      await fetchCategories()
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
      console.error(error)
    }
  }

  return {
    fetchCategories,
    categoriesData,
    getChildCategories,
    childCategoriesData,
    getSingleCategory,
    singleCategoryData,
    categoryData,
    fetchParentCategories,
    deleteCategory,
  }
})
