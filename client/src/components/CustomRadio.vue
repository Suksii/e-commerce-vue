<script setup>
import { ref } from 'vue'

defineProps({
  label: String,
})

const selected = ref(false)
</script>

<template>
  <label class="flex items-center justify-between gap-12 cursor-pointer">
    <span class="text-sm text-white tracking-wide">{{ label }}</span>

    <input
      type="radio"
      class="sr-only"
      @click="selected = !selected"
      :aria-checked="selected"
      role="radio"
    />

    <div
      class="relative w-5 h-5 rounded-full border-2 flex items-center justify-center transition duration-300 ease-in-out"
      :class="
        selected
          ? 'border-teal-300'
          : 'border-white/90 hover:border-teal-300'
      "
    >
      <div
        v-if="selected"
        class="w-3 h-3 bg-teal-300 rounded-full transition-all duration-300"
      ></div>
    </div>
  </label>
</template>
