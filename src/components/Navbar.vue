<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <nav class="flex items-center h-12 shadow-[0px_5px_10px_rgba(0,0,0,0.2)]">
    <div class="w-[80%] mx-auto flex items-center justify-between">
      <div class="relative">
        <Icon icon="mdi:storm-outline" width="62" height="62" class="text-yellow-400"/>
        <p class="absolute left-1/2 top-1/2 -translate-1/2 text-3xl font-bold italic tracking-wider text-nowrap text-gray-800">S-Shop</p>
      </div>
      <div class="flex gap-8 items-center">
        <Icon icon="qlementine-icons:user-24" width="24" height="24" />
        <div class="relative">
          <Icon icon="mdi:cart" width="24" height="24" />
          <span
            class="absolute -top-2 -right-3 min-h-4.5 min-w-4.5 px-1 flex items-center justify-center bg-red-600 text-white text-[10px] font-semibold rounded-full"
            >2</span>
        </div>
      </div>
    </div>
  </nav>
</template>
