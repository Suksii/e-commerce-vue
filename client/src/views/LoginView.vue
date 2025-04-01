<script setup>
import { useRouter } from 'vue-router'
import cartImage from '@/assets/cartImage.jpg'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const router = useRouter()
const isPasswordVisible = ref(false)
const username = ref('')
const password = ref('')

function handleLogin() {
  console.log('Logged in')
  router.push('/')
}
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
          <input
            type="text"
            v-model="username"
            placeholder="Type username"
            class="py-3 px-4 w-full custom-input"
          />
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
