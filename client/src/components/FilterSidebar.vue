<script setup>
import { useBrandStore } from '@/stores/brands'
import { useCategoryStore } from '@/stores/categories'
import { computed, onMounted } from 'vue'
import CustomCheckBox from './CustomCheckBox.vue'
import { useProductsStore } from '@/stores/products'
import { useValidation } from '@/composables/useValidation'
import SingleFilter from './SingleFilter.vue'

const brandStore = useBrandStore()
const categoryStore = useCategoryStore()
const productsStore = useProductsStore()

const { validateMin, validateMax } = useValidation()

const minPrice = computed(() => {
  if (productsStore.allProductsData.length === 0) return 0
  return Math.floor(Math.min(...productsStore.allProductsData.map((product) => product.price)))
})

const maxPrice = computed(() => {
  if (productsStore.allProductsData.length === 0) return 300
  return Math.ceil(Math.max(...productsStore.allProductsData.map((product) => product.price)))
})

onMounted(() => {
  brandStore.fetchBrands()
  categoryStore.getChildCategories()
  productsStore.getProducts().then(() => {
    productsStore.selectedMin = minPrice.value
    productsStore.selectedMax = maxPrice.value
  })
})

const rangeBackground = computed(() => {
  const min = minPrice.value
  const max = maxPrice.value
  const range = max - min || 1
  const minValue = ((productsStore.selectedMin - min) / range) * 100
  const maxValue = ((productsStore.selectedMax - min) / range) * 100
  return {
    background: `linear-gradient(to right, #e5e7eb ${minValue}% , #14b8a6 ${minValue}%, #14b8a6 ${maxValue}%, #e5e7eb ${maxValue}%)`,
  }
})
</script>

<template>
  <div class="w-64 hidden md:block">
    <div class="flex flex-col w-full gap-1">
      <SingleFilter name="Categories" item="categories">
        <div
          v-if="categoryStore.childCategoriesData.length"
          v-for="category in categoryStore.childCategoriesData"
          :key="category._id"
          class="flex items-center gap-2"
        >
          <CustomCheckBox
            v-model:selectedItem="productsStore.selectedCategories"
            :name="category.name"
            :item="category"
          />
        </div>
      </SingleFilter>
      <SingleFilter name="Brands" item="brands">
        <div v-for="brand in brandStore.brandData" :key="brand._id" class="flex items-center gap-2">
          <CustomCheckBox
            v-model:selectedItem="productsStore.selectedBrands"
            :name="brand.name"
            :item="brand"
          />
        </div>
      </SingleFilter>
      <SingleFilter name="Price" item="price">
        <div class="flex flex-col w-full px-0.5">
          <div class="relative w-full mt-2">
            <input
              type="range"
              :min="minPrice"
              :max="maxPrice"
              v-model="productsStore.selectedMin"
              @input="validateMin"
              class="input-range absolute top-0 left-0 w-full z-40"
              :style="rangeBackground"
            />
            <input
              type="range"
              :min="minPrice"
              :max="maxPrice"
              @input="validateMax"
              v-model="productsStore.selectedMax"
              class="input-range absolute top-0 left-0 w-full z-50"
            />
          </div>
        </div>
        <p class="font-medium pt-4">
          {{ productsStore.selectedMin }}€ - {{ productsStore.selectedMax }}€
        </p>
      </SingleFilter>
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
