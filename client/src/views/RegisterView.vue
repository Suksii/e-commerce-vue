<script setup>
import { useRouter } from 'vue-router'
import onlineShoping from '@/assets/onlineShoping.jpg'
import { useNotificationStore } from '@/stores/notification'
import { request } from '@/api'
import { useValidation } from '@/composables/useValidation'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import FormError from '@/components/FormError.vue'
import { useProfile } from '@/stores/profile'
import { ref } from 'vue'
import ButtonLoading from '@/loading/ButtonLoading.vue'

const router = useRouter()
const notificationStore = useNotificationStore()

const { registerSchema } = useValidation()
const loading = ref(false)

const { errors, handleSubmit } = useForm({ validationSchema: toTypedSchema(registerSchema) })

const { value: email, errorMessage: emailError } = useField('email')
const { value: username, errorMessage: usernameError } = useField('username')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword')

const handleRegister = handleSubmit(async () => {
  loading.value = true
  try {
    const response = await request.post('/api/users/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    })
    notificationStore.showNotification(response.data.message || 'User created successfully')
    notificationStore.isError = false
    router.push('/login')
  } catch (error) {
    notificationStore.showNotification(error.response.data.message || 'Registration failed')
    notificationStore.isError = true
    console.error('Registration error:', error.response.data.message)
  } finally {
    loading.value = false
  }
})
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
          <div class="w-full">
            <input
              type="text"
              placeholder="Type username"
              v-model="username"
              class="py-3 px-4 w-full custom-input"
            />
            <FormError :error="usernameError" />
          </div>
          <div class="w-full">
            <input
              type="email"
              placeholder="Type email"
              v-model="email"
              class="py-3 px-4 w-full custom-input"
            />
            <FormError :error="emailError" />
          </div>
          <div class="w-full">
            <input
              type="password"
              placeholder="Type password"
              v-model="password"
              class="py-3 px-4 w-full custom-input"
            />
            <FormError :error="passwordError" />
          </div>
          <div class="w-full">
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm password"
              class="py-3 px-4 w-full custom-input"
            />
            <FormError :error="confirmPasswordError" />
          </div>
          <button class="register-button group">
            <ButtonLoading v-if="loading" />
            <p v-else>
              <span class=""></span>
              <span class=""></span>
              <span class="">Register</span>
            </p>
          </button>
        </form>
      </div>
      <div class="flex-1 hidden md:block">
        <img :src="onlineShoping" class="object-cover rounded-xl w-full" />
      </div>
    </div>
  </div>
</template>
