<script setup>
import CardList from '@/components/CardList.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
</script>

<template>
  <div class="py-20">
    <CardList :data="productsStore.productsData" />
  </div>
</template>
