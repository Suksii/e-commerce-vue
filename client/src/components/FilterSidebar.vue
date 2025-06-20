<script setup>
import { useBrandStore } from '@/stores/brands'
import { useCategoryStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import { useValidation } from '@/composables/useValidation'
import { usePriceRange } from '@/composables/usePriceRange'
import { onMounted } from 'vue'
import CustomCheckBox from './customInputs/CustomCheckBox.vue'
import SingleFilter from './SingleFilter.vue'

const brandStore = useBrandStore()
const categoryStore = useCategoryStore()
const productsStore = useProductsStore()

const { validateMin, validateMax } = useValidation()
const { minPrice, maxPrice, rangeBackground } = usePriceRange()

onMounted(() => {
  brandStore.fetchBrands()
  productsStore.fetchProductOptions()
  categoryStore.getChildCategories()
  productsStore.getProducts().then(() => {
    productsStore.selectedMin = minPrice.value
    productsStore.selectedMax = maxPrice.value
  })
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
      <SingleFilter name="Season" item="season">
        <div
          v-for="season in productsStore.seasonOptions"
          :key="season"
          class="flex items-center gap-2"
        >
          <CustomCheckBox
            v-model:selectedItem="productsStore.selectedSeason"
            :name="season"
            :item="season"
          />
        </div>
      </SingleFilter>
      <SingleFilter name="Gender" item="gender">
        <div
          v-for="gender in productsStore.genderOptions"
          :key="gender"
          class="flex items-center gap-2"
        >
          <CustomCheckBox
            v-model:selectedItem="productsStore.selectedGender"
            :name="gender"
            :item="gender"
          />
        </div>
      </SingleFilter>
    </div>
  </div>
</template>
