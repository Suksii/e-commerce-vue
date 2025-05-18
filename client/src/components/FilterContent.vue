<script setup>
import { Icon } from '@iconify/vue'
import SingleFilter from './SingleFilter.vue'
import CustomCheckBox from './CustomCheckBox.vue'
import { useProductsStore } from '@/stores/products'
import { useCategoryStore } from '@/stores/categories'
import { useBrandStore } from '@/stores/brands'

const props = defineProps({
  showFilters: Boolean,
})

const emit = defineEmits(['update:showFilters'])
const productsStore = useProductsStore()
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
</script>

<template>
  <div
    class="bg-teal-600 fixed inset-0 z-40 transition duration-300 transform"
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
    <div class="flex flex-col divide-white divide-y">
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
            v-model:selectedItem="productsStore.selectedCategories"
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
