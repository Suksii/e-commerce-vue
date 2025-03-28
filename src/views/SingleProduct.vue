<script setup>
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

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
</script>

<template>
  <div class="flex flex-col md:flex-row gap-12 w-[90%] md:w-[70%] mx-auto py-24">
    <div class="flex-2">
      <div
        class="border border-teal-600/20 flex justify-center items-center group overflow-hidden rounded-md"
      >
        <img
          :src="selectedImage.src"
          :alt="selectedImage.alt"
          class="h-[400px] object-cover scale-75 group-hover:scale-90 transition ease-in-out duration-300"
        />
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
        <div class="flex items-center gap-4 border border-gray-200 rounded-full px-4">
          <Icon icon="lucide:minus" width="20" height="20" class="cursor-pointer" />
          <p class="border-l border-r border-gray-200 px-5 py-2">{{ quantity }}</p>
          <Icon icon="lucide:plus" width="20" height="20" class="cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>
