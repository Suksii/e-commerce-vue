<script setup>
import { request } from '@/api'
import { useCartStore } from '@/stores/carts'
import { useNotificationStore } from '@/stores/notification'
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
defineProps({
  showCartModal: Boolean,
})

const cartStore = useCartStore()
const notificationStore = useNotificationStore()
const carts = cartStore.carts
const emit = defineEmits(['update:showCartModal'])

onMounted(() => {
  cartStore.getCarts()
})

async function deleteCart(id) {
  try {
    const response = await request.delete('api/cart/delete-cart/' + id)
    notificationStore.isError = false
    notificationStore.showNotification(response.data.message)
    await cartStore.getCarts()
  } catch (error) {
    console.error('Error while removing the cart:', error)
    notificationStore.isError = true
    notificationStore.showNotification(error.response.message || 'Error while removing the cart')
  }
}
async function updateQuantity(id, type) {
  try {
    await request.patch('/api/cart/update-cart/' + id, { type })
    await cartStore.getCarts()
  } catch (error) {
    console.error('Error updating cart quantity:', error)
  }
}
</script>

<template>
  <div class="overflow-y-auto max-h-[500px]">
    <div v-for="cart in carts" :key="cart._id" class="flex gap-4 w-full items-center">
      <Icon
        icon="streamline:delete-1-solid"
        width="12"
        height="12"
        class="shrink-0 text-gray-600 cursor-pointer"
        @click="deleteCart(cart._id)"
      />

      <img
        :src="'http://localhost:3000/uploads/' + cart.product.images[0]"
        class="max-w-[60px] h-[110px] md:max-w-[80px] md:h-[140px] object-contain flex-2"
      />
      <div class="flex flex-col gap-2 overflow-hidden">
        <h2 class="text-nowrap font-medium">{{ cart.product.name }}</h2>
        <p class="line-clamp-2 text-sm text-gray-600">{{ cart.product.description }}</p>
      </div>
      <div class="flex items-center gap-2 mx-2 md:mx-8">
        <button @click="updateQuantity(cart._id, 'decrease')">
          <Icon icon="lucide:minus" width="20" height="20" class="cursor-pointer" />
        </button>
        <span>{{ cart.quantity }}</span>
        <button @click="updateQuantity(cart._id, 'increase')">
          <Icon icon="lucide:plus" width="20" height="20" class="cursor-pointer" />
        </button>
      </div>
      <span class="font-medium">${{ cart.totalPrice }}</span>
    </div>
  </div>
  <div class="flex justify-end mt-6 gap-2">
    <button @click="emit('update:showCartModal', false)" class="close-button">Close</button>
    <button class="min-w-48 tracking-wider save-button">Checkout</button>
  </div>
</template>
