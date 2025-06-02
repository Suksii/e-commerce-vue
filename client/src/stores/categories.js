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

  const loading = reactive({
    fetchCategories: false,
    getChildCategories: false,
    deleteCategory: false,
    updateCategory: false,
    addCategory: false,
  })

  async function fetchCategories() {
    loading.fetchCategories = true
    try {
      const { data } = await request.get('/api/category/nested')
      categoriesData.value = data
    } catch (error) {
      console.error('Failed to fetch categories: ', error)
    } finally {
      loading.fetchCategories = false
    }
  }
  async function getChildCategories() {
    loading.getChildCategories = true
    try {
      const { data } = await request.get('/api/category/child')
      childCategoriesData.value = data
    } catch (error) {
      console.error('Error fetching child categories:', error)
    } finally {
      loading.getChildCategories = false
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
    } finally {
    }
  }

  async function deleteCategory(id) {
    loading.deleteCategory = true
    try {
      const response = await request.delete('/api/category/delete/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(response.data.message || 'Category deleted successfully')
      await fetchCategories()
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
      console.error(error)
    } finally {
      loading.deleteCategory = false
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
    loading,
  }
})
