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
    <CardList :data="productsStore.productsData" />
  </div>
</template>
