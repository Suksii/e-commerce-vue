<script setup>
import { ref } from 'vue'
import CustomRadio from './CustomRadio.vue'

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
    <CustomRadio v-for="option in sortOptions" :label="option.label" />
  </div>
</template>
