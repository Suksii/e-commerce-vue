<script setup>
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { Icon } from '@iconify/vue'
import { reactive, ref, useTemplateRef } from 'vue'

const notificationStore = useNotificationStore()
const productData = reactive({})
const inputRef = useTemplateRef('image-ref')
const selectedImages = reactive([])

async function addProduct() {
  try {
    const response = await request.post('/api/products/add-product', {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      discount: productData.discount,
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
function uploadImage(event) {
  const file = event.target.files[0]
  selectedImages.push(URL.createObjectURL(file))
  productData.image = file
}
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto py-24">
    <h2 class="text-center text-4xl font-medium">Add new product</h2>
    <form
      @submit.prevent="addProduct"
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
    >
      <div class="flex flex-col gap-2 w-full">
        <p class="text-xl font-medium">Upload images</p>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div class="w-42 md:w-64 aspect-square" v-for="selectedImage of selectedImages">
            <img :src="selectedImage" class="w-full h-full bg-gray-300 rounded-md object-cover" />
          </div>
          <div class="w-42 md:w-64 aspect-square shrink-0 relative" @click="inputRef.click()">
            <input
              type="file"
              ref="image-ref"
              class="absolute inset-0 hidden"
              accept="image/*"
              @change="uploadImage"
            />
            <div
              class="w-full h-full flex justify-center items-center bg-gray-200 rounded-md cursor-pointer"
            >
              <Icon icon="fluent:add-24-filled" width="64" height="64" class="text-white" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Name</label>
        <input class="custom-input w-full p-4" v-model="productData.name" />
      </div>
      <div class="w-full flex gap-2 items-center">
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium">Price</label>
          <input type="number" class="custom-input w-full p-4" v-model="productData.price" />
        </div>
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium">Discount</label>
          <input type="number" class="custom-input w-full p-4" v-model="productData.discount" />
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Description</label>
        <textarea class="custom-input w-full p-4 min-h-52" v-model="productData.description" />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Category</label>
        <input class="custom-input w-full p-4" v-model="productData.category" />
      </div>
      <button class="min-w-42 w-full my-4 h-14 save-button">Add Product</button>
    </form>
  </div>
</template>
