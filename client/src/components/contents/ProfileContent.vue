<script setup>
import { watchEffect } from 'vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
import { useProfile } from '@/stores/profile'

const profileStore = useProfile()

defineProps({
  showProfileModal: Boolean,
})

const emit = defineEmits(['update:showProfileModal'])

watchEffect(async () => {
  if (!profileStore.currentUser) {
    await profileStore.userProfile()
  }
  profileStore.username = profileStore.currentUser?.username || ''
})

function logout() {
  profileStore.handleLogout()
  emit('update:showProfileModal', false)
}
function update(userId) {
  profileStore.updateUser(userId)
  emit('update:showProfileModal', false)
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
        <input class="p-2 bg-gray-200 custom-input w-[220px]" v-model="profileStore.username" />
      </div>
      <div class="flex justify-between items-center gap-1 pt-4">
        <button
          @click="logout"
          class="bg-red-500/20 px-4 py-2 rounded-md cursor-pointer text-red-800 font-medium shadow-md flex items-center gap-2 transition-all duration-200 hover:bg-red-600/90 hover:text-white hover:shadow-lg"
        >
          <Icon icon="material-symbols:logout" width="24" height="24" />
          Logout
        </button>
        <div class="flex gap-3">
          <button @click="emit('update:showProfileModal', false)" class="close-button">
            Close
          </button>
          <button class="min-w-24 save-button" @click="update(profileStore.currentUser._id)">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center gap-2 py-2">
    <button class="min-w-24 close-button grow" @click="router.push('/register')">Sign Up</button>
    <button class="min-w-24 save-button grow" @click="router.push('/login')">Sign In</button>
  </div>
</template>
