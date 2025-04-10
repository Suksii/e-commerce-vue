<script setup>
import { useProfile } from '@/stores/profile'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const sidebarMenu = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'garden:dashboard-26',
    options: [
      {
        name: 'Add Product',
        link: '/add-product',
      },
      {
        name: 'See products',
        link: '/products',
      },
    ],
  },
  {
    id: 2,
    name: 'Users',
    icon: 'qlementine-icons:user-24',
    link: '/users',
  },
  {
    id: 3,
    name: 'Products',
    icon: 'ant-design:product-filled',
    options: [
      {
        name: 'Add Product',
        link: '/add-product',
      },
      {
        name: 'See products',
        link: '/products',
      },
    ],
  },
]

const profileStore = useProfile()
const expandedItem = ref(null)

const handleExpand = (item) => {
  if (item.options) {
    expandedItem.value = expandedItem.value === item.id ? null : item.id
  }
}
</script>

<template>
  <div
    v-if="profileStore.currentUser && profileStore.currentUser.isAdmin"
    class="min-h-[calc(100vh-56px-48px)] m-4 md:mx-6 my-6 p-4 w-32 md:w-96 flex flex-col gap-2 bg-teal-600 rounded-md shadow-md shadow-black transition-all ease-in-out duration-300"
  >
    <div class="flex justify-between items-center">
      <div class="hidden md:flex flex-col">
        <h2 class="text-2xl text-white font-medium">{{ profileStore.currentUser.username }}</h2>
        <p class="text-lg text-gray-100">Admin</p>
      </div>
    </div>

    <div v-for="item of sidebarMenu" class="flex flex-col gap-1" @click="handleExpand(item)">
      <div
        class="flex items-center justify-center md:justify-start md:gap-4 p-4 bg-teal-700 hover:bg-teal-800 text-white rounded-md cursor-pointer transition-all duration-300"
      >
        <Icon :icon="item.icon" width="46" height="46" class="shrink-0" />
        <p class="text-2xl hidden md:block">{{ item.name }}</p>
      </div>
      <div
        v-if="item.options && expandedItem === item.id"
        class="bg-teal-700 rounded-md flex flex-col duration-300"
      >
        <RouterLink
          v-for="option of item.options"
          :to="option.link"
          class="rounded-md text-white p-4 hover:bg-teal-800 font-medium text-lg tracking-wider"
          >{{ option.name }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>
