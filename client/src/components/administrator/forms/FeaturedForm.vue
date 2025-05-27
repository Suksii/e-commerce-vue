<script setup>
import { request } from '@/api'
import FormError from '@/components/FormError.vue'
import { useEditActions } from '@/composables/useEditActions'
import { useValidation } from '@/composables/useValidation'
import { useFeaturedStore } from '@/stores/featured'
import { useNotificationStore } from '@/stores/notification'
import { getImageUrl } from '@/utils/helpers'
import { Icon } from '@iconify/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { reactive, ref, watch } from 'vue'

const notificationStore = useNotificationStore()
const featuredStore = useFeaturedStore()
const { id: featuredId, cancel: featuredCancel } = useEditActions()
const { featuredSchema } = useValidation()

const imageRef = ref(null)
const featuredData = reactive({ title: '', description: '' })

const { errors, handleSubmit, submitCount } = useForm({
  validationSchema: toTypedSchema(featuredSchema),
})

const { value: image, errorMessage: imageError } = useField('image')

const resetForm = () => {
  featuredData.title = ''
  image.value = ''
  featuredData.description = ''
}

async function uploadImage(event) {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('photo', file)
  try {
    const { data } = await request.post('/api/featured/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    image.value = data[1]
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Image upload failed')
    console.error('Image upload failed', error)
  }
}

const handleFeatured = handleSubmit(async () => {
  try {
    const payload = {
      title: featuredData.title,
      description: featuredData.description,
      image: image.value,
    }
    const response = featuredId.value
      ? await request.put('/api/featured/update/' + featuredId.value, payload)
      : await request.post('/api/featured/add', payload)
    notificationStore.isError = false
    notificationStore.showNotification(
      response.data?.message || featuredId.value
        ? 'Featured edited successfully'
        : 'Featured added successfully',
    )
    featuredStore.getFeatured()
    resetForm()
    featuredCancel()
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
    console.error(error)
  }
})

watch(
  featuredId,
  async (newId) => {
    if (newId) {
      await featuredStore.getSingleFeatured(newId)
      const featured = featuredStore.singleFeatured
      if (featured) {
        featuredData.title = featured.title
        featuredData.description = featured.description
        image.value = featured.image
      }
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const removeImage = () => {
  return (image.value = '')
}
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto">
    <h2 class="text-center text-3xl font-medium">
      {{ featuredId ? 'Update this featured' : 'Add new featured' }}
    </h2>
    <form
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
      @submit.prevent="handleFeatured"
    >
      <div class="flex flex-col gap-1 w-full">
        <label>Upload image<span class="text-red-600 px-0.5">*</span></label>
        <div v-if="image" class="w-full h-[300px] shrink-0 relative">
          <img
            :src="getImageUrl('featured', image)"
            class="w-full h-full border border-gray-300 rounded-md object-cover"
          />
          <div @click="removeImage" class="absolute right-0 top-0 p-2">
            <Icon icon="nimbus:close" width="20" height="20" class="text-red-600 cursor-pointer" />
          </div>
        </div>
        <div v-else class="w-full h-[300px] shrink-0 relative" @click="imageRef?.click()">
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
        <FormError v-if="submitCount > 0" :error="imageError" />
      </div>
      <div class="flex flex-col w-full">
        <label>Title</label>
        <input v-model="featuredData.title" class="custom-input w-full px-3 py-2.5" />
      </div>
      <div class="flex flex-col w-full">
        <div class="flex flex-col w-full">
          <label>Description</label>
          <textarea
            v-model="featuredData.description"
            class="custom-input w-full px-3 py-2.5 min-h-52 max-h-[500px]"
          ></textarea>
        </div>
      </div>
      <div class="flex justify-between gap-2 w-full transition-all">
        <button
          v-if="featuredId"
          @click="featuredCancel"
          class="min-w-42 w-full my-4 h-11 save-button"
        >
          Cancel
        </button>
        <button class="min-w-42 w-full my-4 h-11 save-button">
          {{ featuredId ? 'Save Changes' : 'Add Featured' }}
        </button>
      </div>
    </form>
  </div>
</template>
