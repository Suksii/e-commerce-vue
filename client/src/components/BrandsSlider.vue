<script setup>
import { useBrandStore } from '@/stores/brands'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const brandsStore = useBrandStore()
const productsStore = useProductsStore()

const currentBrandIndex = ref(0)
const containerRef = ref(null)
const containerWidth = ref(window.innerWidth)

function updateContainerWidth() {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.clientWidth
  } else {
    containerWidth.value = innerWidth
  }
}

onMounted(async () => {
  brandsStore.fetchBrands()
  updateContainerWidth()
  window.addEventListener('resize', updateContainerWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerWidth)
})

const visibleBrands = computed(() => {
  if (containerWidth.value >= 1280) return 5
  if (containerWidth.value >= 768) return 3
  return 2
})

function next() {
  if (currentBrandIndex.value < brandsStore.brandData.length - visibleBrands.value) {
    console.log(visibleBrands.value, containerWidth.value, window.innerWidth)
    currentBrandIndex.value++
  }
}
function prev() {
  if (currentBrandIndex.value > 0) currentBrandIndex.value--
}

async function goToPage(brandName) {
  const selectedBrand = brandsStore.brandData.find((brand) => brand.name === brandName)
  if (selectedBrand) {
    productsStore.selectedBrands = [selectedBrand]
    await productsStore.searchProducts()
  }
  router.push({
    name: 'allProducts',
    query: { brand: brandName },
  })
}
</script>
<template>
  <div class="relative w-full py-12" ref="containerRef">
    <div class="relative w-full mx-auto">
      <div class="relative flex items-center mx-auto overflow-x-hidden">
        <div
          v-for="brand of brandsStore.brandData"
          @click="goToPage(brand.name)"
          class="flex justify-center transition duration-1000 shrink-0 cursor-pointer"
          :style="{
            transform: `translateX(-${currentBrandIndex * 100}%)`,
            width: `${100 / visibleBrands}%`,
          }"
        >
          <img
            :src="'http://localhost:3000/uploads/brands/' + brand.image"
            class="w-28 h-28 object-contain"
          />
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
  </div>
</template>
