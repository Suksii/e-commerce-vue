<script setup>
import CardList from '@/components/CardList.vue'
import { useProductsStore } from '@/stores/products'
import { onMounted, watch } from 'vue'

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.getProducts()
})
watch(() => productsStore.debouncedValue, (newVal) => {
  if (newVal.length >= 2) {
    productsStore.searchProducts()
  } else {
    productsStore.getProducts()
  }
})
</script>

<template>
  <div class="py-20">
    <input
      placeholder="search"
      v-model="productsStore.searchQuery"
      class="custom-input py-2 px-4 min-w-96"
    />
    <CardList :data="productsStore.productsData" />
  </div>
</template>
