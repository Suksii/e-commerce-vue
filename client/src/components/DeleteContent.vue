<script setup></script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Delete confirm</h2>
      <p class="text-gray-600 mb-6">Are you sure that you want to delete this item?</p>
      <div class="flex justify-end space-x-4">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
        >
          Cancel
        </button>
        <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
