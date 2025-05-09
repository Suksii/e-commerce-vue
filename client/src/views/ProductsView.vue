<script setup>
import CardList from '@/components/CardList.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
</script>

<template>
  <div class="flex gap-6 py-20">
    <FilterSidebar />
    <CardList :data="productsStore.productsData" />
  </div>
</template>
