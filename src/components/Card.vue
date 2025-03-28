<script setup>
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
</script>

<template>
  <div class="max-w-xs bg-white rounded-xl overflow-hidden shadow-lg">
    <div class="flex justify-center w-full">
      <img
        :src="singleProduct.images[3].src"
        :alt="singleProduct.title"
        class="h-60 object-cover scale-90 transition ease-in-out duration-300"
      />
    </div>
    <div class="px-4 pb-4">
      <h2 class="text-lg font-semibold text-gray-800 line-clamp-2 leading-4">
        {{ singleProduct.title }}
      </h2>
      <p class="text-sm text-gray-600 mt-1">{{ singleProduct.category }}</p>
      <p class="text-gray-700 text-sm line-clamp-2">{{ singleProduct.description }}</p>
      <div class="mt-3 flex items-center justify-between">
        <div>
          <span class="text-lg font-bold text-gray-900">${{ singleProduct.price }}</span>
          <span v-if="singleProduct.discount" class="text-sm text-red-500 ml-2"
            >-{{ singleProduct.discount }}%</span
          >
        </div>
        <button class="save-button">Add to Cart</button>
      </div>
    </div>
  </div>
</template>
