<script setup>
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import Woman from '../assets/woman.jpg'
import Man from '../assets/man.jpg'
import Kid from '../assets/kid.jpg'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
const productsStore = useProductsStore()

const router = useRouter()

const categoryItems = [
  {
    id: 1,
    image: Man,
    list: [
      {
        id: 1,
        title: 'Shoes for men',
        category: 'Shoes',
        gender: 'Male',
      },
      {
        id: 2,
        title: 'Clothes for men',
        category: 'Clothes',
        gender: 'Male',
      },
      {
        id: 3,
        title: 'Equipment for men',
        category: 'Equipment',
        gender: 'Male',
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
        category: 'Shoes',
        gender: 'Female',
      },
      {
        id: 2,
        title: 'Clothes for women',
        category: 'Clothes',
        gender: 'Female',
      },
      {
        id: 3,
        title: 'Equipment for women',
        category: 'Equipment',
        gender: 'Female',
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
        category: 'Shoes',
        gender: 'Kids',
      },
      {
        id: 2,
        title: 'Clothes for kids',
        category: 'Clothes',
        gender: 'Kids',
      },
      {
        id: 3,
        title: 'Equipment for kids',
        category: 'Equipment',
        gender: 'Kids',
      },
    ],
  },
]

onMounted(() => {
  categoryStore.fetchCategories()
})

async function goToPage(categoryName, genderName) {
  const categoryObject = categoryStore.categoriesData.find(
    (category) => category.name === categoryName,
  )

  const selectedSubCategories = categoryObject.subCategories.map((subCat) => subCat)

  const selectedGender = productsStore.genderOptions.find((gender) => gender === genderName)

  if (selectedSubCategories && selectedGender) {
    productsStore.selectedCategories = [...selectedSubCategories]
    productsStore.selectedGender = [selectedGender]

    productsStore.searchProducts()
  }
  router.push({
    name: 'allProducts',
    query: { category: categoryName, gender: genderName },
  })
}
</script>

<template>
  <h2 class="text-2xl font-bold text-center py-8 w-[350px] mx-auto">
    Explore Our Categories and Find What You Need
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-3 justify-center gap-6 w-full">
    <div
      v-for="item of categoryItems"
      :key="item.id"
      class="flex-grow-0 h-[600px] md:h-[800px] bg-cover bg-center flex flex-col justify-end items-center pb-8 gap-6 relative"
      :style="{ backgroundImage: `url('${item.image}') ` }"
    >
      <div class="absolute inset-0 bg-black/30"></div>
      <div
        v-for="i of item.list"
        @click="goToPage(i.category, i.gender)"
        :key="i.id"
        class="py-4 bg-white/80 hover:bg-white w-5/6 text-center shadow-sm shadow-gray-400 z-10 cursor-pointer transition"
      >
        <p class="text-lg font-medium text-gray-800">{{ i.title }}</p>
      </div>
    </div>
  </div>
</template>
