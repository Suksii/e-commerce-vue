<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Notification from './components/Notification.vue'
import { useNotificationStore } from './stores/notification'

const route = useRoute()
const store = useNotificationStore()
</script>

<template>
  <Notification
    positionClass="top-0 left-1/2 -translate-x-1/2"
    :message="store.message || 'No messages to display'"
  />
  <Navbar v-if="route.name !== 'login' && route.name !== 'register'" />
  <RouterView />
</template>
