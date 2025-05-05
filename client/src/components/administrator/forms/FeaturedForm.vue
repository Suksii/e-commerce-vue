<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const imageRef = ref(null)
</script>

<template>
  <div class="w-[95%] lg:w-[50%] mx-auto">
    <h2 class="text-center text-3xl font-medium">Add new featured</h2>
    <form class="flex flex-col items-center justify-center w-full gap-4 py-12" @submit.prevent="">
      <div class="flex flex-col gap-1 w-full">
        <label>Upload image</label>
        <div class="flex gap-2 flex-wrap items-center w-full">
          <div class="w-full h-[300px] shrink-0 relative">
            <img
              :src="'http://localhost:3000/uploads/categories/'"
              class="w-full h-full border border-gray-300 rounded-md object-cover"
            />
          </div>
          <div class="w-full h-[300px] shrink-0 relative" @click="imageRef?.click()">
            <input type="file" ref="imageRef" class="absolute inset-0 hidden" accept="image/*" />
            <div
              class="w-full h-full flex justify-center items-center bg-gray-100 border border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-200 transition"
            >
              <Icon icon="fluent:add-24-filled" width="40" height="40" class="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label>Name<span class="text-red-600 px-0.5">*</span></label>
        <input class="custom-input w-full px-3 py-2.5" />
      </div>
      <div class="flex flex-col w-full">
        <div class="flex flex-col w-full">
          <label>Description</label>
          <textarea class="custom-input w-full px-3 py-2.5 min-h-52 max-h-[500px]"></textarea>
        </div>
      </div>
      <div class="flex justify-between gap-2 w-full transition-all">
        <button class="min-w-42 w-full my-4 h-11 save-button">Cancel</button>
        <button class="min-w-42 w-full my-4 h-11 save-button">Add Featured</button>
      </div>
    </form>
  </div>
</template>
