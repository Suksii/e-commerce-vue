<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const singleProduct = {
  id: 1,
  title: 'Mens Casual Premium Slim Fit T-Shirts',
  category: 'T-Shirt',
  description:
    'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
  price: 23.99,
  discount: 10,
  images: [
    {
      id: 1,
      src: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      alt: '',
    },
    {
      id: 2,
      src: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      alt: '',
    },
    {
      id: 3,
      src: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      alt: '',
    },
    {
      id: 4,
      src: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      alt: '',
    },
  ],
}

const selectedImage = ref(singleProduct.images[0])
const quantity = ref(1)
const discountedPrice = (productPrice, productDiscount) => {
  return (productPrice - productPrice * (productDiscount / 100)).toFixed(2)
}

function handleMinus() {
  if (quantity.value > 1) quantity.value--
}
function handlePlus() {
  if (quantity.value < 10) quantity.value++
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-12 w-[90%] md:w-[70%] mx-auto py-24">
    <div class="flex-2">
      <div
        class="border border-teal-600/20 flex justify-center items-center group overflow-hidden rounded-md"
      >
        <Transition
          enter-active-class="transition-opacity duration-100"
          leave-active-class="transition-opacity duration-100"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          mode="out-in"
        >
          <img
            v-if="selectedImage"
            :key="selectedImage.src"
            :src="selectedImage.src"
            :alt="selectedImage.alt"
            class="h-[400px] object-cover scale-75 group-hover:scale-90 transition ease-in-out duration-300"
          />
        </Transition>
      </div>
      <div class="grid grid-cols-4 gap-2 pt-2">
        <div
          v-for="image of singleProduct.images"
          :key="image.id"
          class="w-full border border-teal-600/20 rounded-md group cursor-pointer"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            @click="selectedImage = image"
            class="w-full object-cover scale-75 group-hover:scale-90 transition ease-in-out duration-300"
          />
        </div>
      </div>
    </div>

    <div class="flex-3 flex-col">
      <h2 class="text-3xl font-bold">{{ singleProduct.title }}</h2>
      <p class="text-gray-700">{{ singleProduct.category }}</p>
      <div class="border-t border-gray-200 my-4"></div>
      <div class="flex gap-6">
        <h3 v-if="singleProduct.discount" class="text-2xl font-medium">
          {{ discountedPrice(singleProduct.price, singleProduct.discount) }}
        </h3>
        <h3
          class="text-2xl font-medium"
          :class="{ 'line-through text-gray-500': singleProduct.discount }"
        >
          ${{ singleProduct.price }}
        </h3>
      </div>
      <div class="border-t border-gray-200 my-4"></div>
      <p class="text-gray-800">{{ singleProduct.description }}</p>
      <div class="py-4 flex flex-col items-center gap-2 w-fit">
        <p class="font-medium">Choose a Quantity</p>
        <div class="flex items-center border border-gray-200 rounded-full h-12">
          <div
            class="cursor-pointer px-4 w-full h-full flex items-center justify-center"
            @click="handleMinus"
          >
            <Icon icon="lucide:minus" class="text-lg" />
          </div>
          <p
            class="border-l border-r border-gray-200 px-5 font-medium text-lg h-12 flex items-center justify-center"
          >
            {{ quantity }}
          </p>
          <div
            class="cursor-pointer px-4 w-full h-full flex items-center justify-center"
            @click="handlePlus"
          >
            <Icon icon="lucide:plus" class="text-lg" />
          </div>
        </div>
      </div>
      <button class="min-w-74 my-4 save-button">Add to Cart</button>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
