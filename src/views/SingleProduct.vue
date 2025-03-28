<script setup>
import { ref } from 'vue'

const singleProduct = {
  id: 1,
  title: 'Mens Casual Premium Slim Fit T-Shirts',
  description:
    'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
  price: 23.99,
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

const selectedImage = ref({})
</script>

<template>
  <div class="flex items-center w-[80%] mx-auto py-24">
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

    <div class="flex-3">2</div>
  </div>
</template>
