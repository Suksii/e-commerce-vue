<script setup lang="ts">
import { AtomSpinner } from 'epic-spinners'
</script>

<template>
  <div class="fixed inset-0 flex bg-black/10 justify-center items-center">
    <AtomSpinner :animation-duration="1000" :size="60" color="#0d9488" />
  </div>
</template>
