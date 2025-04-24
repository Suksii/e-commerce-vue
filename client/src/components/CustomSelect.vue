<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps({
  options: Array,
  selectedOption: [String, Number],
})
const emit = defineEmits(['update:selectedOption'])
const showOptions = ref(false)
const showSubOptions = ref(null)

function toggleOptions() {
  if (props.options.length > 0) {
    showOptions.value = !showOptions.value
    showSubOptions.value = null
  }
}
function toggleSubOptions(suboption) {
  if (showSubOptions.value === suboption) {
    showSubOptions.value = null
  } else {
    showSubOptions.value = suboption
  }
}

function selectOption(option) {
  emit('update:selectedOption', typeof option === 'object' ? option._id : option)
  console.log(option)
  showOptions.value = false
  showSubOptions.value = null
}
function selectSubOption(suboption) {
  emit('update:selectedOption', suboption._id)
  showOptions.value = false
  showSubOptions.value = null
}
</script>

<template>
  <div class="w-full mx-auto relative">
    <div class="relative bg-white shadow-md rounded-lg border border-gray-300">
      <div
        @click="toggleOptions"
        class="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
      >
        <span class="text-gray-800 font-medium">{{ selectedOption || 'Select option' }}</span>
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
        <div class="max-h-[400px] overflow-y-auto">
          <div
            v-for="(option, index) in props.options"
            :key="index"
            @click="!option.subCategories ? selectOption(option) : toggleSubOptions(option)"
            class="px-4 py-3 text-gray-700 cursor-pointer transition-all"
            :class="{ 'hover:bg-teal-600 hover:text-white': !option.subCategories }"
          >
            <div class="flex justify-between">
              <p>
                {{ typeof option === 'object' ? option.name : option }}
              </p>
              <Icon
                v-if="option.subCategories && option.subCategories.length > 0"
                icon="simple-line-icons:arrow-down"
                width="18"
                height="18"
                :class="{ 'rotate-180': showSubOptions === option }"
                class="transition"
              />
            </div>
            <p
              v-if="option.subCategories && showSubOptions === option"
              v-for="suboption of option.subCategories"
              @click="selectSubOption(suboption)"
              class="w-full px-4 py-3 text-gray-700 cursor-pointer transition-all hover:bg-teal-600 hover:text-white"
            >
              <span class="">{{ suboption.name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
