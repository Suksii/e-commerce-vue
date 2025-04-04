<script setup>
import { request } from '@/api'

async function addProduct() {
  try {
    const response = await request.post('/api/products/add-product', {
      name: 'T-Shirt',
      description: 'Very good T-shirt',
      price: 32,
      category: 'Men',
      image: 'Image'
    })
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="py-20">
    <button class="save-button" @click.prevent="addProduct">Add product</button>
  </div>
</template>
