<script setup>
import { onMounted } from 'vue'
import { useFeaturedStore } from '@/stores/featured'
import FeaturedCard from '@/components/cards/FeaturedCard.vue'

const featuredStore = useFeaturedStore()

onMounted(() => {
  featuredStore.getFeatured()
})
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto">
    <h3 class="text-center text-3xl font-medium py-4">All Featured</h3>
    <div class="flex flex-wrap justify-center gap-6">
      <FeaturedCard
        v-for="featured in featuredStore.featuredData"
        v-if="featuredStore.featuredData.length"
        :key="featured._id"
        :featured="featured"
        @delete="featuredStore.deleteFeatured"
      />
      <div v-else class="text-2xl font-medium tracking-wide text-gray-500 py-12">No data to display</div>
    </div>
  </div>
</template>
