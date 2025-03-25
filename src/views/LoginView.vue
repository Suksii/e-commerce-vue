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
  <div
    class="min-h-screen w-full relative bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 flex justify-center items-center"
  >
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
            class="py-3 px-4 bg-gray-200 rounded-md w-full outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-teal-500 transition duration-200"
          />
          <div class="relative w-full">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              v-model="password"
              placeholder="Type password"
              class="py-3 px-4 bg-gray-200 rounded-md w-full outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-teal-500 transition duration-200 inset-0"
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
          <button
            class="w-full py-3 px-4 rounded-md cursor-pointer bg-teal-600 relative group overflow-hidden"
          >
            <span
              class="absolute inset-0 w-16 h-16 bg-teal-400 opacity-50 blur-md rotate-45 transition-all duration-500 ease-out group-hover:w-[300%] group-hover:h-[300%]"
            ></span>
            <span
              class="absolute inset-0 w-12 h-12 bg-teal-200 opacity-30 blur-lg rotate-45 transition-all duration-700 ease-out group-hover:w-[250%] group-hover:h-[250%]"
            ></span>
            <span class="relative text-xl text-white uppercase tracking-wider font-semibold z-10"
              >Login</span
            >
          </button>
        </form>
      </div>
      <div class="flex-1 hidden md:block">
        <img :src="cartImage" class="object-cover rounded-xl w-full" />
      </div>
    </div>
  </div>
</template>
