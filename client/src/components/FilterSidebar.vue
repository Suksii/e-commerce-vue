<script setup>
import { useBrandStore } from '@/stores/brands'
import { onMounted } from 'vue'

const brandStore = useBrandStore()

onMounted(() => {
  brandStore.fetchBrands()
})

console.log(brandStore.brandData)
</script>

<template>
  <div class="w-64">
    <div class="flex flex-col w-full gap-2">
      <div>
        <h3 class="text-sm font-medium uppercase border-b-2 border-teal-600 mb-2">Brands</h3>
        <div v-for="brand of brandStore.brandData" class="flex gap-2">
          <input type="checkbox" />
          <p>{{ brand.name }}</p>
        </div>
      </div>
      <div class="w-full">
        <h3 class="text-sm font-medium uppercase border-b-2 border-teal-600 mb-2">Price</h3>
        <div class="flex flex-col">
          <input type="range" class="w-full" />
          <p>32€ - 84€</p>
        </div>
      </div>
    </div>
  </div>
</template>
