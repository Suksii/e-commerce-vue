<script setup>
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'

const productsStore = useProductsStore()

const resetAll = () => {
  productsStore.selectedBrands = []
  productsStore.selectedCategories = []
}
</script>

<template>
  <div class="border-b-4 border-teal-600">
    <div class="flex flex-wrap gap-2 mb-1">
      <div v-if="productsStore.selectedBrands?.length" class="flex flex-wrap gap-2">
        <p
          v-for="brand of productsStore.selectedBrands"
          :key="brand._id"
          class="py-1 px-3 rounded-full bg-teal-600 text-white text-sm font-medium"
        >
          {{ brand.name }}
        </p>
      </div>
      <div v-if="productsStore.selectedCategories?.length" class="flex flex-wrap gap-2">
        <p
          v-for="category of productsStore.selectedCategories"
          :key="category._id"
          class="py-1 px-3 rounded-full bg-teal-600 text-white text-sm font-medium"
        >
          {{ category.name }}
        </p>
      </div>
      <p
        v-if="productsStore.selectedMax && productsStore.selectedMin"
        class="py-1 px-3 rounded-full bg-teal-600 text-white text-sm font-medium"
      >
        {{ productsStore.selectedMin }}€ - {{ productsStore.selectedMax }}€
      </p>
      <button
        v-if="productsStore.selectedCategories?.length || productsStore.selectedBrands?.length"
        class="flex items-center gap-2 py-1 px-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm cursor-pointer transition"
        @click="resetAll"
      >
        <Icon icon="streamline:delete-1-solid" width="10" height="10" />
        Resset All
      </button>
    </div>
  </div>
</template>
