<script setup>
import { useFeaturedStore } from '@/stores/featured'
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const featuredStore = useFeaturedStore()
const currentIndex = ref(0)
let interval

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
  clearInterval(interval)
  interval = setInterval(() => {
    next()
  }, 5000)
}

watch(currentIndex, () => {
  slideNext()
})

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
        class="flex transition-transform duration-500 ease-in-out"
        :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${featuredStore.featuredData.length * 100}%`,
        }"
      >
        <div
          v-for="featured in featuredStore.featuredData"
          :key="featured._id"
          class="flex items-center w-full max-h-[75vh] aspect-video relative shrink-0"
        >
          <div
            v-if="
              (featured.title && featured.title.length > 0) ||
              (featured.description && featured.description.length > 0)
            "
            class="flex items-center justify-center flex-1 h-full bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center h-fit">
              <h2 class="text-2xl font-medium">{{ featured.title }}</h2>
              <p>{{ featured.description }}</p>
            </div>
          </div>
          <div class="flex-2 w-full h-full">
            <img
              :src="featured.image"
              :alt="featured.name"
              loading="lazy"
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute top-1/2 -translate-y-1/2 right-0 p-12 flex flex-col">
      <button
        v-for="(_, index) in featuredStore.featuredData"
        :key="index"
        @click="currentIndex = index"
        class="cursor-pointer"
      >
        <Icon
          icon="pepicons-pop:line-x"
          width="30"
          height="30"
          class="transition duration-300"
          :class="currentIndex === index ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'"
        />
      </button>
    </div>
  </div>
</template>
