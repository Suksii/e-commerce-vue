<script setup>
import { useNotificationStore } from '@/stores/notification'
defineProps({
  message: String,
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
      class="fixed bottom-0 right-0 m-6 bg-white px-12 py-4 rounded-md shadow-[0px_10px_20px_rgba(0,0,0,0.3)]"
    >
      <p>{{ message }}</p>
    </div>
  </Transition>
</template>
