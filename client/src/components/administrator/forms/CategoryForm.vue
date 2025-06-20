<script setup>
import { Icon } from '@iconify/vue'
import { onMounted, ref, watch } from 'vue'
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { useEditActions } from '@/composables/useEditActions'
import { useCategoryStore } from '@/stores/categories'
import CustomSelect from '@/components/customInputs/CustomSelect.vue'
import { useValidation } from '@/composables/useValidation'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import FormError from '@/components/FormError.vue'
import ButtonLoading from '@/loading/ButtonLoading.vue'

const notificationStore = useNotificationStore()
const categoryStore = useCategoryStore()
const { categorySchema } = useValidation()
const imageRef = ref(null)
const { id: categoryId, cancel: categoryCancel } = useEditActions()

const { errors, handleSubmit, submitCount } = useForm({
  validationSchema: toTypedSchema(categorySchema),
})

const { value: name, errorMessage: nameError } = useField('name')
function resetForm() {
  name.value = ''
  categoryStore.categoryData.image = ''
  categoryStore.categoryData.selectedCategory = ''
  categoryStore.categoryData.slug = ''
}
const fetchParentCategories = async () => {
  try {
    const { data } = await request.get('/api/category/parent')
    categoryStore.categoryData.parentCategory = data.map((category) => ({
      name: category.name,
      _id: category._id,
    }))
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Error while fetching data')
    console.error('Error while fetching data:', error)
  }
}
onMounted(() => {
  fetchParentCategories()
})

async function uploadImage(event) {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('photo', file)
  try {
    const { data } = await request.post('/api/category/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    categoryStore.categoryData.image = data.url
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Image upload failed')
    console.error('Image upload failed', error)
  }
}

const handleCategory = handleSubmit(async () => {
  categoryId
    ? (categoryStore.loading.updateCategory = true)
    : (categoryStore.loading.addCategory = true)
  try {
    const payload = {
      name: name.value,
      image: categoryStore.categoryData.image,
      slug: name.value.toLowerCase().replaceAll(' ', '-'),
      parentCategory: categoryStore.categoryData.selectedCategory || null,
    }
    const response = categoryId.value
      ? await request.put('/api/category/update/' + categoryId.value, payload)
      : await request.post('/api/category/add', payload)
    notificationStore.isError = false
    notificationStore.showNotification(
      response.data.message || categoryId.value
        ? 'Category edited successfully'
        : 'Category added successfully',
    )
    categoryStore.fetchCategories()
    resetForm()
    categoryCancel()
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
    console.error(error)
  } finally {
    categoryId
      ? (categoryStore.loading.updateCategory = false)
      : (categoryStore.loading.addCategory = false)
  }
})

watch(
  categoryId,
  async (newId) => {
    if (newId) {
      await categoryStore.getSingleCategory(newId)
      const category = categoryStore.singleCategoryData
      if (category) {
        name.value = category.name
        categoryStore.categoryData.image = category.image
        categoryStore.categoryData.selectedCategory = category.parentCategory || ''
        console.log(categoryStore.categoryData.selectedCategory, category.parentCategory)
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
      {{ categoryId ? 'Update this category' : 'Add new category' }}
    </h2>
    <form
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
      @submit.prevent="handleCategory"
    >
      <div class="flex flex-col gap-1 w-full">
        <label>Upload image</label>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div
            v-if="categoryStore.categoryData.image && categoryStore.categoryData.image.length"
            class="w-32 md:w-36 aspect-square relative"
          >
            <img
              :src="categoryStore.categoryData.image"
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
        <FormError v-if="submitCount > 0" :error="nameError" />
      </div>
      <div class="flex flex-col w-full">
        <label>Main Category</label>
        <CustomSelect
          v-model:selectedOption="categoryStore.categoryData.selectedCategory"
          :options="categoryStore.categoryData.parentCategory"
          :showDiselect="true"
        />
      </div>
      <div class="flex justify-between gap-2 w-full transition-all">
        <button
          v-if="categoryId"
          @click="categoryCancel"
          class="min-w-42 w-full my-4 h-11 save-button"
        >
          Cancel
        </button>
        <button class="min-w-42 w-full my-4 h-11 save-button">
          <ButtonLoading
            v-if="categoryStore.loading.addCategory || categoryStore.loading.updateCategory"
          />
          <span v-else>{{ categoryId ? 'Save Changes' : 'Add Category' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>
