import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
  const isNotificationShown = ref(false)
  const message = ref('')
  const isError = ref(false)
  function showNotification(msg) {
    isNotificationShown.value = true
    message.value = msg
    setTimeout(() => {
      isNotificationShown.value = false
      message.value = ''
    }, 2000)
  }

  return { showNotification, isNotificationShown, isError, message }
})
