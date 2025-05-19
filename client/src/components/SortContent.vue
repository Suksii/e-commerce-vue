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
  <div class="flex flex-col gap-2 w-full rounded-md">
    <CustomRadio v-for="option in sortOptions" :label="option.label" />
  </div>
</template>
