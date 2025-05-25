<script setup>
import { request } from '@/api'
import { Icon } from '@iconify/vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useBrandStore } from '@/stores/brands.js'
import { useNotificationStore } from '@/stores/notification'
import { useProductsStore } from '@/stores/products'
import CustomSelect from '@/components/CustomSelect.vue'
import { useValidation } from '@/composables/useValidation'
import FormError from '@/components/FormError.vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const route = useRoute()

const productData = reactive({
  discount: '',
  category: [],
  gender: [],
  season: [],
  brand: [],
  selectedSeason: '',
})
const inputRef = ref(null)
const { id } = route.params
const productStore = useProductsStore()
const { productSchema } = useValidation()
const notificationStore = useNotificationStore()
const brandStore = useBrandStore()

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(productSchema),
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: price, errorMessage: priceError } = useField('price')
const { value: images, errorMessage: imageError } = useField('images')
const { value: description, errorMessage: descriptionError } = useField('description')
const { value: selectedCategory, errorMessage: categoryError } = useField('category')
const { value: selectedGender, errorMessage: genderError } = useField('gender')
const { value: selectedBrand, errorMessage: brandError } = useField('brand')
images.value = []

const handleProduct = handleSubmit(async () => {
  try {
    const payload = {
      name: name.value,
      description: description.value,
      price: price.value,
      discount: productData.discount,
      category: selectedCategory.value,
      images: images.value,
      gender: selectedGender.value,
      season: productData.selectedSeason,
      brand: selectedBrand.value,
    }
    const response = id
      ? await request.put('/api/products/update/' + id, payload)
      : await request.post('/api/products/add', payload)
    notificationStore.isError = false
    notificationStore.showNotification(response.data?.message)
    router.push(id ? `/product/${id}` : '/all-products')
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data?.message)
    console.error(error)
  }
})
async function uploadImage(event) {
  if (images.value.length < 5) {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('photos', file)
    try {
      const { data } = await request.post('/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      images.value.push(data[1])
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
  images.value = images.value.filter((_, index) => index !== imageIndex)
}
async function nestedCategories() {
  try {
    const { data } = await request.get('/api/category/nested')
    productData.category = data
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  productStore.fetchProductOptions()
  productData.gender = productStore.genderOptions
  productData.season = productStore.seasonOptions
  brandStore.fetchBrands()
  nestedCategories()
  if (id) {
    await productStore.getProduct(id)
    const product = productStore.singleProduct

    if (product) {
      name.value = product.name
      description.value = product.description
      price.value = product.price
      productData.discount = product.discount
      images.value = product.images
      selectedCategory.value = product.category
      selectedGender.value = product.gender
      productData.selectedSeason = product.season
      selectedBrand.value = product.brand
    }
  }
})

watch(errors, (val) => {
  console.log('errors:', val)
})
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto py-24">
    <h2 class="text-center text-3xl font-medium">
      {{ id ? 'Edit this product' : 'Add new product' }}
    </h2>
    <form
      @submit.prevent="handleProduct"
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
    >
      <div class="flex flex-col gap-1 w-full">
        <label class="text-xl font-medium"
          >Upload images<span class="text-red-600 px-0.5">*</span></label
        >
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div
            class="w-32 md:w-36 aspect-square relative"
            v-for="(image, index) of images"
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
          <div class="w-32 md:w-36 aspect-square shrink-0 relative" @click="inputRef?.click()">
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
        <FormError :error="imageError" />
      </div>
      <div class="flex flex-col w-full">
        <label>Name<span class="text-red-600 px-0.5">*</span></label>
        <input class="custom-input w-full px-3 py-2.5" v-model="name" />
        <FormError :error="nameError" />
      </div>
      <div class="flex flex-col w-full">
        <div class="w-full flex gap-2 items-center">
          <div class="flex flex-col w-full">
            <label>Price<span class="text-red-600 px-0.5">*</span></label>
            <input
              type="number"
              min="1"
              class="custom-input w-full px-3 py-2.5"
              v-model.number="price"
            />
          </div>
          <div class="flex flex-col w-full">
            <label>Discount<span class="text-gray-700 px-0.5">(optional)</span></label>
            <input
              type="number"
              min="0"
              class="custom-input w-full px-3 py-2.5"
              v-model="productData.discount"
            />
          </div>
        </div>
        <FormError :error="priceError" />
      </div>
      <div class="flex flex-col w-full">
        <label>Category<span class="text-red-600 px-0.5">*</span></label>
        <CustomSelect v-model:selectedOption="selectedCategory" :options="productData.category" />
        <FormError :error="categoryError" />
      </div>
      <div class="flex flex-col w-full">
        <div class="w-full flex gap-2 items-center">
          <div class="flex flex-col w-full">
            <label>Gender<span class="text-red-600 px-0.5">*</span></label>
            <CustomSelect
              v-model:selectedOption="selectedGender"
              :options="productStore.genderOptions"
            />
          </div>
          <div class="flex flex-col w-full">
            <label>Season</label>
            <CustomSelect
            v-model:selectedOption="productData.selectedSeason"
            :options="productStore.seasonOptions"
            />
          </div>
        </div>
        <FormError :error="genderError" />
      </div>
      <div class="flex flex-col w-full">
        <label>Description<span class="text-red-600 px-0.5">*</span></label>
        <textarea
          class="custom-input w-full px-3 py-2.5 min-h-52 max-h-[500px]"
          v-model="description"
        ></textarea>
        <FormError :error="descriptionError" />
      </div>
      <div class="flex flex-col w-full">
        <label>Brand<span class="text-red-600 px-0.5">*</span></label>
        <CustomSelect v-model:selectedOption="selectedBrand" :options="brandStore.brandData" />
        <FormError :error="brandError" />
      </div>

      <button class="min-w-42 w-full my-4 h-14 save-button">
        {{ id ? 'Save Changes' : 'Add Product' }}
      </button>
    </form>
  </div>
</template>
