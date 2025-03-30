<script setup>
import CardList from '@/components/CardList.vue'
import Notification from '@/components/Notification.vue'
import { ref } from 'vue'
const showNotification = ref(false)

const show = () => {
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <CardList />
    <button @click="show">Show nottification</button>
    <Notification :showNotification="showNotification" />
  </div>
</template>
