<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const showOptions = ref(false)

const selectOptions = {
  title: 'Odaberi opciju',
  options: ['Opcija 1', 'Opcija 2', 'Opcija 3'],
}
</script>

<template>
  <div class="w-full mx-auto relative">
    <div class="relative bg-white shadow-md rounded-lg border border-gray-300">
      <div
        @click="showOptions = !showOptions"
        class="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
      >
        <span class="text-gray-800 font-medium">{{ selectOptions.title }}</span>
        <Icon
          icon="simple-line-icons:arrow-down"
          width="18"
          height="18"
          :class="{ 'rotate-180': showOptions }"
          class="transition"
        />
      </div>
      <div
        v-if="showOptions"
        class="absolute top-full w-full bg-white divide-y divide-gray-200 border border-gray-300 rounded-md duration-300 z-20"
      >
        <div
          v-for="(option, index) in selectOptions.options"
          :key="index"
          class="px-4 py-3 text-gray-700 hover:bg-teal-600 hover:text-white cursor-pointer transition-all"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>
