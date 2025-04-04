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
</script>

<template>
  <div
    v-if="profileStore.currentUser && profileStore.currentUser.isAdmin"
    class="w-96 min-w-64 min-h-screen flex flex-col gap-2 shadow-[0px_10px_20px_rgba(0,0,0,0.5)] p-4"
  >
    <div>
      <h2 class="text-2xl">{{ profileStore.currentUser.username }}</h2>
      <p class="text-lg text-gray-600">Admin</p>
    </div>
    <div
      v-for="item of sidebarMenu"
      class="flex items-center gap-4 py-4 bg-gray-100 cursor-pointer"
    >
      <Icon :icon="item.icon" width="46" height="46" />
      <p class="text-2xl">{{ item.name }}</p>
    </div>
  </div>
</template>
