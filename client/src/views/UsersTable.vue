<script setup>
import { request } from '@/api'
import { onMounted, ref } from 'vue'

const usersData = ref([])

onMounted(async () => {
  try {
    const { data } = await request.get('/api/users/get-users')
    usersData.value = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="overflow-x-auto w-[95%] md:w-[80%] h-fit mx-auto my-12">
    <table class="w-full table-auto border-collapse border border-gray-200 min-w-[600px]">
      <thead class="w-full bg-teal-600 text-white">
        <tr>
          <th>#</th>
          <th>User ID</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr v-for="(user, index) of usersData" class="text-center even:bg-teal-100">
          <td>{{ index + 1 }}.</td>
          <td>{{ user._id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
td,
th {
  font-size: 24px;
  padding: 16px 12px;
  border: 1px solid #e5e7eb;
}
</style>
