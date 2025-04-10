<script setup>
import { request } from '@/api'
import router from '@/router'
import { useNotificationStore } from '@/stores/notification'
import { useProfile } from '@/stores/profile'
import { Icon } from '@iconify/vue'
import { ref, watchEffect } from 'vue'

const notificationStore = useNotificationStore()
const profileStore = useProfile()
const username = ref('')

defineProps({
  showProfileModal: Boolean,
})

const emit = defineEmits(['update:showProfileModal'])

watchEffect(async () => {
  if (!profileStore.currentUser) {
    await profileStore.userProfile()
  }
  username.value = profileStore.currentUser?.username || ''
})

async function handleLogout() {
  try {
    const response = await request.post('api/users/logout')
    notificationStore.isError = false
    emit('update:showProfileModal', false)
    notificationStore.showNotification(response.data.message)
    profileStore.currentUser = null
    router.push('/login')
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification('Failed to logout')

    console.error('Failed to logout', error)
  }
}
async function updateUser(id) {
  try {
    const response = await request.patch('/api/users/update-user/' + id, {
      username: username.value,
    })
    notificationStore.isError = response.data?.message === 'Username has already been taken'
    notificationStore.showNotification(response.data?.message || 'Username successfully changed')
    await profileStore.userProfile()
    emit('update:showProfileModal', false)
  } catch (error) {
    console.error('Failed to update username:', error)
    notificationStore.isError = true
    notificationStore.showNotification(error.response?.data?.message || 'Failed to update username')
  }
}
</script>

<template>
  <div v-if="profileStore.currentUser" class="w-full lg:w-[420px]">
    <h3 class="text-2xl font-semibold pb-6">Hello, {{ profileStore?.currentUser?.username }}</h3>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <label class="text-gray-600 font-medium">Email</label>
        <input
          disabled
          class="p-2 bg-gray-200 custom-input w-[220px]"
          :value="profileStore?.currentUser?.email"
        />
      </div>
      <div class="flex justify-between items-center">
        <label class="text-gray-600 font-medium">Username</label>
        <input class="p-2 bg-gray-200 custom-input w-[220px]" v-model="username" />
      </div>
      <div class="flex justify-between items-center gap-1 pt-4">
        <button
          @click="handleLogout"
          class="bg-red-500/20 px-4 py-2 rounded-md cursor-pointer text-red-800 font-medium shadow-md flex items-center gap-2 transition-all duration-200 hover:bg-red-600/90 hover:text-white hover:shadow-lg"
        >
          <Icon icon="material-symbols:logout" width="24" height="24" />
          Logout
        </button>
        <div class="flex gap-3">
          <button @click="emit('update:showProfileModal', false)" class="close-button">
            Close
          </button>
          <button class="min-w-24 save-button" @click="updateUser(profileStore.currentUser._id)">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <button class="min-w-24 save-button" @click="router.push('/login')">Login</button>
  </div>
</template>
