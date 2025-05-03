<script setup>
import { useBrandStore } from '@/stores/brands'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

const brandsStore = useBrandStore()

onMounted(() => {
  brandsStore.fetchBrands()
})

const currentBrandIndex = ref(0)

function next() {
  if (currentBrandIndex.value < brandsStore.brandData.length - 5) currentBrandIndex.value++
}
function prev() {
  if (currentBrandIndex.value > 0) currentBrandIndex.value--
}
</script>
<template>
  <div class="relative w-[90%] py-12">
    <div class="relative w-full">
      <div class="relative flex items-center w-[80%] mx-auto overflow-x-hidden">
        <div
          v-for="brand of brandsStore.brandData"
          class="flex justify-center transition shrink-0 w-[50%] md:w-[20%] cursor-pointer"
          :style="{ transform: `translateX(-${currentBrandIndex * 100}%)` }"
        >
          <img
            :src="'http://localhost:3000/uploads/brands/' + brand.image"
            class="w-32 h-32 object-contain"
          />
        </div>
      </div>
    </div>
    <button
      :disabled="currentBrandIndex === 0"
      @click="prev"
      class="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-teal-600"
      :class="currentBrandIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'"
    >
      <Icon icon="line-md:arrow-left" width="24" height="24" class="text-white" />
    </button>
    <button
      :disabled="currentBrandIndex === brandsStore.brandData.length - 5"
      @click="next"
      class="absolute right-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-teal-600"
      :class="
        currentBrandIndex === brandsStore.brandData.length - 5
          ? 'cursor-not-allowed'
          : 'cursor-pointer'
      "
    >
      <Icon icon="line-md:arrow-right" width="24" height="24" class="text-white" />
    </button>
  </div>
</template>
