<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
const showSearch = ref(false)
</script>

<template>
  <div class="relative hidden md:block">
    <Icon
      icon="mdi:magnify"
      class="absolute top-1/2 -translate-y-1/2 left-2 text-teal-700"
      width="24"
      height="24"
    />
    <input placeholder="Type a search term..." class="pl-8 py-2 bg-teal-100 rounded-md w-64 md:w-96 outline-none" />
  </div>
  <div class="block md:hidden cursor-pointer w-full relative z-20">
    <Icon
      icon="mdi:magnify"
      class="shrink-0 text-white"
      width="35"
      height="35"
      @click="showSearch = true"
    />
    <div v-if="showSearch === true" class="w-full py-2 h-fit fixed top-0 inset-0 bg-teal-700">
      <Icon
        icon="mdi:magnify"
        class="absolute left-2 top-1/2 -translate-y-1/2 shrink-0 text-white cursor-auto"
        width="35"
        height="35"
      />
      <input class="w-full py-2 mx-12 pl-2 pr-24 border-b-2 border-teal-100 outline-none text-xl text-teal-100 placeholder:text-teal-100/80" placeholder="Type search term..."/>
      <Icon
        icon="streamline:delete-1-solid"
        width="20"
        height="20"
        class="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 text-white"
        @click="showSearch = false"
      />
    </div>
  </div>
</template>
