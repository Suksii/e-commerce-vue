<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Notification from './components/Notification.vue'
import { useNotificationStore } from './stores/notification'
import { onMounted, watch } from 'vue'
import { useProfile } from './stores/profile'
import AdminSidebar from './components/AdminSidebar.vue'

const route = useRoute()
const notificationStore = useNotificationStore()
const profileStore = useProfile()

watch(
  () => route.path,
  async () => {
    await profileStore.userProfile()
  },
  { immediate: true },
)
</script>

<template>
  <Notification
    positionClass="top-0 left-1/2 -translate-x-1/2"
    :message="notificationStore.message || 'No messages to display'"
  />
  <div class="flex flex-col">
    <Navbar v-if="route.name !== 'login' && route.name !== 'register'" />
    <div class="flex">
      <AdminSidebar />
      <div class="flex justify-center w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>
