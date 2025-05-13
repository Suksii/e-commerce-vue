<script setup>
import { useBrandStore } from '@/stores/brands'
import { useCategoryStore } from '@/stores/categories'
import { computed, onMounted, ref, watch } from 'vue'
import CustomCheckBox from './CustomCheckBox.vue'
import { useProductsStore } from '@/stores/products'

const brandStore = useBrandStore()
const categoryStore = useCategoryStore()
const productsStore = useProductsStore()

const selectedMin = ref(0)
const selectedMax = ref(0)

onMounted(() => {
  brandStore.fetchBrands()
  categoryStore.getChildCategories()
  productsStore.getProducts()
})

const minPrice = computed(() => {
  if (!productsStore.productsData.length) return 0
  return Math.min(...productsStore.productsData.map((product) => product.price))
})

const maxPrice = computed(() => {
  if (!productsStore.productsData.length) return 0
  return Math.max(...productsStore.productsData.map((product) => product.price))
})

watch(
  [minPrice, maxPrice],
  () => {
    selectedMin.value = minPrice.value
    selectedMax.value = maxPrice.value
  },
  { immediate: true },
)

const validateMin = (e) => {
  const value = +e.target.value
  if (value + 10 <= selectedMax.value) {
    selectedMin.value = value
  } else {
    selectedMin.value = selectedMax.value - 10
    e.target.value = selectedMax.value
  }
}

const validateMax = (e) => {
  const value = +e.target.value
  if (value - 10 >= selectedMin.value) {
    selectedMax.value = value
  } else {
    selectedMax.value = selectedMin.value + 10
    e.target.value = selectedMin.value
  }
}

const rangeBackground = computed(() => {
  const min = minPrice.value
  const max = maxPrice.value
  const range = max - min || 1
  const minValue = ((selectedMin.value - min) / range) * 100
  const maxValue = ((selectedMax.value - min) / range) * 100
  return {
    background: `linear-gradient(to right, #e5e7eb ${minValue}% , #14b8a6 ${minValue}%, #14b8a6 ${maxValue}%, #e5e7eb ${maxValue}%)`,
  }
})
</script>

<template>
  <div class="w-64">
    <div class="flex flex-col w-full gap-2">
      <div v-if="categoryStore.childCategoriesData.length">
        <h3 class="text-sm font-medium uppercase border-b-2 border-teal-600 mb-2">Categories</h3>
        <div
          v-for="category of categoryStore.childCategoriesData"
          :key="category._id"
          class="flex items-center gap-2"
        >
          <CustomCheckBox
            v-model:selectedItem="productsStore.selectedCategories"
            :name="category.name"
            :id="category._id"
          />
        </div>
      </div>
      <div v-if="brandStore.brandData.length">
        <h3 class="text-sm font-medium uppercase border-b-2 border-teal-600 mb-2">Brands</h3>
        <div v-for="brand in brandStore.brandData" :key="brand._id" class="flex items-center gap-2">
          <CustomCheckBox
            v-model:selectedItem="productsStore.selectedBrands"
            :name="brand.name"
            :id="brand._id"
          />
        </div>
      </div>
      <div class="w-full">
        <h3 class="text-sm font-medium uppercase border-b-2 border-teal-600 mb-2">Price</h3>
        <div class="flex flex-col">
          <div class="relative h-10 w-full">
            <input
              type="range"
              :min="minPrice"
              :max="maxPrice"
              v-model="selectedMin"
              @input="validateMin"
              class="input-range absolute top-0 left-0 w-full z-40"
              :style="rangeBackground"
            />
            <input
              type="range"
              :min="minPrice"
              :max="maxPrice"
              v-model="selectedMax"
              @input="validateMax"
              class="input-range absolute top-0 left-0 w-full z-50"
            />
          </div>
        </div>
        <p class="font-medium">{{ selectedMin }}€ - {{ selectedMax }}€</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent;
  pointer-events: auto;
}

.input-range::-webkit-slider-runnable-track {
  height: 6px;
  background: transparent;
  border-radius: 3px;
}

.input-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 18px;
  width: 18px;
  background-color: #ffffff;
  border: 3px solid #0d9488;
  border-radius: 50%;
  margin-top: -6px;
  z-index: 3;
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;
}

.input-range::-webkit-slider-thumb:hover,
.input-range::-webkit-slider-thumb:focus {
  background-color: #f0fdfa;
  transform: scale(1.1);
  border-color: #0f766e;
}

.input-range::-moz-range-track {
  height: 6px;
  background: transparent;
  border-radius: 3px;
}

.input-range::-moz-range-thumb {
  height: 18px;
  width: 18px;
  background-color: #ffffff;
  border: 3px solid #0d9488;
  border-radius: 50%;
  cursor: pointer;
  z-index: 3;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;
}

.input-range::-moz-range-thumb:hover,
.input-range::-moz-range-thumb:focus {
  background-color: #f0fdfa;
  transform: scale(1.1);
  border-color: #0f766e;
}
</style>
