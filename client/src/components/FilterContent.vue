<script setup>
import { Icon } from '@iconify/vue'
import SingleFilter from './SingleFilter.vue'
import CustomCheckBox from './CustomCheckBox.vue'
import { useProductsStore } from '@/stores/products'
import { useCategoryStore } from '@/stores/categories'
import { useBrandStore } from '@/stores/brands'
import { usePriceRange } from '@/composables/usePriceRange'
import { useValidation } from '@/composables/useValidation'

const props = defineProps({
  showFilters: Boolean,
})

const emit = defineEmits(['update:showFilters'])
const productsStore = useProductsStore()
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const { minPrice, maxPrice, rangeBackground } = usePriceRange()
const { validateMin, validateMax } = useValidation()
</script>

<template>
  <div
    class="bg-teal-700 fixed inset-0 z-30 transition duration-300 transform overflow-y-auto"
    :class="showFilters ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="bg-white flex items-center justify-between p-4">
      <p class="uppercase font-medium text-sm text-teal-700">Filter & Sort</p>
      <Icon
        icon="streamline:delete-1-solid"
        width="16"
        height="16"
        class="cursor-pointer text-teal-700"
        @click="emit('update:showFilters', false)"
      />
    </div>
    <div class="flex flex-col divide-white divide-y px-4">
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
        <div
          v-if="brandStore.brandData.length"
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
      </SingleFilter>
      <SingleFilter name="Price" item="price">
        <div class="flex flex-col w-full px-2 pt-2 pb-4">
          <div class="relative w-full">
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
        <p class="font-medium text-white py-2">
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
