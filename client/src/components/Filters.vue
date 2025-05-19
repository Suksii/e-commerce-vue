<script setup>
import { usePriceRange } from '@/composables/usePriceRange'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import SortContent from './SortContent.vue'
import Modal from './Modal.vue'

const productsStore = useProductsStore()
const { minPrice, maxPrice } = usePriceRange()

const showSortModal = ref(false)

const resetAll = () => {
  productsStore.selectedBrands = []
  productsStore.selectedCategories = []
  productsStore.selectedGender = []
  productsStore.selectedSeason = []
  ;(productsStore.selectedMin = minPrice.value), (productsStore.selectedMax = maxPrice.value)
}
</script>

<template>
  <div class="border-b-4 border-teal-600 min-h-9">
    <div class="flex flex-wrap justify-between gap-2 mb-1 w-full">
      <div class="flex gap-2 items-start">
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
        <div v-if="productsStore.selectedGender?.length" class="flex flex-wrap gap-2">
          <p
            v-for="gender of productsStore.selectedGender"
            :key="gender"
            class="py-1 px-3 rounded-full bg-teal-600 text-white text-sm font-medium"
          >
            {{ gender }}
          </p>
        </div>
        <div v-if="productsStore.selectedSeason?.length" class="flex flex-wrap gap-2">
          <p
            v-for="season of productsStore.selectedSeason"
            :key="season"
            class="py-1 px-3 rounded-full bg-teal-600 text-white text-sm font-medium"
          >
            {{ season }}
          </p>
        </div>
        <p
          v-if="
            productsStore.selectedMax &&
            productsStore.selectedMin &&
            (productsStore.selectedMin !== minPrice || productsStore.selectedMax !== maxPrice)
          "
          class="py-1 px-3 rounded-full bg-teal-600 text-white text-sm font-medium"
        >
          {{ productsStore.selectedMin }}€ - {{ productsStore.selectedMax }}€
        </p>
        <button
          v-if="
            productsStore.selectedCategories?.length ||
            productsStore.selectedBrands?.length ||
            productsStore.selectedGender?.length ||
            productsStore.selectedSeason?.length ||
            productsStore.selectedMin !== minPrice ||
            productsStore.selectedMax !== maxPrice
          "
          class="flex items-center gap-2 py-1 px-3 h-fit rounded-full bg-red-600 hover:bg-red-700 text-white text-nowrap text-sm cursor-pointer transition"
          @click="resetAll"
        >
          <Icon icon="streamline:delete-1-solid" width="10" height="10" />
          Resset All
        </button>
      </div>

      <div
        @click="showSortModal = !showSortModal"
        class="relative flex items-center gap-2 justify-self-end ml-4 mr-12 px-4 border-2 border-teal-600 rounded-full cursor-pointer"
      >
        Sort by
        <Icon
          icon="ep:arrow-up"
          width="14"
          height="14"
          class="text-teal-600 transition"
          :class="showSortModal ? '' : 'rotate-180'"
        />
      </div>
      <Modal
        v-if="showSortModal"
        :custom-class="'bg-teal-700 fixed lg:absolute top-10 right-1/2 lg:right-0 translate-x-1/2 lg:translate-x-0'"
      >
        <SortContent />
      </Modal>
    </div>
  </div>
</template>
