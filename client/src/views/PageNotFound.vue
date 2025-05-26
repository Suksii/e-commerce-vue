<template>
  <div class="container flex justify-center items-center flex-col gap-8 h-screen">
    <h1 class="text-3xl lg:text-5xl font-medium text-teal-900">404 - Page Not Found</h1>
    <p class="text-teal-700 text-lg lg:text-xl text-center">
      We couldn’t find the page you were looking for. It might have been removed or renamed.
    </p>
    <div class="w-46">
      <button @click="$router.go(-1)" class="register-button group">
        <span class=""></span>
        <span class=""></span>
        <span class="">Go Back</span>
      </button>
    </div>
  </div>
</template>
