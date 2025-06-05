<script setup>
import ButtonLoading from '@/loading/ButtonLoading.vue'
import { useCartStore } from '@/stores/carts'

defineProps({
  product: Object,
})

const cartStore = useCartStore()
</script>

<template>
  <div
    class="flex flex-col md:min-w-[350px] w-[350px] bg-white rounded-md overflow-hidden hover:ring-2 hover:ring-teal-600 transition group"
  >
    <RouterLink :to="`/product/${product._id}`" class="flex justify-center w-full">
      <img
        :src="product.images?.[0]"
        :alt="product.name"
        loading="lazy"
        class="h-60 object-cover scale-90 transition ease-in-out duration-300"
      />
    </RouterLink>
    <div class="px-4 pb-4 flex flex-col h-[160px] justify-between">
      <div>
        <h2
          class="text-lg font-semibold text-gray-800 line-clamp-2 leading-4 group-hover:text-teal-600"
        >
          {{ product.name }}
        </h2>
        <p class="text-sm text-gray-600 mt-1">{{ product.category }}</p>
        <p class="text-gray-700 text-sm line-clamp-2">{{ product.description }}</p>
      </div>
      <div class="mt-3 flex items-center justify-between">
        <div class="flex items-end gap-1">
          <span class="text-lg font-bold text-gray-900">€{{ product.price }}</span>
          <span v-if="product.discount" class="text-sm text-red-500">-{{ product.discount }}%</span>
        </div>
        <button class="save-button min-w-32" @click="cartStore.addCart(product._id, 1)">
          <ButtonLoading v-if="cartStore.loadingCart === product._id" />
          <span v-else>Add to Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>
