<script setup>
import { useBrandStore } from '@/stores/brands'
import { Icon } from '@iconify/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const brandsStore = useBrandStore()

onMounted(() => {
  brandsStore.fetchBrands()
})

const currentBrandIndex = ref(0)
const containerRef = ref(null)
const containerWidth = ref(window.innerWidth)

function updateContainerWidth() {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.clientWidth
  }
}

onMounted(() => {
  updateContainerWidth()
  window.addEventListener('resize', updateContainerWidth)
})

onUnmounted(() => {
  updateContainerWidth()
  window.removeEventListener('resize', updateContainerWidth)
})

const visibleBrands = computed(() => {
  if (containerWidth.value >= 1280) return 5
  if (containerWidth.value >= 768) return 3
  return 2
})

function next() {
  if (currentBrandIndex.value < brandsStore.brandData.length - visibleBrands.value)
    currentBrandIndex.value++
}
function prev() {
  if (currentBrandIndex.value > 0) currentBrandIndex.value--
}
</script>
<template>
  <div class="relative w-[90%] py-12" ref="containerRef">
    <div class="relative w-full">
      <div class="relative flex items-center w-[80%] mx-auto overflow-x-hidden">
        <div
          v-for="brand of brandsStore.brandData"
          class="flex justify-center transition duration-1000 shrink-0 w-[50%] md:w-[33%] xl:w-[20%] cursor-pointer"
          :style="{ transform: `translateX(-${currentBrandIndex * 100}%)` }"
        >
          <img
            :src="'http://localhost:3000/uploads/brands/' + brand.image"
            class="w-28 h-28 object-contain"
          />
        </div>
      </div>
    </div>
    <button
      :disabled="currentBrandIndex === 0"
      @click="prev"
      class="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-teal-600"
      :class="currentBrandIndex === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
    >
      <Icon icon="line-md:arrow-left" width="20" height="20" class="text-white" />
    </button>
    <button
      :disabled="currentBrandIndex === brandsStore.brandData.length - visibleBrands"
      @click="next"
      class="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-teal-600"
      :class="
        currentBrandIndex === brandsStore.brandData.length - visibleBrands
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer'
      "
    >
      <Icon icon="line-md:arrow-right" width="20" height="20" class="text-white" />
    </button>
  </div>
</template>
