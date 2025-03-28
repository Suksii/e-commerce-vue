<script setup>
import { Icon } from '@iconify/vue'
import { computed, onMounted, reactive, watchEffect } from 'vue'

const orders = [
  {
    id: 1,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 2,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      rate: 4.7,
      count: 500,
    },
  },

  {
    id: 4,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
]
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
    <button
      @click="emit('update:showCartModal', false)"
      class="min-w-24 border-2 border-gray-500 px-4 py-2 rounded-md cursor-pointer text-gray-700 font-medium shadow-md transition-all duration-200 hover:bg-gray-600 hover:text-white hover:border-gray-700"
    >
      Close
    </button>
    <button
      class="min-w-48 bg-teal-600 px-4 py-2 rounded-md cursor-pointer text-white font-medium shadow-md transition-all duration-200 hover:bg-teal-700 hover:shadow-lg tracking-wider"
    >
      Checkout
    </button>
  </div>
</template>
