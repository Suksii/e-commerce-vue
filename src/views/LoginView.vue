<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogin() {
  console.log('Logged in')
}
</script>

<template>
  <div
    class="min-h-screen w-full relative"
  >
    <div class="max-w-96 h-fit shadow-2xl p-8 rounded-xl translate-full relative">
      <div class="absolute inset-0 blur-xl"></div>
      <div class="flex flex-col justify-center items-center relative">
        <h2 class="text-3xl font-semibold italic pb-6">Login</h2>
        <p class="pb-4">
          Don't have an account?
          <span class="text-blue-700 italic cursor-pointer" @click="router.push('/register')"
            >Register now</span
          >
        </p>
        <form
          class="flex flex-col items-center justify-center gap-2.5 w-full"
          @submit.prevent="handleLogin"
        >
          <input
            placeholder="Type username"
            class="py-2 px-3 bg-gray-200 rounded-md w-full outline-none"
          />
          <input
            placeholder="Type password"
            class="py-2 px-3 bg-gray-200 rounded-md w-full outline-none"
          />
          <button
            class="w-full py-2 px-3 rounded-md cursor-pointer bg-cyan-900 relative group overflow-hidden"
          >
            <span
              class="absolute inset-0 w-16 h-16 bg-cyan-600 opacity-50 blur-md rotate-45 transition-all duration-500 ease-out group-hover:w-[300%] group-hover:h-[300%]"
            ></span>
            <span
              class="absolute inset-0 w-12 h-12 bg-cyan-400 opacity-30 blur-lg rotate-45 transition-all duration-700 ease-out group-hover:w-[250%] group-hover:h-[250%]"
            ></span>
            <span class="relative text-xl text-white uppercase tracking-wider font-semibold z-10"
              >Login</span
            >
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
