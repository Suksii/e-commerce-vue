<script setup>
import { useCategoryStore } from '@/stores/categories'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

const categoryStore = useCategoryStore()
const expandCategory = ref(null)

const expand = (cat) => {
  expandCategory.value = cat
}
const close = () => {
  expandCategory.value = null
}

onMounted(() => {
  categoryStore.fetchCategories()
})
</script>

<template>
  <div class="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="category in categoryStore.categoriesData"
      :key="category._id"
      @click.stop="expand(category)"
      class="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer group"
    >
      <div class="relative">
        <img
          :src="'http://localhost:3000/uploads/categories/' + category.image"
          :alt="category.name"
          class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="p-6 flex flex-col items-center">
          <p class="text-2xl font-semibold text-gray-800 group-hover:text-teal-600 text-center">
            {{ category.name }}
          </p>
        </div>
        <div
          v-if="expandCategory === category && category.subCategories.length"
          class="absolute inset-0 w-full border-t border-gray-200 bg-gray-50 flex flex-col gap-4"
        >
          <button @click.stop="close" class="flex justify-end p-2 cursor-pointer">
            <Icon icon="iconamoon:close" width="28" height="28" />
          </button>
          <div class="flex flex-col overflow-y-auto">
            <div
              v-for="subCategory in category.subCategories"
              :key="subCategory._id"
              class="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              <img
                :src="'http://localhost:3000/uploads/categories/' + subCategory.image"
                :alt="subCategory.name"
                class="w-24 h-20 object-cover rounded-md"
              />
              <p class="text-lg font-medium text-gray-700">{{ subCategory.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
