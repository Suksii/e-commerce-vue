<script setup>
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { Icon } from '@iconify/vue'
import { reactive, ref } from 'vue'

const notificationStore = useNotificationStore()
const productData = reactive({
  name: '',
  description: '',
  price: '',
  discount: '',
  category: '',
  images: [],
})
const inputRef = ref(null)
const selectedImages = ref([])

async function addProduct() {
  try {
    const response = await request.post('/api/products/add-product', {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      discount: productData.discount,
      category: productData.category,
      images: productData.images,
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
async function uploadImage(event) {
  if (selectedImages.value.length < 5) {
    const file = event.target.files[0]
    selectedImages.value.push(URL.createObjectURL(file))
    const formData = new FormData()
    formData.append('photos', file)
    try {
      const { data } = await request.post('/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      productData.images.push(data[0])
      console.log(productData.images)
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification('Image upload failed')
      console.error('Image upload failed', error)
    }
  } else {
    notificationStore.isError = true
    notificationStore.showNotification('You cannot add more than 5 images...')
    return
  }
}
function removeImage(imageIndex) {
  selectedImages.value = selectedImages.value.filter((_, index) => index !== imageIndex)
  productData.images = productData.images.filter((_, index) => index !== imageIndex)
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
        <p class="text-xl font-medium">Upload images<span class="text-red-600 px-0.5">*</span></p>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div
            class="w-42 md:w-64 aspect-square relative"
            v-for="(selectedImage, index) of selectedImages"
          >
            <img
              :src="selectedImage"
              :key="index"
              class="w-full h-full border border-gray-300 rounded-md object-cover"
            />
            <div
              class="absolute top-0 right-0 bg-white/70 p-2 m-2 rounded-full cursor-pointer"
              @click="removeImage(index)"
            >
              <Icon icon="nimbus:close" width="24" height="24" class="text-red-600" />
            </div>
          </div>
          <div class="w-42 md:w-64 aspect-square shrink-0 relative" @click="inputRef.click()">
            <input
              type="file"
              ref="inputRef"
              class="absolute inset-0 hidden"
              accept="image/*"
              @change="uploadImage"
            />
            <div
              class="w-full h-full flex justify-center items-center bg-gray-200 border border-dashed border-gray-400 rounded-md cursor-pointer"
            >
              <Icon icon="fluent:add-24-filled" width="64" height="64" class="text-white" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Name<span class="text-red-600 px-0.5">*</span></label>
        <input class="custom-input w-full p-4" v-model="productData.name" />
      </div>
      <div class="w-full flex gap-2 items-center">
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium">Price<span class="text-red-600 px-0.5">*</span></label>
          <input type="number" class="custom-input w-full p-4" v-model="productData.price" />
        </div>
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium"
            >Discount<span class="text-gray-700 px-0.5">(optional)</span></label
          >
          <input type="number" class="custom-input w-full p-4" v-model="productData.discount" />
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium"
          >Description<span class="text-red-600 px-0.5">*</span></label
        >
        <textarea class="custom-input w-full p-4 min-h-52" v-model="productData.description" />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium"
          >Category<span class="text-red-600 px-0.5">*</span></label
        >
        <input class="custom-input w-full p-4" v-model="productData.category" />
      </div>
      <button class="min-w-42 w-full my-4 h-14 save-button">Add Product</button>
    </form>
  </div>
</template>
