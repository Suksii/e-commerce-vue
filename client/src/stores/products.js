import { request } from '@/api'
import { useDebounce } from '@/composables/useDebounce'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import qs from 'qs'

export const useProductsStore = defineStore('products', () => {
  const productsData = ref([])
  const allProductsData = ref([])
  const singleProduct = ref({})
  const selectedImage = ref('')
  const selectedBrands = ref([])
  const selectedCategories = ref([])
  const searchQuery = ref('')
  const selectedMin = ref(null)
  const selectedMax = ref(null)

  const router = useRouter()
  const route = useRoute()

  const debouncedSearch = useDebounce(searchQuery, 1000)
  const debouncedCategories = useDebounce(selectedCategories, 1000)
  const debouncedBrands = useDebounce(selectedBrands, 1000)
  const debouncedMinPrice = useDebounce(selectedMin, 1000)
  const debouncedMaxPrice = useDebounce(selectedMax, 1000)

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
    [debouncedSearch, debouncedBrands, debouncedCategories, debouncedMinPrice, debouncedMaxPrice],
    async ([newSearch, newBrands, newCategories, newMinPrice, newMaxPrice]) => {
      const hasSearch = newSearch && newSearch.length >= 2
      const hasFilters =
        (newBrands && newBrands.length > 0) ||
        (newCategories && newCategories.length > 0) ||
        (newMinPrice !== null && newMaxPrice !== null)

      if (hasSearch || hasFilters) {
        const query = {
          ...(hasSearch ? { name: newSearch } : {}),
          ...(newBrands ? { brand: newBrands.map((b) => b.name) } : {}),
          ...(newCategories ? { category: newCategories.map((c) => c.name) } : {}),
          ...(newMinPrice ? { minPrice: newMinPrice } : {}),
          ...(newMaxPrice ? { maxPrice: newMaxPrice } : {}),
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
    selectedMin,
    selectedMax,
  }
})
