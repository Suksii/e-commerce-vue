<script setup>
import { useBrandStore } from '@/stores/brands'
import { onMounted, ref, watchEffect } from 'vue'

const brandStore = useBrandStore()
const selectedBrands = ref([])

onMounted(() => {
  brandStore.fetchBrands()
})
watchEffect(() => {
  console.log(selectedBrands.value)
})
</script>

<template>
  <div class="w-64">
    <div class="flex flex-col w-full gap-2">
      <div>
        <h3 class="text-sm font-medium uppercase border-b-2 border-teal-600 mb-2">Brands</h3>
        <div v-for="brand in brandStore.brandData" :key="brand.id" class="flex items-center gap-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              class="input-checkbox"
              :value="brand.name"
              v-model="selectedBrands"
            />
            <span class="custom-checkbox"></span>
            <p class="text-gray-800">{{ brand.name }}</p>
          </label>
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

.input-checkbox {
  display: none;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #0d9488;
  border-radius: 4px;
  background-color: white;
  transition: all 0.2s ease-in-out;
  position: relative;
}

.input-checkbox:checked + .custom-checkbox {
  background-color: #0d9488;
  border-color: #0d9488;
}

.input-checkbox:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
