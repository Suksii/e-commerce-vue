<script setup>
import { request } from '@/api'
import { useNotificationStore } from '@/stores/notification'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const productStore = useProductsStore()
const notificationStore = useNotificationStore()
const router = useRouter()

const sortBy = ref('name')
const order = ref('asc')

async function fetchAllCategories() {
  try {
    const { data } = await request('/api/category/')
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  productStore.getProducts(sortBy.value, order.value)
  fetchAllCategories()
})

const discountedPrice = (product) => {
  return (product.price - (product.price * product.discount) / 100).toFixed(2)
}

async function deleteProduct(id) {
  try {
    const response = await request.delete('/api/products/delete-product/' + id)
    notificationStore.isError = false
    notificationStore.showNotification(response.data.message || 'Product successfully deleted')
    productStore.getProducts(sortBy.value, order.value)
  } catch (error) {
    console.error('Failed to delete product:', error)
    notificationStore.isError = true
    notificationStore.showNotification(error.response?.message || 'Failed to delete product')
  }
}

const handleSort = (newSort) => {
  if (sortBy.value === newSort) {
    order.value = order.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = newSort
    order.value = 'desc'
  }
  productStore.getProducts(sortBy.value, order.value)
}
</script>

<template>
  <div class="overflow-x-auto w-[95%] md:w-[80%] h-fit mx-auto my-12">
    <table class="w-full table-auto border-collapse border border-gray-200 min-w-[600px]">
      <thead class="w-full bg-teal-600 text-white">
        <tr>
          <th>#</th>
          <th @click="handleSort('_id')">
            <span class="flex justify-center items-center gap-2">
              Product ID
              <Icon
                v-if="sortBy === '_id'"
                :icon="order === 'asc' ? 'iwwa:arrow-up' : 'iwwa:arrow-down'"
                width="20"
                height="20"
              />
            </span>
          </th>
          <th @click="handleSort('name')">
            <span class="flex justify-center items-center gap-2">
              Name
              <Icon
                v-if="sortBy === 'name'"
                :icon="order === 'asc' ? 'iwwa:arrow-up' : 'iwwa:arrow-down'"
                width="20"
                height="20"
              />
            </span>
          </th>
          <th @click="handleSort('category')">
            <span class="flex justify-center items-center gap-2">
              Category<Icon
                v-if="sortBy === 'category'"
                :icon="order === 'asc' ? 'iwwa:arrow-up' : 'iwwa:arrow-down'"
                width="20"
                height="20"
              />
            </span>
          </th>
          <th @click="handleSort('price')">
            <span class="flex justify-center items-center gap-2"
              >Price
              <Icon
                v-if="sortBy === 'price'"
                :icon="order === 'asc' ? 'iwwa:arrow-up' : 'iwwa:arrow-down'"
                width="20"
                height="20"
            /></span>
          </th>
          <th @click="handleSort('discount')">
            <span class="flex justify-center items-center gap-2"
              >Discount<Icon
                v-if="sortBy === 'discount'"
                :icon="order === 'asc' ? 'iwwa:arrow-up' : 'iwwa:arrow-down'"
                width="20"
                height="20"
            /></span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr
          v-for="(product, index) of productStore.productsData"
          :key="product._id"
          class="text-center even:bg-teal-100"
        >
          <td
            @click="router.push(`/product/${product._id}`)"
            class="hover:bg-teal-600 transition-all cursor-pointer"
          >
            {{ index + 1 }}.
          </td>
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td v-if="product.discount" class="flex gap-2 items-center justify-center">
            <span class="relative"
              ><span class="text-gray-500 line-through decoration-red-600"
                >€{{ product.price }}</span
              ></span
            >
            <span class="text-teal-600 font-medium">€{{ discountedPrice(product) }}</span>
          </td>
          <td v-else>€{{ product.price }}</td>
          <td>{{ product.discount ? product.discount : 0 }}%</td>
          <td class="flex gap-6 justify-center items-center">
            <Icon
              icon="fluent:delete-28-filled"
              width="28"
              height="28"
              class="text-red-600 cursor-pointer"
              @click="deleteProduct(product._id)"
            />
            <Icon
              icon="lucide:edit"
              width="28"
              height="28"
              class="text-teal-600 cursor-pointer"
              @click="router.push('/update-product/' + product._id)"
            />
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
  cursor: pointer;
}
</style>
