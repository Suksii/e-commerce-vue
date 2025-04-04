import { request } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfile = defineStore('profile', () => {
  const currentUser = ref(null)
  async function userProfile() {
    try {
      const { data } = await request.get('/api/users/profile', { withCredentials: true })
      console.log(data)
      currentUser.value = data
    } catch (error) {
      console.error(error)
    }
  }
  return { userProfile, currentUser }
})
