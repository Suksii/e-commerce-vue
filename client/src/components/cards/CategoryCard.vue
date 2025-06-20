<script setup>
import { useEditActions } from '@/composables/useEditActions'
import { useModal } from '@/composables/useModal'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import DeleteContent from '../contents/DeleteContent.vue'
import { useHoverActions } from '@/composables/useHoverActions'

const props = defineProps({
  category: Object,
  loading: Boolean,
})

const emit = defineEmits(['delete'])

const expandCategory = ref(null)
const { handleEdit: handleCategoryEdit } = useEditActions()
const { showModal, handleCloseModal, handleShowModal } = useModal()
const { displayedAction, showActions, hideActions } = useHoverActions()

const expand = (cat) => {
  expandCategory.value = cat
}
const close = () => {
  expandCategory.value = null
}
</script>

<template>
  <div
    @mouseenter="showActions(category._id)"
    @mouseleave="hideActions"
    class="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 group"
  >
    <div class="relative">
      <img
        :src="category.image"
        :alt="category.name"
        loading="lazy"
        class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div @click.stop="expand(category._id)" class="p-6 flex justify-center items-center cursor-pointer">
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
        @click.stop="handleShowModal(category._id)"
      >
        <Icon icon="fluent:delete-28-filled" width="28" height="28" class="text-white" />
      </div>
      <DeleteContent
        v-if="showModal === category._id"
        @cancel="handleCloseModal"
        @delete="emit('delete', category._id)"
        :item="category.name"
        :loading="loading"
      />
      <div
        v-if="expandCategory === category._id && category.subCategories.length"
        class="absolute inset-0 w-full bg-gray-50 flex flex-col"
      >
        <button @click.stop="close" class="flex justify-end p-2 cursor-pointer">
          <Icon icon="iconamoon:close" width="28" height="28" />
        </button>
        <div class="flex flex-col overflow-y-auto">
          <div
            v-for="subCategory in category.subCategories"
            :key="subCategory._id"
            @mouseenter="showActions(subCategory._id)"
            @mouseleave="hideActions"
            class="relative flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition z-20"
          >
            <img
              :src="subCategory.image"
              :alt="subCategory.name"
              loading="lazy"
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
                @click.stop="handleShowModal(subCategory._id)"
              >
                <Icon icon="fluent:delete-28-filled" width="24" height="24" class="text-white" />
              </button>
            </div>
            <DeleteContent
              v-if="showModal === subCategory._id"
              @cancel="handleCloseModal"
              @delete="onDelete(subCategory._id)"
              :item="subCategory.name"
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
