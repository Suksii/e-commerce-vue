<script setup>
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const productStore = useProductsStore()
const notificationStore = useNotificationStore()
const router = useRouter()

onMounted(() => {
  productStore.getProducts()
})

const discountedPrice = (product) => {
  return product.price - ((product.price * product.discount) / 100).toFixed(2)
}

async function deleteProduct(id) {
  try {
    const response = await request.delete('/api/products/delete-product/' + id)
    notificationStore.isError = false
    notificationStore.showNotification(response.data.message || 'Product successfully deleted')
    productStore.getProducts()
  } catch (error) {
    console.error('Failed to delete product:', error)
    notificationStore.isError = true
    notificationStore.showNotification(error.response.message || 'Failed to delete product')
  }
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
          <th>Price</th>
          <th>Discount</th>
          <th>Images</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr
          v-for="(product, index) of productStore.productsData"
          :key="product._id"
          class="text-center even:bg-teal-100"
          @click.stop="router.push(`/product/${product._id}`)"
        >
          <td>{{ index + 1 }}.</td>
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td><img :src="'http://localhost:3000/uploads/' + product.images[0]"/></td>
          <td v-if="product.discount" class="flex gap-2 items-center justify-center">
            <span class="relative"
              ><span class="text-gray-500 line-through decoration-red-600"
                >${{ product.price }}</span
              ></span
            >
            <span class="text-teal-600 font-medium">${{ discountedPrice(product) }}</span>
          </td>
          <td v-else>${{ product.price }}</td>
          <td>{{ product.discount ? product.discount : 0 }}%</td>
          <td class="flex gap-6 justify-center items-center">
            <button @click="deleteProduct(product._id)">
              <Icon
                icon="fluent:delete-28-filled"
                width="28"
                height="28"
                class="text-red-600 cursor-pointer"
              />
            </button>
            <Icon icon="lucide:edit" width="24" height="24" class="text-teal-600 cursor-pointer" />
          </td>
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
