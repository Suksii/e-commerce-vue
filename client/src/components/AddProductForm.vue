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
  <div class="w-[95%] md:w-[50%] mx-auto py-24">
    <h2 class="text-center text-4xl">Add new product</h2>
    <form
      @submit.prevent="addProduct"
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
    >
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Name</label>
        <input class="custom-input w-full py-3 px-4" v-model="productData.name" />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Description</label>
        <input class="custom-input w-full py-3 px-4" v-model="productData.description" />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Price</label>
        <input class="custom-input w-full py-3 px-4" v-model="productData.price" />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Category</label>
        <input class="custom-input w-full py-3 px-4" v-model="productData.category" />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Image</label>
        <input class="custom-input w-full py-3 px-4" v-model="productData.image" />
      </div>
      <button class="min-w-42 w-full my-4 h-12 save-button">Add Product</button>
    </form>
  </div>
</template>
