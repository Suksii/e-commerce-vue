import { request } from '@/api'
import { useDebounce } from '@/composables/useDebounce'
import { defineStore } from 'pinia'
import { useNotificationStore } from './notification'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import qs from 'qs'

export const useProductsStore = defineStore('products', () => {
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

  const selectedSortBy = ref('name')
  const selectedOrder = ref('desc')

  const router = useRouter()
  const route = useRoute()

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
    }
  }

  async function searchProducts() {
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
      console.log('Params', params)
    } catch (error) {
      console.error(error)
    }
  }
  async function getProduct(id) {
    try {
      const { data } = await request.get('/api/products/' + id)

      if (data.images && data.images.length > 0) {
        selectedImage.value = data.images[0]
      }
      singleProduct.value = data
    } catch (error) {
      console.error('Error fetching specific product', error)
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
        (newMinPrice !== null && newMaxPrice !== null) ||
        (newSeason && newSeason.length > 0) ||
        (newGender && newGender.length > 0) ||
        newSortBy ||
        newOrder
      if (hasSearch || hasFilters) {
        const query = {
          ...(hasSearch ? { name: newSearch } : {}),
          ...(newBrands ? { brand: newBrands.map((b) => b.name) } : {}),
          ...(newCategories ? { category: newCategories.map((c) => c.name) } : {}),
          ...(newMinPrice ? { minPrice: newMinPrice } : {}),
          ...(newMaxPrice ? { maxPrice: newMaxPrice } : {}),
          ...(newSeason ? { season: newSeason } : {}),
          ...(newGender ? { gender: newGender } : {}),
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
  }
})
