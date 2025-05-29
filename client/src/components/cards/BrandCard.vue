<script setup>
import { useEditActions } from '@/composables/useEditActions'
import { useModal } from '@/composables/useModal'
import { getImageUrl } from '@/utils/helpers'
import DeleteContent from '../contents/DeleteContent.vue'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps({
  brand: Object,
})

const emit = defineEmits(['delete'])

const displayedAction = ref(null)

const { handleEdit: handleBrandEdit } = useEditActions()
const { showModal, handleCloseModal, handleShowModal } = useModal()

const showActions = (id) => {
  displayedAction.value = id
}
const hideAction = () => {
  displayedAction.value = null
}
</script>

<template>
  <div
    @mouseenter="showActions(brand._id)"
    @mouseleave="hideAction"
    class="relative flex flex-col items-center justify-center gap-2 py-2 w-[300px] bg-white rounded-md overflow-hidden hover:ring-2 hover:ring-teal-600 transition group"
  >
    <img
      :src="getImageUrl('brands', brand.image)"
      :alt="brand.name"
      loading="lazy"
      class="text-center w-54 h-54 object-contain mb-2 p-2"
    />
    <p class="text-3xl font-medium text-center">{{ brand.name }}</p>
    <div
      v-show="displayedAction === brand._id"
      class="absolute top-0 m-2 px-2 flex justify-between w-full"
    >
      <button
        @click="handleBrandEdit(brand._id)"
        class="p-3 bg-teal-600/80 rounded-full cursor-pointer"
      >
        <Icon icon="lucide:edit" width="28" height="28" class="text-white" />
      </button>
      <button
        v-if="displayedAction === brand._id"
        @click="handleShowModal(brand._id)"
        class="p-3 bg-red-600/80 rounded-full cursor-pointer"
      >
        <Icon icon="fluent:delete-28-filled" width="28" height="28" class="text-white" />
      </button>
    </div>
    <DeleteContent
      v-if="showModal === brand._id"
      @cancel="handleCloseModal"
      @delete="emit('delete', brand._id)"
      :item="brand.name"
    />
  </div>
</template>
