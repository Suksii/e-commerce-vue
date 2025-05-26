import { request } from '@/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProfile = defineStore('profile', () => {
  const currentUser = ref(null)
  const isAdmin = ref(false)
  const isAuthenticated = computed(() => !!currentUser.value)
  async function userProfile() {
    try {
      const { data } = await request.get('/api/users/profile')

      currentUser.value = data
      if (currentUser.value.isAdmin) isAdmin.value = true
      else isAdmin.value = false
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      currentUser.value = null
    }
  }
  return { userProfile, currentUser, isAuthenticated }
})
