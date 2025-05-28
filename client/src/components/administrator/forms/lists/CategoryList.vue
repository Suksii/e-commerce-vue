<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import CategoryCard from '@/components/cards/CategoryCard.vue'

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.fetchCategories()
})
</script>

<template>
  <h3 class="text-center text-3xl font-medium">All Categories</h3>
  <div class="container py-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
    <CategoryCard
      v-for="category in categoryStore.categoriesData"
      :key="category._id"
      :category="category"
      :onDelete="categoryStore.deleteCategory"
    />
  </div>
</template>
