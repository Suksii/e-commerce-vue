<script setup>
import { computed, watch } from 'vue'
import { useCartStore } from '@/stores/carts'
import CartCard from '../cards/CartCard.vue'

const props = defineProps({
  showCartModal: Boolean,
})

const cartStore = useCartStore()
const carts = cartStore.carts
const emit = defineEmits(['update:showCartModal'])

watch(
  () => props.showCartModal,
  (val) => {
    if (val) cartStore.getCarts()
  },
)

const totalCartPrice = computed(() => {
  return carts.reduce((curr, prev) => curr + prev.totalPrice, 0)
})
</script>

<template>
  <div class="overflow-y-auto max-h-[500px] flex flex-col gap-2 z-40">
    <CartCard v-for="cart in carts" :key="cart._id" :cart="cart" @delete="cartStore.deleteCart" />
  </div>
  <div
    class="flex flex-col md:flex-row items-center justify-between mt-4 p-4 bg-gray-100 shadow-sm rounded-lg gap-2 md:gap-8"
  >
    <div class="flex items-center gap-2">
      <p class="text-sm text-gray-500 uppercase tracking-wide">Total</p>
      <p class="text-teal-600 font-bold text-2xl">€{{ totalCartPrice.toFixed(2) }}</p>
    </div>
    <div class="flex items-center gap-2">
      <button @click="emit('update:showCartModal', false)" class="close-button">Close</button>
      <button class="min-w-48 tracking-wider save-button">Checkout</button>
    </div>
  </div>
</template>
