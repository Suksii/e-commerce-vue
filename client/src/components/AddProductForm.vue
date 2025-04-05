<script setup>
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { reactive } from 'vue'

const notificationStore = useNotificationStore()
const productData = reactive([])

async function addProduct() {
  try {
    const response = await request.post('/api/products/add-product', {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      image: productData.image,
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
  <div class="w-[80%] mx-auto py-24">
    <h2 class="text-center text-4xl">Add new product</h2>
    <form
      @submit.prevent="addProduct"
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
    >
      <input class="custom-input w-full py-3 px-4" v-model="productData.name" />
      <input class="custom-input w-full py-3 px-4" v-model="productData.description" />
      <input class="custom-input w-full py-3 px-4" v-model="productData.price" />
      <input class="custom-input w-full py-3 px-4" v-model="productData.category" />
      <input class="custom-input w-full py-3 px-4" v-model="productData.image" />
      <button class="save-button">Add Product</button>
    </form>
  </div>
</template>
