<script setup>
import { useBrandStore } from '@/stores/brands'
import { useCategoryStore } from '@/stores/categories'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import CustomCheckBox from './CustomCheckBox.vue'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'

const brandStore = useBrandStore()
const categoryStore = useCategoryStore()
const productsStore = useProductsStore()

const minPrice = computed(() => {
  if (productsStore.allProductsData.length === 0) return 0
  return Math.floor(Math.min(...productsStore.allProductsData.map((product) => product.price)))
})

const maxPrice = computed(() => {
  if (productsStore.allProductsData.length === 0) return 300
  return Math.ceil(Math.max(...productsStore.allProductsData.map((product) => product.price)))
})

const validateMin = (e) => {
  const value = +e.target.value
  if (value + 10 <= productsStore.selectedMax) {
    productsStore.selectedMin = value
  } else {
    productsStore.selectedMin = productsStore.selectedMax - 10
  }
}
const validateMax = (e) => {
  const value = +e.target.value
  if (value - 10 >= productsStore.selectedMin) {
    productsStore.selectedMax = value
  } else {
    productsStore.selectedMax = productsStore.selectedMin + 10
  }
}

const expand = reactive({
  categories: false,
  brands: false,
  price: false,
})
const isOverflowVisible = ref(false)

const handleExpand = (item) => {
  expand[item] = !expand[item]
}

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
  <div class="w-64">
    <div class="flex flex-col w-full gap-2">
      <div v-if="categoryStore.childCategoriesData.length" class="">
        <div class="flex justify-between items-center w-full border-b-2 border-teal-600 mb-2">
          <h3 class="text-sm font-medium uppercase">Categories</h3>
          <Icon
            :icon="expand.categories ? 'line-md:minus' : 'line-md:plus'"
            width="22"
            height="22"
            class="text-teal-700 cursor-pointer transition"
            @click="handleExpand('categories')"
          />
        </div>
        <div
          :class="expand.categories ? 'max-h-96' : 'max-h-0'"
          class="overflow-hidden transition-all duration-500"
        >
          <div
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
        </div>
      </div>
      <div v-if="brandStore.brandData.length">
        <div class="flex justify-between items-center w-full border-b-2 border-teal-600 mb-2">
          <h3 class="text-sm font-medium uppercase">Brands</h3>
          <Icon
            :icon="expand.brands ? 'line-md:minus' : 'line-md:plus'"
            width="22"
            height="22"
            class="text-teal-700 cursor-pointer"
            @click="handleExpand('brands')"
          />
        </div>

        <div
          @mouseenter="isOverflowVisible = true"
          @mouseleave="isOverflowVisible = false"
          :class="[
            expand.brands ? 'max-h-96' : 'max-h-0',
            isOverflowVisible ? 'overflow-auto' : 'overflow-hidden',
          ]"
          class="transition-all duration-500"
        >
          <div
            v-for="brand in brandStore.brandData"
            :key="brand._id"
            class="flex items-center gap-2"
          >
            <CustomCheckBox
              v-model:selectedItem="productsStore.selectedBrands"
              :name="brand.name"
              :item="brand"
            />
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex justify-between items-center w-full border-b-2 border-teal-600 mb-2">
          <h3 class="text-sm font-medium uppercase">Price</h3>
          <Icon
            :icon="expand.price ? 'line-md:minus' : 'line-md:plus'"
            width="22"
            height="22"
            class="text-teal-700 cursor-pointer"
            @click="handleExpand('price')"
          />
        </div>
        <div
          :class="expand.price ? 'max-h-96' : 'max-h-0'"
          class="overflow-hidden transition-all duration-500"
        >
          <div class="flex flex-col">
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
        </div>
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
