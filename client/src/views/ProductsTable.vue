<script setup>
import { ref } from 'vue'

const productsData = ref([])
</script>

<template>
  <div class="overflow-x-auto w-[95%] md:w-[80%] h-fit mx-auto my-12">
    <table class="w-full table-auto border-collapse border border-gray-200 min-w-[600px]">
      <thead class="w-full bg-teal-600 text-white">
        <tr>
          <th>#</th>
          <th>Product ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Discount</th>
          <th>Price</th>
          <th>Discounted Price</th>
        </tr>
      </thead>
      <tbody class="w-full">
        <!-- <tr v-for="(product, index) of productsData" class="text-center even:bg-teal-100">
          <td>{{ index + 1 }}.</td>
          <td>{{ product._id }}</td>
          <td>{{ product.username }}</td>
          <td>{{ product.email }}</td>
        </tr> -->
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
