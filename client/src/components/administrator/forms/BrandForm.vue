<script setup>
import { Icon } from '@iconify/vue'
import { reactive, ref, watch } from 'vue'
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { useBrandStore } from '@/stores/brands'
import { useEditActions } from '@/composables/useEditActions'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useValidation } from '@/composables/useValidation'
import FormError from '@/components/FormError.vue'

const notificationStore = useNotificationStore()
const brandStore = useBrandStore()
const { id: brandId, cancel: brandCancel } = useEditActions()
const { brandSchema } = useValidation()

const imageRef = ref(null)
const image = ref('')

const { errors, handleSubmit } = useForm({ validationSchema: toTypedSchema(brandSchema) })

const { value: name, errorMessage: nameError } = useField('name')

function resetForm() {
  name.value = ''
  image.value = ''
}
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

    image = data[1]
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Image upload failed')
    console.error('Image upload failed', error)
  }
}

async function handleBrand() {
  try {
    const response = brandId.value
      ? await request.put('/api/brand/update/' + brandId.value, {
          name: name.value,
          image: image.value,
        })
      : await request.post('/api/brand/add', {
          name: name.value,
          image: image.value,
        })
    notificationStore.isError = false
    notificationStore.showNotification(
      response.data.message || brandId.value
        ? 'Brand edited successfully'
        : 'Brand successfully added',
    )
    brandStore.fetchBrands()
    resetForm()
    brandCancel()
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
    console.error(error)
  }
}

watch(
  brandId,
  async (newId) => {
    if (newId) {
      await brandStore.fetchSingleBrand(newId)
      const brand = brandStore.singleBrand
      if (brand) {
        name.value = brand.name
        image.value = brand.image
      }
    } else {
      resetForm()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto">
    <h2 class="text-center text-3xl font-medium">
      {{ brandId ? 'Update this brand' : 'Add new brand' }}
    </h2>
    <form
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
      @submit.prevent="handleSubmit(handleBrand)"
    >
      <div class="flex flex-col gap-1 w-full">
        <label>Upload image</label>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div v-if="image" class="w-32 md:w-36 aspect-square relative">
            <img
              :src="'http://localhost:3000/uploads/brands/' + image"
              class="w-full h-full border border-gray-300 rounded-md object-cover"
            />
          </div>
          <div class="w-32 md:w-36 aspect-square shrink-0 relative" @click="imageRef?.click()">
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
        <label>Name<span class="text-red-600 px-0.5">*</span></label>
        <input v-model="name" class="custom-input w-full px-3 py-2.5" />
        <FormError :error="nameError" />
      </div>
      <div class="flex justify-between gap-2 w-full transition-all">
        <button v-if="brandId" @click="brandCancel" class="min-w-42 w-full my-4 h-11 save-button">
          Cancel
        </button>
        <button class="min-w-42 w-full my-4 h-11 save-button">
          {{ brandId ? 'Save Changes' : 'Add Brand' }}
        </button>
      </div>
    </form>
  </div>
</template>
