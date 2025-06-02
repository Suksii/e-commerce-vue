import { request } from '@/api'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useNotificationStore } from './notification'
import { useRouter } from 'vue-router'

export const useProfile = defineStore('profile', () => {
  const router = useRouter()
  const notificationStore = useNotificationStore()

  const currentUser = ref(null)
  const isAdmin = ref(false)
  const username = ref('')
  const usersData = ref([])

  const loading = reactive({
    getUsers: false,
    logoutUser: false,
    updateUser: false,
  })

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

  async function handleLogout() {
    loading.logoutUser = true
    try {
      const response = await request.post('api/users/logout')
      notificationStore.isError = false
      notificationStore.showNotification(response.data.message)
      currentUser.value = null
      router.push('/login')
    } catch (error) {
      notificationStore.isError = true
      notificationStore.showNotification('Failed to logout')
      console.error('Failed to logout', error)
    } finally {
      loading.logoutUser = false
    }
  }
  async function updateUser(id) {
    loading.updateUser = true
    try {
      const response = await request.patch('/api/users/update/' + id, {
        username: username.value,
      })
      notificationStore.isError = response.data?.message === 'Username has already been taken'
      notificationStore.showNotification(response.data?.message || 'Username successfully changed')
      await userProfile()
    } catch (error) {
      console.error('Failed to update username:', error)
      notificationStore.isError = true
      notificationStore.showNotification(
        error.response?.data?.message || 'Failed to update username',
      )
    } finally {
      loading.updateUser = false
    }
  }

  async function fetchUsers(sortField, sortOrder) {
    loading.getUsers = true
    try {
      const { data } = await request.get('/api/users', {
        params: {
          sortBy: sortField,
          order: sortOrder,
        },
      })
      usersData.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.getUsers = false
    }
  }

  return {
    userProfile,
    handleLogout,
    updateUser,
    fetchUsers,
    currentUser,
    isAuthenticated,
    username,
    usersData,
    loading,
  }
})
