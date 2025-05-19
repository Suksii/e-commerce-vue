<script setup>
import { useProductsStore } from '@/stores/products'
import CustomRadio from './CustomRadio.vue'
import { ref, watch } from 'vue'

const productsStore = useProductsStore()

const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
  { value: 'gender-desc', label: 'Gender: Z-A' },
  { value: 'gender-asc', label: 'Gender: A-Z' },
  { value: 'season-desc', label: 'Season: Z-A' },
  { value: 'season-asc', label: 'Season: A-Z' },
]
const sortValue = ref(`${productsStore.selectedSortBy}-${productsStore.selectedOrder}`)

watch(sortValue, (newValue) => {
  const [sortBy, order] = newValue.split('-')
  productsStore.selectedSortBy = sortBy
  productsStore.selectedOrder = order
})
</script>

<template>
  <div class="flex flex-col gap-4 w-full rounded-md">
    <CustomRadio
      v-for="option in sortOptions"
      :label="option.label"
      :value="option.value"
      v-model="sortValue"
    />
  </div>
</template>
