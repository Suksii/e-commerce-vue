<script setup>
import { Icon } from '@iconify/vue'
import { useEditActions } from '@/composables/useEditActions'
import { useModal } from '@/composables/useModal'
import DeleteContent from '../contents/DeleteContent.vue'
import { useHoverActions } from '@/composables/useHoverActions'

defineProps({
  featured: Object,
  loading: Boolean,
})

const emit = defineEmits(['delete'])

const { handleEdit: handleFeaturedEdit } = useEditActions()
const { showModal, handleShowModal, handleCloseModal } = useModal()
const { displayedAction, showActions, hideActions } = useHoverActions()
</script>

<template>
  <div
    @mouseenter="showActions(featured._id)"
    @mouseleave="hideActions"
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
        :src="featured.image"
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
      @delete="emit('delete', featured._id)"
      :item="featured.name"
      :loading="loading"
    />
  </div>
</template>
