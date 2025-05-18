<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  showFilters: Boolean,
})

const emit = defineEmits(['update:showFilters'])
</script>

<template>
  <div
    class="bg-teal-700 fixed inset-0 z-40 transition duration-300 transform"
    :class="showFilters ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="bg-white flex items-center justify-between p-4">
      <p class="uppercase font-medium text-sm text-teal-700">Filter & Sort</p>
      <Icon
        icon="streamline:delete-1-solid"
        width="16"
        height="16"
        class="cursor-pointer text-teal-700"
        @click="emit('update:showFilters', false)"
      />
    </div>
  </div>
</template>
