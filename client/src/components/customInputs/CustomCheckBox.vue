<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: Object | String,
  name: String,
  selectedItem: Array,
})

const emit = defineEmits(['update:selectedItem'])

const selected = computed({
  get() {
    return props.selectedItem
  },
  set(newValue) {
    emit('update:selectedItem', newValue)
  },
})
</script>

<template>
  <label
    class="flex flex-row-reverse md:flex-row justify-between w-full md:w-fit items-center gap-2 cursor-pointer p-2 md:p-0"
  >
    <input type="checkbox" class="input-checkbox" :value="item" v-model="selected" />
    <span class="custom-checkbox"></span>
    <p class="text-white md:text-gray-800">{{ name }}</p>
  </label>
</template>

<style scoped>
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
