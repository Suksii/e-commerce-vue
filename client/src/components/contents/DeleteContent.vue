<script setup>
import ButtonLoading from '@/loading/ButtonLoading.vue'

defineProps({
  item: String,
  loading: Boolean,
})

defineEmits(['cancel', 'delete'])
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Delete confirm</h2>
      <p class="text-gray-600 mb-6">
        Are you sure that you want to delete <span class="font-medium">{{ item }}</span
        >?
      </p>
      <div class="flex justify-end space-x-4">
        <button @click="$emit('cancel')" class="px-4 py-2 close-button">Cancel</button>
        <button
          :disabled="loading"
          @click="$emit('delete')"
          class="px-4 py-2 delete-button min-w-28"
        >
          <ButtonLoading v-if="loading" />
          <span v-else>Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>
