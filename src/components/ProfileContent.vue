<script setup>
import { Icon } from '@iconify/vue'

const userMail = 'example@gmail.com'
const userName = 'user'

const emit = defineEmits(['update:showProfileModal'])
</script>

<template>
  <div class="w-full lg:w-[420px]">
    <h3 class="text-2xl font-semibold pb-6">Hello, {{ userName }}</h3>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <label class="text-gray-600 font-medium">Email</label>
        <input
          disabled
          :placeholder="userMail"
          class="p-2 bg-gray-200 w-[220px] rounded-md outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-teal-500 transition duration-200"
        />
      </div>
      <div class="flex justify-between items-center">
        <label class="text-gray-600 font-medium">Username</label>
        <input
          :placeholder="userName"
          class="p-2 bg-gray-200 w-[220px] rounded-md outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-teal-500 transition duration-200"
        />
      </div>
      <div class="flex justify-between items-center gap-1 pt-4">
        <button
          class="bg-red-500/20 px-4 py-2 rounded-md cursor-pointer text-red-800 font-medium shadow-md flex items-center gap-2 transition-all duration-200 hover:bg-red-600/90 hover:text-white hover:shadow-lg"
        >
          <Icon icon="mynaui:trash" width="20" height="20" />
          Delete user
        </button>
        <div class="flex gap-3">
          <button
            @click="emit('update:showProfileModal', false)"
            class="min-w-24 border-2 border-gray-500 px-4 py-2 rounded-md cursor-pointer text-gray-700 font-medium shadow-md transition-all duration-200 hover:bg-gray-600 hover:text-white hover:border-gray-700"
          >
            Close
          </button>
          <button
            class="min-w-24 bg-teal-600 px-4 py-2 rounded-md cursor-pointer text-white font-medium shadow-md transition-all duration-200 hover:bg-teal-700 hover:shadow-lg"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
