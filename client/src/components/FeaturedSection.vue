<script setup>
import { useFeaturedStore } from '@/stores/featured'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

const featuredStore = useFeaturedStore()
const currentIndex = ref(0)

const next = () => {
  if (currentIndex.value === featuredStore.featuredData.length - 1) {
    currentIndex.value = 0
  } else currentIndex.value += 1
}
const prev = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = featuredStore.featuredData.length - 1
  } else currentIndex.value -= 1
}

const slideNext = () => {
  const interval = setInterval(() => {
    next()
  }, 5000)
}

onMounted(async () => {
  await featuredStore.getFeatured()
  slideNext()
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="relative w-full">
    <div class="flex w-full overflow-hidden relative">
      <div
        v-for="featured of featuredStore.featuredData"
        class="flex items-center w-full h-[500px] relative shrink-0 transition duration-300"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div class="flex items-center justify-center flex-1">
          <div class="flex flex-col items-center justify-center">
            <h2 class="text-2xl font-medium">{{ featured.title }}</h2>
            <p class="">{{ featured.description }}</p>
          </div>
        </div>
        <div class="flex-2">
          <img
            :src="'http://localhost:3000/uploads/featured/' + featured.image"
            :alt="featured.name"
            class="text-center w-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
