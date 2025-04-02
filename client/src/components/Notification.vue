<script setup>
import { useNotificationStore } from '@/stores/notification'
import { Icon } from '@iconify/vue'
defineProps({
  message: String,
  positionClass: String,
})
const store = useNotificationStore()
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300"
    leave-active-class="transition-all duration-300"
    enter-to-class="opacity-100 translate-y-0"
    enter-from-class="opacity-0 translate-y-full"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
    mode="out-in"
  >
    <div
      v-if="store.isNotificationShown"
      class="fixed flex justify-center items-center m-6 bg-white px-12 py-4 min-h-20 min-w-82 rounded-md shadow-[0px_10px_20px_rgba(0,0,0,0.3)] border-b-8 z-50"
      :class="[positionClass, store.isError ? 'border-red-700' : 'border-green-700']"
    >
      <div class="flex items-center gap-2">
        <Icon
          :icon="store.isError ? 'ix:error-filled' : 'ix:success-filled'"
          width="32"
          height="32"
          :class="store.isError ? 'text-red-700' : 'text-green-700'"
        />
        <p class="text-xl">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>
