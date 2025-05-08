<script setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-white text-gray-700 border-t border-gray-200 pt-12 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      <div class="flex flex-col gap-12">
        <RouterLink to="/" class="relative w-fit mx-8">
          <Icon icon="mdi:storm-outline" width="62" height="62" class="text-yellow-400" />
          <p
            class="absolute left-1/2 top-1/2 -translate-1/2 text-3xl font-bold italic tracking-wider text-nowrap"
          >
            S-Shop
          </p>
        </RouterLink>
        <p class="text-sm">
          Discover top-quality clothing, shoes, and accessories tailored to your lifestyle.
        </p>
      </div>

      <div>
        <h3 class="text-base font-semibold mb-3 text-gray-900 uppercase">Shop</h3>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/" class="hover:text-black font-medium">Men</RouterLink></li>
          <li><RouterLink to="/" class="hover:text-black font-medium">Women</RouterLink></li>
          <li><RouterLink to="/" class="hover:text-black font-medium">Kids</RouterLink></li>
        </ul>
      </div>
      <div>
        <h3 class="text-base font-semibold mb-3 text-gray-900 uppercase">Categories</h3>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/" class="hover:text-black font-medium">Clothes</RouterLink></li>
          <li><RouterLink to="/" class="hover:text-black font-medium">Shoes</RouterLink></li>
          <li>
            <RouterLink to="/" class="hover:text-black font-medium">Equipment</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-base font-semibold mb-3 text-gray-900 uppercase">Contact Us</h3>
        <p class="text-sm mb-4 flex items-center gap-2 font-medium">
          <Icon icon="line-md:phone" width="24" height="24" /><span>+382 66 999 111</span>
        </p>
        <p class="text-sm mb-4 flex items-center gap-2 font-medium">
          <Icon icon="akar-icons:location" width="24" height="24" /><span
            >28th, Famous Street
          </span>
        </p>
        <p class="text-sm mb-4 flex items-center gap-2 font-medium">
          <Icon icon="lucide:clock" width="24" height="24" /><span>10:00 - 16:00 Mon - Fri</span>
        </p>
        <p class="text-sm mb-4 flex items-center gap-2 font-medium">
          <Icon icon="nimbus:mail" width="24" height="24" /><span>example@mail.com</span>
        </p>
      </div>
    </div>
    <div class="mt-12 pb-4 text-center text-xs text-gray-400">
      &copy; {{ new Date().getFullYear() }} S-Shop. All rights reserved.
    </div>
  </footer>
</template>
