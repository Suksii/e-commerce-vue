<script setup>
defineProps({
  customClass: String,
})
</script>
<template>
  <div
    class="min-w-64 w-full flex flex-col justify-center items-center p-4 shadow-[0px_10px_30px_rgba(100,100,100,0.5)] bg-white rounded-md z-10"
    :class="customClass"
  >
    <slot></slot>
  </div>
</template>
