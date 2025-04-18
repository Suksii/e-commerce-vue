<script setup>
import { Icon } from '@iconify/vue'
import CustomSelect from './CustomSelect.vue'
import { onMounted, reactive, ref } from 'vue'
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const imageRef = ref(null)
const categoryData = reactive({
  name: '',
  slug: '',
  image: [],
  gender: [],
  season: [],
  parentCategory: [],
  selectedGenre: '',
  selectedSeason: '',
})

onMounted(async () => {
  const { data } = await request.get('/api/category/options')
  categoryData.gender = data.gender
  categoryData.season = data.season
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

    categoryData.image = data
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Image upload failed')
    console.error('Image upload failed', error)
  }
}

async function addCategory() {
  try {
    const response = await request.post('/api/category/add', {
      name: categoryData.name,
      image: categoryData.image,
      slug: categoryData.name.toLowerCase().replaceAll(' ', '-'),
      gender: categoryData.selectedGenre,
      season: categoryData.selectedSeason,
      parentCategory: null,
    })
    notificationStore.isError = false
    notificationStore.showNotification(response.data.message || 'Category Successfully added')
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
    console.error(error)
  }
}
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto py-24">
    <h2 class="text-center text-4xl font-medium">Add new category</h2>
    <form
      class="flex flex-col items-center justify-center w-full gap-4 py-12"
      @submit.prevent="addCategory"
    >
      <div class="flex flex-col gap-2 w-full">
        <p class="text-xl font-medium">Upload image<span class="text-red-600 px-0.5"></span></p>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div
            v-if="categoryData.image && categoryData.image.length"
            class="w-42 md:w-40 aspect-square relative"
          >
            <img
              :src="'http://localhost:3000/uploads/' + categoryData.image.join('/')"
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
      <div class="w-full flex gap-2 items-center">
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium"
            >Gender<span class="text-red-600 px-0.5">*</span></label
          >
          <CustomSelect
            v-model:selectedOption="categoryData.selectedGenre"
            :options="categoryData.gender"
          />
        </div>
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium">Season</label>
          <CustomSelect
            v-model:selectedOption="categoryData.selectedSeason"
            :options="categoryData.season"
          />
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Main Category</label>
        <!-- <CustomSelect /> -->
      </div>
      <button class="min-w-42 w-full my-4 h-14 save-button">Add Category</button>
    </form>
  </div>
</template>
