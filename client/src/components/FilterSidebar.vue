<script setup>
import { useBrandStore } from '@/stores/brands'
import { onMounted } from 'vue'

const brandStore = useBrandStore()

onMounted(() => {
  brandStore.fetchBrands()
})

console.log(brandStore.brandData)
</script>

<template>
  <div class="w-64">
    <div class="flex flex-col w-full gap-2">
      <div>
        <h3 class="text-sm font-medium uppercase border-b-2 border-teal-600 mb-2">Brands</h3>
        <div v-for="brand of brandStore.brandData" class="flex gap-2">
          <input type="checkbox" />
          <p>{{ brand.name }}</p>
        </div>
      </div>
      <div class="w-full">
        <h3 class="text-sm font-medium uppercase border-b-2 border-teal-600 mb-2">Price</h3>
        <div class="flex flex-col">
          <input type="range" class="w-full py-2 input-range" />
          <p>32€ - 84€</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent;
  cursor: pointer;
}

.input-range::-webkit-slider-runnable-track {
  height: 6px;
  background: linear-gradient(to right, #14b8a6, #0f766e);
  border-radius: 3px;
  transition: background 0.3s ease;
}

.input-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 18px;
  width: 18px;
  background-color: #ffffff;
  border: 3px solid #0d9488;
  border-radius: 50%;
  margin-top: -6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;
}

.input-range::-webkit-slider-thumb:hover,
.input-range::-webkit-slider-thumb:focus {
  background-color: #f0fdfa;
  transform: scale(1.1);
  border-color: #0f766e;
}

.input-range::-moz-range-track {
  height: 6px;
  background: linear-gradient(to right, #14b8a6, #0f766e);
  border-radius: 3px;
}

.input-range::-moz-range-thumb {
  height: 18px;
  width: 18px;
  background-color: #ffffff;
  border: 3px solid #0d9488;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;
}

.input-range::-moz-range-thumb:hover,
.input-range::-moz-range-thumb:focus {
  background-color: #f0fdfa;
  transform: scale(1.1);
  border-color: #0f766e;
}
</style>
