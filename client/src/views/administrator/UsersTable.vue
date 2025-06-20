<script setup>
import Loading from '@/loading/Loading.vue'
import { useProfile } from '@/stores/profile'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

const sortBy = ref('username')
const order = ref('desc')
const profileStore = useProfile()

onMounted(async () => {
  profileStore.fetchUsers(sortBy.value, order.value)
})

const handleSort = (newSort) => {
  if (sortBy.value === newSort) {
    order.value = order.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = newSort
    order.value = 'desc'
  }
  profileStore.fetchUsers(sortBy.value, order.value)
}
</script>

<template>
  <div class="overflow-x-auto w-[95%] md:w-[80%] h-fit mx-auto my-12">
    <Loading v-if="profileStore.loading.getUsers" />
    <table v-else class="w-full table-auto border-collapse border border-gray-200 min-w-[600px]">
      <thead class="w-full bg-teal-600 text-white">
        <tr>
          <th>#</th>
          <th @click="handleSort('_id')">
            <span class="flex justify-center items-center gap-2">
              User ID
              <Icon
                v-if="sortBy === '_id'"
                :icon="order === 'asc' ? 'iwwa:arrow-up' : 'iwwa:arrow-down'"
                width="20"
                height="20"
              />
            </span>
          </th>
          <th @click="handleSort('username')">
            <span class="flex justify-center items-center gap-2">
              Username
              <Icon
                v-if="sortBy === 'username'"
                :icon="order === 'asc' ? 'iwwa:arrow-up' : 'iwwa:arrow-down'"
                width="20"
                height="20"
              />
            </span>
          </th>
          <th @click="handleSort('email')">
            <span class="flex justify-center items-center gap-2">
              Email
              <Icon
                v-if="sortBy === 'email'"
                :icon="order === 'asc' ? 'iwwa:arrow-up' : 'iwwa:arrow-down'"
                width="20"
                height="20"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr
          v-for="(user, index) of profileStore.usersData"
          :key="user._id"
          class="text-center even:bg-teal-100"
        >
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
  font-size: 16px;
  padding: 16px 12px;
  border: 1px solid #e5e7eb;
}
@media screen and (max-width: 768px) {
  td,
  th {
    font-size: 12px;
    padding: 12px 8px;
  }
}
</style>
