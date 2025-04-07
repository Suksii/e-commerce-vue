<script setup>
import { request } from '@/api'
import { onMounted } from 'vue'

onMounted(async () => {
  try {
    const { data } = await request.get('/api/users/get-users')
    console.log(data)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div>Hello</div>
</template>
