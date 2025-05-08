<script setup>
import Woman from '../assets/woman.jpg'
import Man from '../assets/man.jpg'
import Kid from '../assets/kid.jpg'
const categoryItems = [
  {
    id: 1,
    image: Man,
    list: [
      {
        id: 1,
        title: 'Shoes for men',
        link: '',
      },
      {
        id: 2,
        title: 'Clothes for men',
        link: '',
      },
      {
        id: 3,
        title: 'Equipment for men',
        link: '',
      },
    ],
  },
  {
    id: 2,
    image: Woman,
    list: [
      {
        id: 1,
        title: 'Shoes for women',
        link: '',
      },
      {
        id: 2,
        title: 'Clothes for women',
        link: '',
      },
      {
        id: 3,
        title: 'Equipment for women',
        link: '',
      },
    ],
  },
  {
    id: 3,
    image: Kid,
    list: [
      {
        id: 1,
        title: 'Shoes for kids',
        link: '',
      },
      {
        id: 2,
        title: 'Clothes for kids',
        link: '',
      },
      {
        id: 3,
        title: 'Equipment for kids',
        link: '',
      },
    ],
  },
]
</script>

<template>
  <h2 class="text-2xl font-bold text-center py-8 w-[350px] mx-auto">Explore Our Categories and Find What You Need</h2>
  <div class="flex justify-center flex-wrap gap-6 w-full">
    <div
      v-for="item of categoryItems"
      :key="item.id"
      class="w-[90%] md:w-[470px] h-[600px] md:h-[800px] bg-cover bg-center flex flex-col justify-end items-center pb-8 gap-6 relative"
      :style="{ backgroundImage: `url('${item.image}') ` }"
    >
      <div class="absolute inset-0 bg-black/30 z-10"></div>
      <RouterLink
        v-for="i of item.list"
        :key="i.id"
        :to="i.link"
        class="py-4 bg-white/80 hover:bg-white w-5/6 text-center shadow-sm shadow-gray-400 cursor-pointer z-20 transition"
      >
        <p class="text-lg font-medium text-gray-800">{{ i.title }}</p>
      </RouterLink>
    </div>
  </div>
</template>
