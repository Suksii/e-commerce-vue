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
  <div class="px-12">
    <h3 class="text-center text-4xl font-medium">All Brands</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
      <div
        v-for="brand in brandStore.brandData"
        :key="brand.id"
        class="flex flex-col items-center justify-center gap-2 py-2 min-w-[350px] w-[350px] bg-white rounded-md overflow-hidden hover:ring-2 hover:ring-teal-600 transition group"
      >
        <img
          :src="'http://localhost:3000/uploads/brands/' + brand.image"
          :alt="brand.name"
          class="text-center w-54 h-54 object-cover rounded-full mb-2"
        />
        <p class="text-3xl font-medium text-center">{{ brand.name }}</p>
      </div>
    </div>
  </div>
</template>
