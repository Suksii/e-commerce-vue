<script setup>
import CardList from '@/components/CardList.vue'
import FilterContent from '@/components/FilterContent.vue'
import Filters from '@/components/Filters.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import { useProductsStore } from '@/stores/products'
import { ref } from 'vue'

const productsStore = useProductsStore()
const showFilters = ref(false)
</script>

<template>
  <div class="flex flex-col gap-4 py-20 w-full relative">
    <FilterContent v-model:showFilters="showFilters" />
    <button
      @click="showFilters = true"
      class="block md:hidden save-button w-fit mx-auto uppercase text-sm"
    >
      Filter & Sort
    </button>
    <Filters />
    <div class="flex gap-6 w-full">
      <FilterSidebar />
      <CardList :data="productsStore.productsData" class="w-full" />
    </div>
  </div>
</template>
