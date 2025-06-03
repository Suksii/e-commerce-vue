<script setup>
import ProductList from '@/components/administrator/lists/ProductList.vue'
import FilterContent from '@/components/contents/FilterContent.vue'
import Filters from '@/components/Filters.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import { usePriceRange } from '@/composables/usePriceRange'
import Loading from '@/loading/Loading.vue'
import { useProductsStore } from '@/stores/products'
import { ref, watch } from 'vue'

const showFilters = ref(false)
const { isSmallScreen } = usePriceRange()
const productsStore = useProductsStore()

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
    <div class="block md:hidden">
      <button
        @click="showFilters = true"
        class="save-button w-fit mx-auto uppercase text-sm"
      >
        Filter & Sort
      </button>
    </div>
    <Filters />
    <div class="flex gap-6 w-full">
      <FilterSidebar />
      <Loading v-if="productsStore.loading.searchProducts" />
      <ProductList v-else class="w-full" />
    </div>
  </div>
</template>
