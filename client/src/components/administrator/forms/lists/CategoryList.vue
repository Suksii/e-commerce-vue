<script setup>
import { request } from '@/api'
import { useEditActions } from '@/composables/useEditActions'
import { useCategoryStore } from '@/stores/categories'
import { useNotificationStore } from '@/stores/notification'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

const categoryStore = useCategoryStore()
const expandCategory = ref(null)
const displayedAction = ref(null)
const notificationStore = useNotificationStore()
const { handleEdit: handleCategoryEdit } = useEditActions()

const expand = (cat) => {
  expandCategory.value = cat
}
const close = () => {
  expandCategory.value = null
}
const displayAction = (id) => {
  displayedAction.value = id
}
const hideAction = () => {
  displayedAction.value = null
}

async function handleDelete(id) {
  try {
    const response = await request.delete('/api/category/delete/' + id)
    notificationStore.isError = false
    notificationStore.showNotification(response.data.message || 'Category deleted successfully')
    await categoryStore.fetchCategories()
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message || 'Internal Server Error')
    console.error(error)
  }
}

onMounted(async () => {
  await categoryStore.fetchCategories()
})
</script>

<template>
  <div class="container py-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
    <div
      v-for="category in categoryStore.categoriesData"
      :key="category._id"
      @mouseenter="displayAction(category._id)"
      @mouseleave="hideAction"
      @click.stop="expand(category)"
      class="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer group"
    >
      <div class="relative">
        <img
          :src="'http://localhost:3000/uploads/categories/' + category.image"
          :alt="category.name"
          class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="p-6 flex flex-col items-center">
          <p class="text-2xl font-semibold text-gray-800 group-hover:text-teal-600 text-center">
            {{ category.name }}
          </p>
        </div>
        <div
          v-if="displayedAction === category._id"
          @click.stop="handleCategoryEdit(category._id)"
          class="absolute left-0 top-0 p-3 m-2 bg-teal-600/80 rounded-full cursor-pointer"
        >
          <Icon icon="lucide:edit" width="28" height="28" class="text-white" />
        </div>
        <div
          v-if="displayedAction === category._id"
          class="absolute right-0 top-0 p-3 m-2 bg-red-600/80 rounded-full cursor-pointer"
          @click.stop="handleDelete(category._id)"
        >
          <Icon icon="fluent:delete-28-filled" width="28" height="28" class="text-white" />
        </div>
        <div
          v-if="expandCategory === category && category.subCategories.length"
          class="absolute inset-0 w-full bg-gray-50 flex flex-col"
        >
          <button @click.stop="close" class="flex justify-end p-2 cursor-pointer">
            <Icon icon="iconamoon:close" width="28" height="28" />
          </button>
          <div class="flex flex-col overflow-y-auto">
            <div
              v-for="subCategory in category.subCategories"
              :key="subCategory._id"
              @mouseenter="displayAction(subCategory._id)"
              @mouseleave="hideAction"
              class="relative flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition z-20"
            >
              <img
                :src="'http://localhost:3000/uploads/categories/' + subCategory.image"
                :alt="subCategory.name"
                class="w-24 h-20 object-cover rounded-md"
              />
              <p class="text-lg font-medium text-gray-700">{{ subCategory.name }}</p>
              <div
                v-if="displayedAction === subCategory._id"
                class="absolute right-0 top-1/2 -translate-y-1/2 flex gap-4"
              >
                <button
                  @click.stop="handleCategoryEdit(subCategory._id)"
                  class="p-3 bg-teal-600/80 rounded-full cursor-pointer"
                >
                  <Icon icon="lucide:edit" width="24" height="24" class="text-white" />
                </button>
                <button
                  class="p-3 bg-red-600/80 rounded-full cursor-pointer"
                  @click.stop="handleDelete(subCategory._id)"
                >
                  <Icon icon="fluent:delete-28-filled" width="24" height="24" class="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
