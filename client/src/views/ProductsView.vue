<script setup>
import CardList from '@/components/CardList.vue'
import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue'

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.getProducts()
})
</script>

<template>
  <div class="py-20">
    <RouterLink to="/add-product" class="save-button">Add product</RouterLink>
    <CardList :data="productsStore.productsData" />
  </div>
</template>
