<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { Icon } from '@iconify/vue'
import { useNotificationStore } from '@/stores/notification'
import { request } from '@/api'
import cartImage from '@/assets/cartImage.jpg'
import { useValidation } from '@/composables/useValidation'

const router = useRouter()
const isPasswordVisible = ref(false)
const notificationStore = useNotificationStore()

const { loginSchema } = useValidation()

const { errors, handleSubmit } = useForm({ validationSchema: toTypedSchema(loginSchema) })

const { value: username } = useField('username')
const { value: password } = useField('password')

const handleLogin = handleSubmit(async () => {
  try {
    const response = await request.post('/api/users/login', {
      username: username.value,
      password: password.value,
    })

    notificationStore.isError = false
    notificationStore.showNotification(response.data.message || 'Logged in successfully')
    router.push('/')
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message || 'Login failed')
    console.error('Login error', error.response.data.message)
  }
})
</script>

<template>
  <div class="register-container">
    <div
      class="max-w-2xl min-h-96 h-fit shadow-2xl p-8 rounded-xl w-[95%] mx-auto flex flex-col md:flex-row gap-6 bg-white/90"
    >
      <div class="flex flex-col justify-center items-center flex-1 space-y-6">
        <h2 class="text-3xl font-semibold italic">Login</h2>
        <p class="text-gray-700 text-lg">
          Don't have an account?
          <span
            class="text-teal-600 hover:text-teal-500 transition duration-300 italic cursor-pointer"
            @click="router.push('/register')"
            >Register now</span
          >
        </p>
        <form
          class="flex flex-col items-center justify-center gap-4 w-full"
          @submit.prevent="handleLogin"
        >
          <div class="w-full">
            <input
              type="text"
              v-model="username"
              placeholder="Type username"
              class="py-3 px-4 w-full custom-input"
            />
            <p v-if="errors.username" class="text-red-500 text-sm mt-1">
              {{ errors.username }}
            </p>
          </div>
          <div class="w-full">
            <div class="relative w-full">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="password"
                placeholder="Type password"
                class="py-3 px-4 w-full custom-input inset-0"
              />
              <Icon
                :icon="isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'"
                width="24"
                height="24"
                class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-gray-500"
                @click="isPasswordVisible = !isPasswordVisible"
                v-if="password"
              />
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>
          <button class="register-button group">
            <span class=""></span>
            <span class=""></span>
            <span class="">Login</span>
          </button>
        </form>
      </div>
      <div class="flex-1 hidden md:block">
        <img :src="cartImage" class="object-cover rounded-xl w-full" />
      </div>
    </div>
  </div>
</template>
