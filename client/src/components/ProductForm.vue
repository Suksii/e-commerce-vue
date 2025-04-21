<script setup>
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import CustomSelect from './CustomSelect.vue'
import router from '@/router'

const route = useRoute()
const notificationStore = useNotificationStore()
const productData = reactive({
  name: '',
  description: '',
  price: '',
  discount: '',
  category: '',
  gender: [],
  season: [],
  images: [],
  selectedGenre: '',
  selectedSeason: '',
})
const inputRef = ref(null)
const { id } = route.params
const productStore = useProductsStore()

async function addProduct() {
  try {
    const response = id
      ? await request.put('/api/products/update-product/' + id, {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          discount: productData.discount,
          category: productData.category,
          images: productData.images,
          gender: productData.selectedGenre,
          season: productData.selectedSeason,
        })
      : await request.post('/api/products/add-product', {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          discount: productData.discount,
          category: productData.category,
          images: productData.images,
          gender: productData.selectedGenre,
          season: productData.selectedSeason,
        })
    notificationStore.isError = false
    notificationStore.showNotification(response.data.message)
    router.push(`/product/${id}`)
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message)
    console.error(error)
  }
}
async function uploadImage(event) {
  if (productData.images.length < 5) {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('photos', file)
    try {
      const { data } = await request.post('/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      productData.images.push(data[1])
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

const fetchProductOptions = async () => {
  try {
    const { data } = await request.get('/api/products/options')
    productData.gender = data.gender
    productData.season = data.season
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Error while fetching data')
    console.error('Error while fetching data:', error)
  }
}

function removeImage(imageIndex) {
  productData.images = productData.images.filter((_, index) => index !== imageIndex)
}
onMounted(async () => {
  if (id) {
    await productStore.getProduct(id)
    const product = productStore.singleProduct

    if (product) {
      productData.name = product.name
      productData.description = product.description
      productData.price = product.price
      productData.discount = product.discount
      productData.category = product.category
      productData.images = product.images
      productData.selectedGenre = product.gender
      productData.selectedSeason = product.season
    }
  }
  fetchProductOptions()
})
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto py-24">
    <h2 class="text-center text-4xl font-medium">
      {{ id ? 'Edit this product' : 'Add new product' }}
    </h2>
    <form
      @submit.prevent="addProduct"
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
    >
      <div class="flex flex-col gap-2 w-full">
        <p class="text-xl font-medium">Upload images<span class="text-red-600 px-0.5">*</span></p>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div
            class="w-42 md:w-40 aspect-square relative"
            v-for="(image, index) of productData.images"
            :key="index"
          >
            <img
              :src="'http://localhost:3000/uploads/products/' + image"
              class="w-full h-full border border-gray-300 rounded-md object-cover"
            />
            <div
              class="absolute top-0 right-0 bg-white/70 p-1.5 m-2 rounded-full cursor-pointer"
              @click="removeImage(index)"
            >
              <Icon icon="nimbus:close" width="20" height="20" class="text-red-600" />
            </div>
          </div>
          <div class="w-42 md:w-40 aspect-square shrink-0 relative" @click="inputRef?.click()">
            <input
              type="file"
              ref="inputRef"
              class="absolute inset-0 hidden"
              accept="image/*"
              @change="uploadImage"
            />
            <div
              class="w-full h-full flex justify-center items-center bg-gray-100 border border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-200 transition"
            >
              <Icon icon="fluent:add-24-filled" width="40" height="40" class="text-gray-500" />
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
          <input
            type="number"
            min="1"
            class="custom-input w-full p-4"
            v-model="productData.price"
          />
        </div>
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium"
            >Discount<span class="text-gray-700 px-0.5">(optional)</span></label
          >
          <input
            type="number"
            min="0"
            class="custom-input w-full p-4"
            v-model="productData.discount"
          />
        </div>
      </div>
      <div class="w-full flex gap-2 items-center">
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium"
            >Gender<span class="text-red-600 px-0.5">*</span></label
          >
          <CustomSelect
            v-model:selectedOption="productData.selectedGenre"
            :options="productData.gender"
          />
        </div>
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium">Season</label>
          <CustomSelect
            v-model:selectedOption="productData.selectedSeason"
            :options="productData.season"
          />
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium"
          >Description<span class="text-red-600 px-0.5">*</span></label
        >
        <textarea
          class="custom-input w-full p-4 min-h-52 max-h-[500px]"
          v-model="productData.description"
        ></textarea>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium"
          >Category<span class="text-red-600 px-0.5">*</span></label
        >
        <input class="custom-input w-full p-4" v-model="productData.category" />
      </div>
      <button class="min-w-42 w-full my-4 h-14 save-button">
        {{ id ? 'Save Changes' : 'Add Product' }}
      </button>
    </form>
  </div>
</template>
