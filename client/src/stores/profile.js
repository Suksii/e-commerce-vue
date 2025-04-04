import { request } from '@/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProfile = defineStore('profile', () => {
  const currentUser = ref(null)
  const isAuthenticated = computed(() => !!currentUser.value)
  async function userProfile() {
    try {
      const { data } = await request.get('/api/users/profile')
      console.log(data)
      currentUser.value = data
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      currentUser.value = null
    }
  }
  return { userProfile, currentUser, isAuthenticated }
})
