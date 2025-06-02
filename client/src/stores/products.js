import qs from 'qs'
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { request } from '@/api'
import { useDebounce } from '@/composables/useDebounce'
import { useNotificationStore } from './notification'
import { usePriceRange } from '@/composables/usePriceRange'

export const useProductsStore = defineStore('products', () => {
  const router = useRouter()
  const route = useRoute()

  const { minPrice, maxPrice } = usePriceRange()

  const notificationStore = useNotificationStore()

  const productsData = ref([])
  const allProductsData = ref([])
  const singleProduct = ref({})
  const selectedImage = ref('')
  const selectedBrands = ref([])
  const selectedCategories = ref([])
  const selectedSeason = ref([])
  const selectedGender = ref([])
  const searchQuery = ref('')
  const selectedMin = ref(null)
  const selectedMax = ref(null)
  const genderOptions = ref([])
  const seasonOptions = ref([])

  const loading = reactive({
    getProducts: false,
    searchProducts: false,
    deleteProduct: false,
    getProduct: false,
    updateProduct: false,
    addProduct: false,
  })

  const selectedSortBy = ref('name')
  const selectedOrder = ref('desc')

  const debouncedSearch = useDebounce(searchQuery, 1000)
  const debouncedCategories = useDebounce(selectedCategories, 1000)
  const debouncedBrands = useDebounce(selectedBrands, 1000)
  const debouncedMinPrice = useDebounce(selectedMin, 1000)
  const debouncedMaxPrice = useDebounce(selectedMax, 1000)
  const debouncedGender = useDebounce(selectedGender, 1000)
  const debouncedSeason = useDebounce(selectedSeason, 1000)

  const fetchProductOptions = async () => {
    try {
      const { data } = await request.get('/api/products/options')
      genderOptions.value = data.gender
      seasonOptions.value = data.season
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification('Error while fetching data')
      console.error('Error while fetching data:', error)
    }
  }

  async function getProducts(sortBy = 'name', order = 'desc') {
    loading.getProducts = true
    try {
      const { data } = await request.get('/api/products', {
        params: {
          sortBy,
          order,
        },
      })
      productsData.value = data
      allProductsData.value = [...data]
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      loading.getProducts = false
    }
  }

  async function searchProducts() {
    loading.searchProducts = true
    const params = {
      name: debouncedSearch.value || undefined,
      brand: selectedBrands.value?.length ? selectedBrands.value.map((b) => b._id) : undefined,
      category: selectedCategories.value?.length
        ? selectedCategories.value.map((c) => c._id)
        : undefined,
      minPrice: selectedMin.value,
      maxPrice: selectedMax.value,
      season: selectedSeason.value,
      gender: selectedGender.value,
      sortBy: selectedSortBy.value,
      order: selectedOrder.value,
    }

    try {
      const { data } = await request.get('/api/products/search', {
        params,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      })

      productsData.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.searchProducts = false
    }
  }
  async function getProduct(id) {
    loading.getProduct = true
    try {
      const { data } = await request.get('/api/products/' + id)

      if (data.images && data.images.length > 0) {
        selectedImage.value = data.images[0]
      }
      singleProduct.value = data
    } catch (error) {
      console.error('Error fetching specific product', error)
    } finally {
      loading.getProduct = false
    }
  }

  async function deleteProduct(id) {
    loading.deleteProduct = true
    try {
      const response = await request.delete('/api/products/delete/' + id)
      notificationStore.isError = false
      notificationStore.showNotification(response.data.message || 'Product successfully deleted')
      await getProducts(selectedSortBy.value, selectedOrder.value)
    } catch (error) {
      console.error('Failed to delete product:', error)
      notificationStore.isError = true
      notificationStore.showNotification(error.response?.message || 'Failed to delete product')
    } finally {
      loading.deleteProduct = false
    }
  }

  watch(
    [
      debouncedSearch,
      debouncedBrands,
      debouncedCategories,
      debouncedMinPrice,
      debouncedMaxPrice,
      debouncedGender,
      debouncedSeason,
      selectedSortBy,
      selectedOrder,
    ],
    async ([
      newSearch,
      newBrands,
      newCategories,
      newMinPrice,
      newMaxPrice,
      newGender,
      newSeason,
      newSortBy,
      newOrder,
    ]) => {
      if (route.name !== 'allProducts') return

      const hasSearch = newSearch && newSearch.length >= 2
      const hasFilters =
        (newBrands && newBrands.length > 0) ||
        (newCategories && newCategories.length > 0) ||
        newMinPrice !== minPrice.value ||
        newMaxPrice !== maxPrice.value ||
        (newSeason && newSeason.length > 0) ||
        (newGender && newGender.length > 0) ||
        newSortBy ||
        newOrder
      if (hasSearch || hasFilters) {
        const query = {
          ...(hasSearch ? { name: newSearch } : {}),
          ...(newBrands ? { brand: newBrands.map((b) => b.name) } : {}),
          ...(newCategories ? { category: newCategories.map((c) => c.name) } : {}),
          ...(newMinPrice !== minPrice.value ? { minPrice: newMinPrice } : {}),
          ...(newMaxPrice !== maxPrice.value ? { maxPrice: newMaxPrice } : {}),
          ...(newSeason ? { season: newSeason } : {}),
          ...(newGender ? { gender: newGender } : {}),
          ...(newSortBy ? { sortBy: newSortBy } : {}),
          ...(newOrder ? { order: newOrder } : {}),
        }

        if (JSON.stringify(route.query) !== JSON.stringify(query)) {
          await router.push({ name: 'allProducts', query })
        }
        await searchProducts()
      } else {
        await getProducts()
        if (Object.keys(route.query).length > 0) {
          await router.push({ name: 'allProducts', query: {} })
        }
      }
    },
    { immediate: true },
  )

  return {
    getProducts,
    productsData,
    allProductsData,
    getProduct,
    deleteProduct,
    singleProduct,
    selectedImage,
    searchProducts,
    debouncedSearch,
    searchQuery,
    selectedBrands,
    selectedCategories,
    selectedSeason,
    selectedGender,
    selectedMin,
    selectedMax,
    fetchProductOptions,
    genderOptions,
    seasonOptions,
    selectedSortBy,
    selectedOrder,
    loading,
  }
})
