<script setup>
import BrandCard from '@/components/cards/BrandCard.vue'
import Loading from '@/loading/Loading.vue'
import { useBrandStore } from '@/stores/brands'
import { onMounted } from 'vue'

const brandStore = useBrandStore()

onMounted(async () => {
  await brandStore.fetchBrands()
})
</script>

<template>
  <div class="px-12">
    <h3 class="text-center text-3xl font-medium">All Brands</h3>
    <div v-if="brandStore.brandData.length" class="flex flex-wrap justify-center gap-6 p-8">
      <Loading v-if="brandStore.loading.getBrands" />
      <BrandCard
        v-else
        v-for="brand in brandStore.brandData"
        :key="brand._id"
        :brand="brand"
        @delete="brandStore.deleteBrand"
        :loading="brandStore.loading.deleteBrand"
      />
    </div>
    <div
      v-else
      class="flex justify-center items-center py-12 text-2xl font-medium tracking-wide text-gray-500"
    >
      No data to display
    </div>
  </div>
</template>
