<script setup>
import ProductList from '@/components/administrator/lists/ProductList.vue'
import FilterContent from '@/components/FilterContent.vue'
import Filters from '@/components/Filters.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import { usePriceRange } from '@/composables/usePriceRange'
import { useProductsStore } from '@/stores/products'
import { ref, watch } from 'vue'

const showFilters = ref(false)
const { isSmallScreen } = usePriceRange()

watch(showFilters, (show) => {
  if (show) {
    document.body.classList.add('overflow-y-hidden')
  } else {
    document.body.classList.remove('overflow-y-hidden')
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 py-6 w-full relative">
    <div v-if="isSmallScreen">
      <FilterContent v-model:showFilters="showFilters" />
    </div>
    <button
      @click="showFilters = true"
      class="block md:hidden save-button w-fit mx-auto uppercase text-sm"
    >
      Filter & Sort
    </button>
    <Filters />
    <div class="flex gap-6 w-full">
      <FilterSidebar />
      <ProductList class="w-full" />
    </div>
  </div>
</template>
