<script setup>
import { useProfile } from '@/stores/profile'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const sidebarMenu = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'garden:dashboard-26',
    link: '/all-products',
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
  {
    id: 4,
    name: 'Categories',
    icon: 'material-symbols:category-rounded',
    link: '/categories',
  },
  {
    id: 5,
    name: 'Brands',
    icon: 'tabler:square-rounded-letter-b-filled',
    link: '/brands',
  },
  {
    id: 6,
    name: 'Featured',
    icon: 'material-symbols-light:featured-video',
    link: '/featured',
  },
]

const profileStore = useProfile()
const expandedItem = ref(null)
const router = useRouter()

const handleExpand = (item) => {
  if (item.options) {
    expandedItem.value = expandedItem.value === item.id ? null : item.id
  }
}
</script>

<template>
  <div
    v-if="profileStore.currentUser && profileStore.currentUser.isAdmin"
    class="min-h-[calc(100vh-56px-48px)] m-2 md:mx-6 my-6 p-4 w-24 shrink-0 md:w-56 xl:w-76 flex flex-col gap-2 bg-teal-600 rounded-md shadow-md shadow-black transition-all ease-in-out duration-300"
  >
    <div class="flex justify-between items-center">
      <div class="hidden md:flex flex-col">
        <h2 class="text-xl text-white font-medium">{{ profileStore.currentUser.username }}</h2>
        <p class="text-lg text-gray-100">Admin</p>
      </div>
    </div>

    <div v-for="item of sidebarMenu" class="flex flex-col gap-1" @click="handleExpand(item)">
      <div
        @click="!item.options && router.push(item.link)"
        class="flex items-center justify-center md:justify-start md:gap-3 p-3 bg-teal-700 hover:bg-teal-800 text-white rounded-md cursor-pointer transition-all duration-300"
      >
        <Icon :icon="item.icon" width="32" height="32" class="shrink-0" />
        <p class="text-xl hidden md:block">{{ item.name }}</p>
      </div>
      <div
        v-if="item.options && expandedItem === item.id"
        class="bg-teal-700 rounded-md flex flex-col duration-300"
      >
        <RouterLink
          v-for="option of item.options"
          :to="option.link"
          class="rounded-md text-white p-2 md:p-3 text-xs md:text-base hover:bg-teal-800 font-medium tracking-wider"
          >{{ option.name }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>
