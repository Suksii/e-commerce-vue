<script setup>
import { request } from '@/api'
import DeleteContent from '@/components/DeleteContent.vue'
import { useEditActions } from '@/composables/useEditActions'
import { useModal } from '@/composables/useModal'
import { useFeaturedStore } from '@/stores/featured'
import { useNotificationStore } from '@/stores/notification'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

const featuredStore = useFeaturedStore()
const notificationStore = useNotificationStore()
const { handleEdit: handleFeaturedEdit } = useEditActions()
const displayedAction = ref(null)
const { showModal, handleShowModal, handleCloseModal } = useModal()

const showActions = (id) => {
  displayedAction.value = id
}
const hideAction = () => {
  displayedAction.value = null
}

const handleDelete = async (id) => {
  try {
    const response = await request.delete('/api/featured/delete/' + id)
    notificationStore.isError = false
    notificationStore.showNotification(response.data?.message || 'Featured deleted successfully')
    featuredStore.getFeatured()
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response?.data?.message || 'Failed to delete featured')
    console.error(error)
  }
}

onMounted(() => {
  featuredStore.getFeatured()
})
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto">
    <h3 class="text-center text-3xl font-medium py-4">All Featured</h3>
    <div class="flex flex-wrap justify-center gap-6">
      <div
        v-for="featured in featuredStore.featuredData"
        :key="featured._id"
        @mouseenter="showActions(featured._id)"
        @mouseleave="hideAction"
        class="relative flex justify-center gap-2 w-full max-h-[350px] bg-white overflow-hidden transition group"
      >
        <div
          v-if="
            (featured.title && featured.title.length > 0) ||
            (featured.description && featured.description.length > 0)
          "
          class="flex items-center justify-center flex-1"
        >
          <div class="flex flex-col items-center justify-center">
            <h2 class="text-2xl font-medium">{{ featured.title }}</h2>
            <p class="">{{ featured.description }}</p>
          </div>
        </div>
        <div class="flex-2">
          <img
            :src="'http://localhost:3000/uploads/featured/' + featured.image"
            :alt="featured.name"
            class="text-center w-full object-contain"
          />
        </div>

        <div
          v-if="displayedAction === featured._id"
          class="absolute left-0 top-0 p-3 bg-teal-600/80 rounded-full cursor-pointer"
          @click="handleFeaturedEdit(featured._id)"
        >
          <Icon icon="lucide:edit" width="28" height="28" class="text-white" />
        </div>
        <div
          v-if="displayedAction === featured._id"
          class="absolute right-0 top-0 p-3 bg-red-600/80 rounded-full cursor-pointer"
          @click="handleShowModal(featured._id)"
        >
          <Icon icon="fluent:delete-28-filled" width="28" height="28" class="text-white" />
        </div>
        <DeleteContent
          v-if="showModal === featured._id"
          @cancel="handleCloseModal"
          @delete="handleDelete(featured._id)"
          :item="featured.name"
        />
      </div>
    </div>
  </div>
</template>
