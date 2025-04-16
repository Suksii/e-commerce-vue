<script setup>
import { Icon } from '@iconify/vue'
import CustomSelect from './CustomSelect.vue'
import { ref } from 'vue'

const imageRef = ref(null)
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto py-24">
    <h2 class="text-center text-4xl font-medium">Add new category</h2>
    <form class="flex flex-col items-center justify-center w-full gap-4 py-12">
      <div class="flex flex-col gap-2 w-full">
        <p class="text-xl font-medium">Upload image<span class="text-red-600 px-0.5"></span></p>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div class="w-42 md:w-40 aspect-square relative">
            <div class="w-full h-full border border-gray-300 rounded-md"></div>
            <div class="absolute top-0 right-0 bg-white/70 p-1.5 m-2 rounded-full cursor-pointer">
              <Icon icon="nimbus:close" width="20" height="20" class="text-red-600" />
            </div>
          </div>
          <div class="w-42 md:w-40 aspect-square shrink-0 relative" @click="imageRef?.click()">
            <input
              type="file"
              ref="imageRef"
              class="absolute inset-0 hidden"
              accept="image/*"
              @change=""
            />
            <div
              class="w-full h-full flex justify-center items-center bg-gray-100 border border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-200 transition"
            >
              <Icon icon="fluent:add-24-filled" width="40" height="40" class="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium">Name<span class="text-red-600 px-0.5">*</span></label>
        <input class="custom-input w-full p-4" />
      </div>
      <div class="w-full flex gap-2 items-center">
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium"
            >Gender<span class="text-red-600 px-0.5">*</span></label
          >
          <CustomSelect />
        </div>
        <div class="flex flex-col w-full">
          <label class="text-xl font-medium">Season</label>
          <CustomSelect />
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-xl font-medium"
          >Main Category<span class="text-red-600 px-0.5">*</span></label
        >
        <CustomSelect />
      </div>
      <button class="min-w-42 w-full my-4 h-14 save-button">Add Category</button>
    </form>
  </div>
</template>
