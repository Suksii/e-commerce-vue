<script setup>
import { Icon } from '@iconify/vue'
import { computed, reactive, watchEffect } from 'vue'

defineProps({
  showCartModal: Boolean,
  totalItems: Number,
})
const emit = defineEmits(['update:showCartModal', 'update:totalItems'])
const numOfItems = reactive({})
const totalPrice = (itemId, singlePrice) => {
  return ((numOfItems[itemId] || 1) * singlePrice).toFixed(2)
}

orders.forEach((order) => (numOfItems[order.id] = 1))

const totalItems = computed(() => {
  return Object.values(numOfItems).reduce((acc, curr) => acc + curr, 0)
})

watchEffect(() => emit('update:totalItems', totalItems.value))

const handleMinus = (itemId) => {
  numOfItems[itemId] -= 1
  emit('update:totalItems', totalItems.value)
}
const handlePlus = (itemId) => {
  numOfItems[itemId] += 1
  emit('update:totalItems', totalItems.value)
}
</script>

<template>
  <div class="overflow-y-auto max-h-[500px]">
    <div v-for="order in orders" :key="order.id" class="flex gap-4 w-full items-center">
      <Icon
        icon="streamline:delete-1-solid"
        width="12"
        height="12"
        class="shrink-0 text-gray-600 cursor-pointer"
      />
      <img
        :src="order.image"
        class="max-w-[60px] h-[110px] md:max-w-[80px] md:h-[140px] object-contain flex-2"
      />
      <div class="flex flex-col gap-2 overflow-hidden">
        <h2 class="text-nowrap font-medium">{{ order.title }}</h2>
        <p class="line-clamp-2 text-sm text-gray-600">{{ order.description }}</p>
      </div>
      <div class="flex items-center gap-2 mx-2 md:mx-8">
        <button :disabled="numOfItems[order.id] === 1" @click="handleMinus(order.id)">
          <Icon icon="lucide:minus" width="20" height="20" class="cursor-pointer" />
        </button>
        <span>{{ numOfItems[order.id] }}</span>
        <button :disabled="numOfItems[order.id] === 10" @click="handlePlus(order.id)">
          <Icon icon="lucide:plus" width="20" height="20" class="cursor-pointer" />
        </button>
      </div>
      <span class="font-medium">${{ totalPrice(order.id, order.price) }}</span>
    </div>
  </div>
  <div class="flex justify-end mt-6 gap-2">
    <button @click="emit('update:showCartModal', false)" class="close-button">Close</button>
    <button class="min-w-48 tracking-wider save-button">Checkout</button>
  </div>
</template>
