<script setup>
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/carts'

defineProps({
  cart: Object,
})
const emit = defineEmits(['delete'])

const cartStore = useCartStore()
</script>

<template>
  <div class="flex gap-4 w-full items-center rounded-xl border border-gray-200 shadow-sm p-4">
    <Icon
      icon="streamline:delete-1-solid"
      width="12"
      height="12"
      class="shrink-0 text-gray-600 cursor-pointer"
      @click="emit('delete', cart._id)"
    />

    <img
      :src="cart.product?.images[0]"
      :alt="cart.product?.name"
      loading="lazy"
      class="max-w-[60px] h-[110px] md:max-w-[80px] md:h-[140px] object-contain flex-2"
    />
    <div class="flex flex-col gap-2 overflow-hidden">
      <h2 class="text-nowrap font-medium">{{ cart.product?.name }}</h2>
      <p class="line-clamp-2 text-sm text-gray-600">{{ cart.product?.description }}</p>
    </div>
    <div class="flex flex-col-reverse md:flex-row items-center gap-2 mx-2 md:mx-8">
      <button @click="cartStore.updateQuantity(cart._id, 'decrease')">
        <Icon icon="lucide:minus" width="20" height="20" class="cursor-pointer" />
      </button>
      <span>{{ cart.quantity }}</span>
      <button @click="cartStore.updateQuantity(cart._id, 'increase')">
        <Icon icon="lucide:plus" width="20" height="20" class="cursor-pointer" />
      </button>
    </div>
    <span class="font-medium">€{{ Number(cart.totalPrice).toFixed(2) }}</span>
  </div>
</template>
