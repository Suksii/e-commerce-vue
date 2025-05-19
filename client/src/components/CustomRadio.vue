<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  modelValue: String,
  value: String,
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => props.modelValue === props.value)
</script>

<template>
  <label class="flex items-center justify-between gap-12 cursor-pointer">
    <span class="text-sm text-white tracking-wide">{{ label }}</span>

    <input
      type="radio"
      class="sr-only"
      :aria-checked="isChecked"
      role="radio"
      :checked="isChecked"
      @change="emit('update:modelValue', props.value)"
    />

    <div
      class="relative w-5 h-5 rounded-full border-2 flex items-center justify-center transition duration-300 ease-in-out"
      :class="isChecked ? 'border-teal-200' : 'border-white/90 hover:border-teal-200'"
    >
      <div
        v-if="isChecked"
        class="w-3 h-3 bg-teal-200 rounded-full transition-all duration-300"
      ></div>
    </div>
  </label>
</template>
