<script setup>
defineProps({
  error: String,
})
</script>

<template>
  <p v-if="error" class="text-red-500 text-sm mt-1">
    {{ error }}
  </p>
</template>
