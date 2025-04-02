<script setup>
import CardList from '@/components/CardList.vue'
import Notification from '@/components/Notification.vue'
import { useNotificationStore } from '@/stores/notification'

const store = useNotificationStore()
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <CardList />
  </div>
</template>
