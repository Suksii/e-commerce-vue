<script setup>
import { HalfCircleSpinner } from 'epic-spinners'

defineProps({
  spinnerColor: String,
})
</script>

<template>
  <HalfCircleSpinner :animation-duration="1000" :size="20" :color="spinnerColor" />
</template>
