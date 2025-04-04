<script setup>
import Card from './Card.vue'

const products = [
  {
    id: 1,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    category: "men's clothing",
    price: 22.3,
    discount: 0,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  },
  {
    id: 2,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    discount: 30,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    discount: 10,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  },

  {
    id: 4,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    discount: 15,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 w-[90%] lg:w-[80%] mx-auto gap-4 py-12">
    <div v-for="product of products" :key="product.id" class="flex justify-center gap-4">
      <Card
        :image="product.image"
        :title="product.title"
        :price="product.price"
        :category="product.category"
        :description="product.description"
        :discount="product.discount"
      />
    </div>
  </div>
</template>
