import { request } from '@/api'
import { useDebounce } from '@/composables/useDebounce'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import qs from 'qs'

export const useProductsStore = defineStore('products', () => {
  const productsData = ref([])
  const singleProduct = ref({})
  const selectedImage = ref('')
  const selectedBrands = ref([])
  const selectedCategories = ref([])
  const searchQuery = ref('')
  const router = useRouter()
  const route = useRoute()

  const debouncedSearch = useDebounce(searchQuery, 1000)
  const debouncedCategories = useDebounce(selectedCategories, 1000)
  const debouncedBrands = useDebounce(selectedBrands, 1000)

  async function getProducts(sortBy = 'name', order = 'desc') {
    try {
      const { data } = await request.get('/api/products', {
        params: {
          sortBy,
          order,
        },
      })
      productsData.value = data
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
    }

    try {
      const { data } = await request.get('/api/products/search', {
        params,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      })
      productsData.value = data
      console.log('Params', params)
      console.log('Selected', selectedBrands.value)
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
    [debouncedSearch, debouncedBrands, debouncedCategories],
    async ([newSearch, newBrands, newCategories]) => {
      const hasSearch = newSearch && newSearch.length >= 2
      const hasFilters = newBrands || newCategories

      if (hasSearch || hasFilters) {
        const query = {
          ...(hasSearch ? { name: newSearch } : {}),
          ...(newBrands ? { brand: newBrands.map((b) => b.name) } : {}),
          ...(newCategories ? { category: newCategories.map((c) => c.name) } : {}),
        }

        await searchProducts()

        if (JSON.stringify(route.query) !== JSON.stringify(query)) {
          router.push({ name: 'allProducts', query })
        }
      } else {
        await getProducts()
        if (Object.keys(route.query).length > 0) {
          router.push({ name: 'allProducts', query: {} })
        }
      }
    },
    { immediate: true },
  )

  return {
    getProducts,
    productsData,
    getProduct,
    singleProduct,
    selectedImage,
    searchProducts,
    debouncedSearch,
    searchQuery,
    selectedBrands,
    selectedCategories,
  }
})
