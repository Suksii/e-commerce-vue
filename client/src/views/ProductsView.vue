<script setup>
import { request } from '@/api'
import CardList from '@/components/CardList.vue'
import { onMounted, ref } from 'vue'

const productsData = ref([])

onMounted(async () => {
  try {
    const { data } = await request.get('/api/products/get-products')
    productsData.value = data
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
})
</script>

<template>
  <div class="py-20">
    <RouterLink to="/add-product" class="save-button">Add product</RouterLink>
    <CardList :data="productsData" />
  </div>
</template>
