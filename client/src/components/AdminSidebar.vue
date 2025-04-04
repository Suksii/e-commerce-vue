<script setup>
import { useProfile } from '@/stores/profile'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const sidebarMenu = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'garden:dashboard-26',
    link: '',
  },
  {
    id: 2,
    name: 'Users',
    icon: 'qlementine-icons:user-24',
    link: '',
  },
  {
    id: 3,
    name: 'Products',
    icon: 'ant-design:product-filled',
    link: '',
  },
]

const profileStore = useProfile()

const isExtended = ref(false)
</script>

<template>
  <div
    v-if="profileStore.currentUser && profileStore.currentUser.isAdmin"
    class="min-h-screen flex flex-col gap-2 bg-teal-600 shadow-md shadow-black p-4 transition-all ease-in-out duration-300"
    :class="{ 'w-96': isExtended, 'w-32': !isExtended }"
  >
    <div class="flex justify-between items-center" :class="{ 'justify-center': !isExtended }">
      <div v-if="isExtended" class="flex flex-col">
        <h2 class="text-2xl text-white font-medium">{{ profileStore.currentUser.username }}</h2>
        <p class="text-lg text-gray-100">Admin</p>
      </div>
      <div
        class="p-3 hover:bg-teal-800 text-white rounded-full cursor-pointer transition-colors duration-500"
        @click="isExtended = !isExtended"
      >
        <Icon
          icon="simple-line-icons:arrow-left"
          width="34"
          height="34"
          class="p-1"
          :class="{ 'rotate-180': !isExtended }"
        />
      </div>
    </div>
    <div
      v-for="item of sidebarMenu"
      class="flex items-center gap-4 py-4 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-md cursor-pointer transition-all duration-300"
      :class="{ 'justify-center': !isExtended }"
    >
      <Icon :icon="item.icon" width="46" height="46" />
      <p v-if="isExtended" class="text-2xl">{{ item.name }}</p>
    </div>
  </div>
</template>
