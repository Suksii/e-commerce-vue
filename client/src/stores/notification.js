import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
  const isNotificationShown = ref(false)
  function showNotification() {
    isNotificationShown.value = true
    setTimeout(() => {
      isNotificationShown.value = false
    }, 2000)
  }

  return { showNotification, isNotificationShown }
})
