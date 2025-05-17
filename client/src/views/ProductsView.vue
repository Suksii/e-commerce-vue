<script setup>
import CardList from '@/components/CardList.vue'
import Filters from '@/components/Filters.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
</script>

<template>
  <div class="flex flex-col gap-12 py-20 w-full">
    <Filters />
    <div class="flex gap-6 w-full">
      <FilterSidebar />
      <CardList :data="productsStore.productsData" class="w-full" />
    </div>
  </div>
</template>
