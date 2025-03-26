<script setup>
const userMail = 'example@gmail.com'
const userName = 'user'
</script>

<template>
  <div class="w-full lg:w-[420px]">
    <h3 class="text-2xl font-semibold pb-6">Hello, {{ userName }}</h3>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <label>Email</label>
        <input
          disabled
          :placeholder="userMail"
          class="p-2 bg-gray-200 w-[220px] rounded-md outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-teal-500 transition duration-200"
        />
      </div>
      <div class="flex justify-between items-center">
        <label>Username</label>
        <input
          :placeholder="userName"
          class="p-2 bg-gray-200 w-[220px] rounded-md outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-teal-500 transition duration-200"
        />
      </div>
      <div class="flex justify-between items-center gap-1 pt-4">
        <div class="">
          <button class="bg-red-600 p-2 rounded-md text-white cursor-pointer">
            Delete account
          </button>
        </div>
        <div class="flex gap-2">
          <button class="bg-neutral-500 p-2 rounded-md text-white cursor-pointer">Close</button>
          <button class="bg-teal-700 p-2 rounded-md text-white cursor-pointer">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
