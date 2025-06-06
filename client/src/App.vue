<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Notification from './components/Notification.vue'
import { useNotificationStore } from './stores/notification'
import AdminSidebar from './components/administrator/AdminSidebar.vue'
import { useProfile } from './stores/profile'

const route = useRoute()
const notificationStore = useNotificationStore()
const profileStore = useProfile()
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
      <div
        class="flex justify-center overflow-x-hidden"
        :class="
          profileStore.isAdmin || route.name === 'login' || route.name === 'register'
            ? 'w-full'
            : 'max-w-7xl mx-auto'
        "
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>
