<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps({
  showFullScreen: Boolean,
  data: Array,
})

const emit = defineEmits(['update:showFullScreen'])

const currentImageIndex = ref(0)
const scale = ref(1)

const prev = () => {
  scale.value = 1
  currentImageIndex.value > 0
    ? currentImageIndex.value--
    : (currentImageIndex.value = props.data.length - 1)
}

const next = () => {
  scale.value = 1
  currentImageIndex.value < props.data.length - 1
    ? currentImageIndex.value++
    : (currentImageIndex.value = 0)
}

const showSelectedImage = (imgIndex) => {
  scale.value = 1
  currentImageIndex.value = imgIndex
}

const zoomOut = () => {
  if (scale.value > 0.5) scale.value -= 0.1
}

const zoomIn = () => {
  if (scale.value < 3) scale.value += 0.1
}
</script>

<template>
  <div class="fixed inset-0 min-h-screen bg-white z-50 flex justify-center items-center">
    <div class="relative inset-0 flex w-full overflow-x-hidden">
      <div
        v-for="(image, index) of props.data"
        class="flex justify-center w-full transition duration-300 shrink-0"
        :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }"
        :key="index"
      >
        <img
          :src="image"
          :alt="image"
          :style="{ transform: `scale(${scale})` }"
          loading="lazy"
          class="w-fit h-full object-cover transform transition-transform"
        />
      </div>
    </div>
    <button
      @click="emit('update:showFullScreen', false)"
      class="fixed top-0 right-0 p-3 bg-teal-500 text-white rounded-full m-4 cursor-pointer"
    >
      <Icon icon="streamline:delete-1-solid" width="14" height="14" />
    </button>
    <div class="hidden md:flex gap-2 fixed bottom-0 left-0 m-12">
      <div
        v-for="(image, index) in props.data"
        :key="image"
        @click="showSelectedImage(index)"
        class="shrink-0 w-24 h-24 border-teal-600/20 rounded-md cursor-pointer"
        :class="
          currentImageIndex === index ? 'border-4 border-teal-700' : 'border border-teal-600/20'
        "
      >
        <img :src="image" :alt="image" loading="lazy" class="object-cover w-full" />
      </div>
    </div>
    <div class="hidden md:flex items-center gap-2 fixed left-0 top-0 m-4">
      <button @click="zoomOut" class="p-3 bg-teal-500 rounded-full cursor-pointer">
        <Icon icon="lucide:minus" width="20" height="20" class="text-white" />
      </button>
      <button @click="zoomIn" class="p-3 bg-teal-500 rounded-full cursor-pointer">
        <Icon icon="lucide:plus" width="20" height="20" class="text-white" />
      </button>
    </div>
    <div class="fixed bottom-0 right-0 flex gap-2 m-12 items-center">
      <button @click="prev()" class="p-3 bg-teal-500 rounded-full cursor-pointer">
        <Icon icon="ep:arrow-left" width="20" height="20" class="text-white" />
      </button>
      <button @click="next()" class="p-3 bg-teal-500 rounded-full cursor-pointer">
        <Icon icon="ep:arrow-right" width="20" height="20" class="text-white" />
      </button>
    </div>
  </div>
</template>
