<script setup>
import { onMounted } from 'vue'
import { useFeaturedStore } from '@/stores/featured'
import FeaturedCard from '@/components/cards/FeaturedCard.vue'
import Loading from '@/loading/Loading.vue'

const featuredStore = useFeaturedStore()

onMounted(() => {
  featuredStore.getFeatured()
})
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto">
    <h3 class="text-center text-3xl font-medium py-4">All Featured</h3>
    <div v-if="featuredStore.featuredData.length" class="flex flex-wrap justify-center gap-6">
      <Loading v-if="featuredStore.loading.getFeatured" />
      <FeaturedCard
        v-else
        v-for="featured in featuredStore.featuredData"
        :key="featured._id"
        :featured="featured"
        @delete="featuredStore.deleteFeatured"
        :loading="featuredStore.loading.deleteFeatured"
      />
    </div>
    <div v-else class="flex justify-center text-2xl font-medium tracking-wide text-gray-500 py-12">
      No data to display
    </div>
  </div>
</template>
