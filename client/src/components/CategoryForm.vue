<script setup>
import { Icon } from '@iconify/vue'
import CustomSelect from './CustomSelect.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { useEditActions } from '@/composables/useEditActions'
import { useCategoryStore } from '@/stores/categories'

const notificationStore = useNotificationStore()
const categoryStore = useCategoryStore()
const imageRef = ref(null)
const { id: categoryId, cancel: categoryCancel } = useEditActions()
const categoryData = reactive({
  name: '',
  slug: '',
  image: [],
  parentCategory: [],
  selectedCategory: '',
})
const fetchParentCategories = async () => {
  try {
    const { data } = await request.get('/api/category/parent')
    categoryData.parentCategory = data.map((category) => ({
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

    categoryData.image = data[1]
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Image upload failed')
    console.error('Image upload failed', error)
  }
}

async function handleCategory() {
  try {
    const payload = {
      name: categoryData.name,
      image: categoryData.image,
      slug: categoryData.name.toLowerCase().replaceAll(' ', '-'),
      parentCategory: categoryData.selectedCategory || null,
    }
    const response = categoryId.value
      ? await request.put('/api/category/update/' + categoryId.value, payload)
      : await request.post('/api/category/add', payload)
    notificationStore.isError = false
    notificationStore.showNotification(
      response.data.message || categoryId
        ? 'Category edited successfully'
        : 'Category added successfully',
    )
    categoryStore.fetchCategories()
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
    console.error(error)
  }
}
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto py-24">
    <h2 class="text-center text-4xl font-medium">
      {{ categoryId ? 'Update this category' : 'Add new category' }}
    </h2>
    <form
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
      @submit.prevent="handleCategory"
    >
      <div class="flex flex-col gap-2 w-full">
        <p class="text-xl font-medium">Upload image<span class="text-red-600 px-0.5"></span></p>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div
            v-if="categoryData.image && categoryData.image.length"
            class="w-42 md:w-40 aspect-square relative"
          >
            <img
              :src="'http://localhost:3000/uploads/categories/' + categoryData.image"
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
        <input v-model="categoryData.name" class="custom-input w-full p-4" />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Main Category</label>
        <CustomSelect
          v-model:selectedOption="categoryData.selectedCategory"
          :options="categoryData.parentCategory"
        />
      </div>
      <div class="flex justify-between gap-2 w-full transition-all">
        <button
          v-if="categoryId"
          @click="categoryCancel"
          class="min-w-42 w-full my-4 h-14 save-button"
        >
          Cancel
        </button>
        <button class="min-w-42 w-full my-4 h-14 save-button">
          {{ categoryId ? 'Save Changes' : 'Add Category' }}
        </button>
      </div>
    </form>
  </div>
</template>
