<script setup>
import { Icon } from '@iconify/vue'
import { reactive, ref, watch } from 'vue'
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { useBrandStore } from '@/stores/brands'
import { useBrandActions } from '@/composables/useBrandActions'

const notificationStore = useNotificationStore()
const brandStore = useBrandStore()
const { id, cancel } = useBrandActions()

const imageRef = ref(null)
const brandData = reactive({
  name: '',
  image: '',
})

async function uploadImage(event) {
  const file = event.target?.files[0]
  const formData = new FormData()
  formData.append('photo', file)
  try {
    const { data } = await request.post('/api/brand/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    brandData.image = data[1]
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Image upload failed')
    console.error('Image upload failed', error)
  }
}

async function addBrand() {
  try {
    const response = id.value
      ? await request.put('/api/brand/update/' + id.value, {
          name: brandData.name,
          image: brandData.image,
        })
      : await request.post('/api/brand/add', {
          name: brandData.name,
          image: brandData.image,
        })
    notificationStore.isError = false
    notificationStore.showNotification(
      response.data.message || id.value ? 'Brand edited successfully' : 'Brand successfully added',
    )
    brandStore.fetchBrands()
    cancel()
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
    console.error(error)
  }
}

watch(
  id,
  async (newId) => {
    if (newId) {
      await brandStore.fetchSingleBrand(newId)
      const brand = brandStore.singleBrand
      if (brand) {
        brandData.name = brand.name
        brandData.image = brand.image
      }
    } else {
      brandData.name = ''
      brandData.image = ''
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto">
    <h2 class="text-center text-4xl font-medium">
      {{ id ? 'Update this brand' : 'Add new brand' }}
    </h2>
    <form
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
      @submit.prevent="addBrand"
    >
      <div class="flex flex-col gap-2 w-full">
        <p class="text-xl font-medium">Upload image<span class="text-red-600 px-0.5"></span></p>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div v-if="brandData.image" class="w-42 md:w-40 aspect-square relative">
            <img
              :src="'http://localhost:3000/uploads/brands/' + brandData.image"
              class="w-full h-full border border-gray-300 rounded-md object-cover"
            />
          </div>
          <div class="w-42 md:w-40 aspect-square shrink-0 relative" @click="imageRef?.click()">
            <input
              type="file"
              ref="imageRef"
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
        <input v-model="brandData.name" class="custom-input w-full p-4" />
      </div>
      <div class="flex justify-between gap-2 w-full transition-all">
        <button v-if="id" @click="cancel" class="min-w-42 w-full my-4 h-14 save-button">
          Cancel
        </button>
        <button class="min-w-42 w-full my-4 h-14 save-button">
          {{ id ? 'Save Changes' : 'Add Brand' }}
        </button>
      </div>
    </form>
  </div>
</template>
