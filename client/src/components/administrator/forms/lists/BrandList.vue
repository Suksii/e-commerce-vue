<script setup>
import { request } from '@/api'
import DeleteContent from '@/components/DeleteContent.vue'
import { useEditActions } from '@/composables/useEditActions'
import { useModal } from '@/composables/useModal'
import { useBrandStore } from '@/stores/brands'
import { useNotificationStore } from '@/stores/notification'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

const brandStore = useBrandStore()
const notificationStore = useNotificationStore()
const displayedAction = ref(null)
const { handleEdit: handleBrandEdit } = useEditActions()
const { showModal, handleCloseModal, handleShowModal } = useModal()

const handleDelete = async (id) => {
  try {
    const response = await request.delete('/api/brand/delete/' + id)
    notificationStore.isError = false
    notificationStore.showNotification(response.data?.message || 'Brand deleted successfully')
    brandStore.fetchBrands()
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response?.data?.message || 'Failed to delete brand')
    console.error(error)
  }
}
const showActions = (id) => {
  displayedAction.value = id
}
const hideAction = () => {
  displayedAction.value = null
}

onMounted(() => {
  brandStore.fetchBrands()
})
</script>

<template>
  <div class="px-12">
    <h3 class="text-center text-3xl font-medium">All Brands</h3>
    <div class="flex flex-wrap justify-center gap-6 p-8">
      <div
        v-for="brand in brandStore.brandData"
        :key="brand._id"
        @mouseenter="showActions(brand._id)"
        @mouseleave="hideAction"
        class="relative flex flex-col items-center justify-center gap-2 py-2 w-[300px] bg-white rounded-md overflow-hidden hover:ring-2 hover:ring-teal-600 transition group"
      >
        <img
          :src="'http://localhost:3000/uploads/brands/' + brand.image"
          :alt="brand.name"
          class="text-center w-54 h-54 object-contain mb-2 p-2"
        />
        <p class="text-3xl font-medium text-center">{{ brand.name }}</p>
        <div
          v-if="displayedAction === brand._id"
          class="absolute left-0 top-0 p-3 m-2 bg-teal-600/80 rounded-full cursor-pointer"
          @click="handleBrandEdit(brand._id)"
        >
          <Icon icon="lucide:edit" width="28" height="28" class="text-white" />
        </div>
        <div
          v-if="displayedAction === brand._id"
          class="absolute right-0 top-0 p-3 m-2 bg-red-600/80 rounded-full cursor-pointer"
          @click="handleShowModal(brand._id)"
        >
          <Icon icon="fluent:delete-28-filled" width="28" height="28" class="text-white" />
        </div>
        <DeleteContent
          v-if="showModal === brand._id"
          @cancel="handleCloseModal"
          @delete="handleDelete(brand._id)"
          :item="brand.name"
        />
      </div>
    </div>
  </div>
</template>
