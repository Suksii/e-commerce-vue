<script setup>
import { useCartStore } from '@/stores/carts'

defineProps({
  id: String,
  name: String,
  images: [String, Array],
  price: Number,
  discount: Number,
  category: String,
  description: String,
})

const cartStore = useCartStore()
</script>

<template>
  <div
    :to="`/product/${id}`"
    class="min-w-[350px] w-[350px] bg-white rounded-md overflow-hidden hover:ring-2 hover:ring-teal-600 transition group"
  >
    <RouterLink :to="`/product/${id}`" class="flex justify-center w-full">
      <img
        :src="images"
        :alt="name"
        class="h-60 object-cover scale-90 transition ease-in-out duration-300"
      />
    </RouterLink>
    <div class="px-4 pb-4 flex flex-col h-[160px] justify-between">
      <div>
        <h2
          class="text-lg font-semibold text-gray-800 line-clamp-2 leading-4 group-hover:text-teal-600"
        >
          {{ name }}
        </h2>
        <p class="text-sm text-gray-600 mt-1">{{ category }}</p>
        <p class="text-gray-700 text-sm line-clamp-2">{{ description }}</p>
      </div>
      <div class="mt-3 flex items-center justify-between">
        <div class="flex items-end gap-1">
          <span class="text-lg font-bold text-gray-900">€{{ price }}</span>
          <span v-if="discount" class="text-sm text-red-500">-{{ discount }}%</span>
        </div>
        <button class="save-button" @click="cartStore.addCart(id, 1)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>
