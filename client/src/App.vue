<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Notification from './components/Notification.vue'
import { useNotificationStore } from './stores/notification'
import AdminSidebar from './components/administrator/AdminSidebar.vue'
import DeleteContent from './components/DeleteContent.vue'

const route = useRoute()
const notificationStore = useNotificationStore()
</script>

<template>
  <Notification
    positionClass="top-0 left-1/2 -translate-x-1/2"
    :message="notificationStore.message || 'No messages to display'"
  />
  <div class="flex flex-col">
    <Navbar v-if="route.name !== 'login' && route.name !== 'register'" />
    <div class="flex">
      <AdminSidebar v-if="route.name !== 'login' && route.name !== 'register'" />
      <div class="flex justify-center w-full overflow-x-hidden">
        <RouterView />
      </div>
    </div>
  </div>
</template>
