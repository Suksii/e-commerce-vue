<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Modal from './components/Modal.vue'

const route = useRoute()
</script>

<template>
  <Navbar v-if="route.name !== 'login' && route.name !== 'register'" />
  <RouterView />
</template>
