<script setup>
import { Icon } from '@iconify/vue'
import { reactive, ref } from 'vue'

defineProps({
  name: String,
  item: String,
})

const expand = reactive({})
const isOverflowVisible = ref(false)

const handleExpand = (item) => {
  expand[item] = !expand[item]
}
</script>

<template>
  <div
    class="flex justify-between items-center w-full md:border-b-2 md:border-teal-600 border-transparent md:mb-2 p-4 md:p-0"
  >
    <h3 class="text-sm font-medium uppercase text-white md:text-black">{{ name }}</h3>
    <Icon
      :icon="expand[item] ? 'line-md:minus' : 'line-md:plus'"
      width="22"
      height="22"
      class="text-white md:text-teal-700 cursor-pointer"
      @click="handleExpand(item)"
    />
  </div>

  <div
    @mouseenter="isOverflowVisible = true"
    @mouseleave="isOverflowVisible = false"
    :class="[
      expand[item] ? 'max-h-96' : 'max-h-0',
      isOverflowVisible ? 'overflow-y-auto' : 'overflow-y-hidden',
    ]"
    class="transition-all duration-500"
  >
    <slot></slot>
  </div>
</template>
