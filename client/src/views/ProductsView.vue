<script setup>
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

async function addProduct() {
  try {
    const response = await request.post('/api/products/add-product', {
      name: 'T-Shirt',
      description: 'Very good T-shirt',
      price: 32,
      category: 'Men',
      image: 'Image',
    })
    notificationStore.isError = false
    notificationStore.showNotification(response.data.message)
    console.log(response)
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message)
    console.error(error)
  }
}
</script>

<template>
  <div class="py-20">
    <button class="save-button" @click.prevent="addProduct">Add product</button>
  </div>
</template>
