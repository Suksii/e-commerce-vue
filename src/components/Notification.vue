<script setup>
defineProps({ showNotification: Boolean })
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-1000"
    leave-active-class="transition-all duration-1000"
    enter-to-class="opacity-100 translate-y-0"
    enter-from-class="opacity-0 translate-y-full"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
    mode="out-in"
  >
    <div
      v-if="showNotification"
      class="fixed bottom-0 right-0 m-6 bg-white px-12 py-4 rounded-md shadow-[0px_10px_20px_rgba(0,0,0,0.3)]"
    >
      <p>Notification Message</p>
    </div>
  </Transition>
</template>
