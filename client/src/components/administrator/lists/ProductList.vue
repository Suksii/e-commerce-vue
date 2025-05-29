<script setup>
import ProductCard from '@/components/cards/ProductCard.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
</script>

<template>
  <div class="flex justify-center h-fit flex-wrap gap-4">
    <ProductCard
      v-for="product in productsStore.productsData"
      v-if="productsStore.productsData.length"
      :key="product._id"
      :product="product"
      class="flex justify-center gap-4"
    />
    <div v-else class="py-12 text-2xl font-medium tracking-wide text-gray-500">
      No data to display
    </div>
  </div>
</template>
