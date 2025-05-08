<script setup>
defineProps({
  customClass: String,
})
</script>
<template>
  <div
    class="w-[90%] my-6 lg:w-fit p-4 shadow-[0px_10px_30px_rgba(100,100,100,0.5)] bg-white rounded-md z-40"
    :class="customClass"
  >
    <slot></slot>
  </div>
</template>
