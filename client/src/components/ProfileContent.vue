<script setup>
import { Icon } from '@iconify/vue'

const userMail = 'example@gmail.com'
const userName = 'user'

defineProps({
  showProfileModal: Boolean,
})

const emit = defineEmits(['update:showProfileModal'])
</script>

<template>
  <div class="w-full lg:w-[420px]">
    <h3 class="text-2xl font-semibold pb-6">Hello, {{ userName }}</h3>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <label class="text-gray-600 font-medium">Email</label>
        <input disabled :placeholder="userMail" class="p-2 bg-gray-200 custom-input w-[220px]" />
      </div>
      <div class="flex justify-between items-center">
        <label class="text-gray-600 font-medium">Username</label>
        <input :placeholder="userName" class="p-2 bg-gray-200 custom-input w-[220px]" />
      </div>
      <div class="flex justify-between items-center gap-1 pt-4">
        <button
          class="bg-red-500/20 px-4 py-2 rounded-md cursor-pointer text-red-800 font-medium shadow-md flex items-center gap-2 transition-all duration-200 hover:bg-red-600/90 hover:text-white hover:shadow-lg"
        >
          <Icon icon="mynaui:trash" width="20" height="20" />
          Delete user
        </button>
        <div class="flex gap-3">
          <button @click="emit('update:showProfileModal', false)" class="close-button">
            Close
          </button>
          <button class="min-w-24 save-button">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
