<script setup>
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
const showSearch = ref(false)
const productsStore = useProductsStore()

const closeSearch = () => {
  showSearch.value = false
  productsStore.searchQuery = ''
}
</script>

<template>
  <div class="relative hidden md:block">
    <Icon
      icon="mdi:magnify"
      class="absolute top-1/2 -translate-y-1/2 left-2 text-teal-700"
      width="24"
      height="24"
    />
    <input
      v-model="productsStore.searchQuery"
      placeholder="Type a search term..."
      class="px-8 py-2 bg-teal-100 rounded-md w-64 md:w-80 outline-none"
    />
    <Icon
      v-if="productsStore.searchQuery"
      icon="streamline:delete-1-solid"
      width="14"
      height="14"
      class="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 text-teal-600 cursor-pointer"
      @click="productsStore.searchQuery = ''"
    />
  </div>
  <div class="block md:hidden cursor-pointer w-full relative z-20">
    <Icon
      icon="mdi:magnify"
      class="shrink-0 text-white"
      width="35"
      height="35"
      @click="showSearch = true"
    />
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showSearch" class="w-full h-14 py-1.5 fixed top-0 inset-0 bg-teal-700">
        <Icon
          icon="mdi:magnify"
          class="absolute left-2 top-1/2 -translate-y-1/2 shrink-0 text-white cursor-auto"
          width="35"
          height="35"
        />
        <input
          v-model="productsStore.searchQuery"
          class="w-full h-full mx-12 pl-2 pr-24 border-b-2 border-teal-100 outline-none text-lg text-teal-100 placeholder:text-teal-100/80"
          placeholder="Type search term..."
        />
        <Icon
          icon="streamline:delete-1-solid"
          width="18"
          height="18"
          class="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 text-white"
          @click="closeSearch"
        />
      </div>
    </Transition>
  </div>
</template>
