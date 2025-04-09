<script setup>
import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue'

const productStore = useProductsStore()

onMounted(() => {
  productStore.getProducts()
})

const discountedPrice = (product) => {
  return product.price - ((product.price * product.discount) / 100).toFixed(2)
}
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
          <th>Price</th>
          <th>Discount</th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr
          v-for="(product, index) of productStore.productsData"
          :key="product._id"
          class="text-center even:bg-teal-100"
        >
          <td>{{ index + 1 }}.</td>
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.description }}</td>
          <td v-if="product.discount" class="flex gap-2 items-center justify-center">
            <span class="relative"
              ><span class="text-gray-500 line-through decoration-red-600">${{
                product.price
              }}</span></span
            >
            <span class="text-teal-600 font-medium">${{ discountedPrice(product) }}</span>
          </td>
          <td v-else>${{ product.price }}</td>
          <td>{{ product.discount ? product.discount : 0 }}%</td>
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
