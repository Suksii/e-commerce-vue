<script setup>
import { useRouter } from 'vue-router'
import onlineShoping from '@/assets/onlineShoping.jpg'
import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { request } from '@/api'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const store = useNotificationStore()

async function handleRegister() {
  try {
    const response = await request.post('/api/users/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    })
    store.showNotification(response.data.message || 'User created successfully')
    store.isError = false
    router.push('/login')
  } catch (error) {
    store.showNotification(error.response.data.message || 'Registration failed')
    store.isError = true
    console.error('Registration error:', error.response.data.message)
  }
}
</script>

<template>
  <div class="register-container">
    <div
      class="max-w-2xl min-h-96 h-fit shadow-2xl p-8 rounded-xl w-[95%] mx-auto flex flex-col md:flex-row gap-6 bg-white/90"
    >
      <div class="flex flex-col justify-center items-center flex-1 space-y-6">
        <h2 class="text-3xl font-semibold italic">Create an account</h2>
        <p class="text-gray-700 text-lg">
          Already have an account?
          <span
            class="text-teal-600 hover:text-teal-500 transition duration-300 italic cursor-pointer"
            @click="router.push('/login')"
            >Login now</span
          >
        </p>
        <form
          class="flex flex-col items-center justify-center gap-4 w-full"
          @submit.prevent="handleRegister"
        >
          <input
            type="text"
            placeholder="Type username"
            v-model="username"
            class="py-3 px-4 w-full custom-input"
          />
          <input
            type="email"
            placeholder="Type email"
            v-model="email"
            class="py-3 px-4 w-full custom-input"
          />
          <input
            type="password"
            placeholder="Type password"
            v-model="password"
            class="py-3 px-4 w-full custom-input"
          />
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm password"
            class="py-3 px-4 w-full custom-input"
          />
          <button class="register-button group">
            <span class=""></span>
            <span class=""></span>
            <span class="">Register</span>
          </button>
        </form>
      </div>
      <div class="flex-1 hidden md:block">
        <img :src="onlineShoping" class="object-cover rounded-xl w-full" />
      </div>
    </div>
  </div>
</template>
