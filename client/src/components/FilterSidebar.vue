<script setup>
import { useCategoryStore } from '@/stores/categories'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

console.log(categoryStore.categoriesData)
</script>

<template>
  <div></div>
</template>
