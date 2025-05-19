<script setup>
import { ref } from 'vue'

const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
]

const selectedOption = ref(null)
</script>

<template>
  <div class="flex flex-col gap-1 bg-teal-600 w-fit px-4 py-2 rounded-md">
    <div
      v-for="option in sortOptions"
      :key="value"
      class="flex items-center gap-4 justify-between w-64"
    >
      <p class="text-sm text-white">{{ option.label }}</p>
      <input type="radio" v-model="selectedOption" />
    </div>
  </div>
</template>
