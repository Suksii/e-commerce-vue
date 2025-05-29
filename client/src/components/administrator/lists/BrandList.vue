<script setup>
import BrandCard from '@/components/cards/BrandCard.vue'
import { useBrandStore } from '@/stores/brands'
import { onMounted } from 'vue'

const brandStore = useBrandStore()

onMounted(() => {
  brandStore.fetchBrands()
})
</script>

<template>
  <div class="px-12">
    <h3 class="text-center text-3xl font-medium">All Brands</h3>
    <div class="flex flex-wrap justify-center gap-6 p-8">
      <BrandCard
        v-for="brand in brandStore.brandData"
        :key="brand._id"
        :brand="brand"
        @delete="brandStore.deleteBrand"
      />
    </div>
  </div>
</template>
