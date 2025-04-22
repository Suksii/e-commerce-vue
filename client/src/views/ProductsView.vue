<script setup>
import { request } from '@/api'
import CardList from '@/components/CardList.vue'
import { useDebounce } from '@/composables/useDebounce'
import { useProductsStore } from '@/stores/products'
import { onMounted, ref, watch } from 'vue'

const productsStore = useProductsStore()

const searchQuery = ref('')

const debouncedValue = useDebounce(searchQuery, 3000)

async function searchProducts() {
  try {
    const { data } = await request.get('/api/products/search', {
      params: {
        name: debouncedValue.value,
      },
    })
    productsStore.productsData = data
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  productsStore.getProducts()
})
watch(debouncedValue, (newVal) => {
  if (newVal.length >= 2) {
    searchProducts()
  } else {
    productsStore.getProducts()
  }
})
</script>

<template>
  <div class="py-20">
    <input placeholder="search" v-model="searchQuery" class="custom-input py-2 px-4 min-w-92" />
    <CardList :data="productsStore.productsData" />
  </div>
</template>
