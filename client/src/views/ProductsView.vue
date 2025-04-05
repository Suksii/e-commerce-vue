<script setup>
import { request } from '@/api'
import CardList from '@/components/CardList.vue'
import { useNotificationStore } from '@/stores/notification'
import { onMounted, reactive, ref } from 'vue'

const notificationStore = useNotificationStore()
const productsData = ref([])

async function addProduct() {
  try {
    const response = await request.post('/api/products/add-product', {
      name: 'T-Shirt',
      description: 'Very good T-shirt',
      price: 32,
      category: 'Men',
      image: 'Image',
    })
    notificationStore.isError = false
    notificationStore.showNotification(response.data.message)
    console.log(response)
  } catch (error) {
    notificationStore.isError = true
    notificationStore.showNotification(error.response.data.message)
    console.error(error)
  }
}

onMounted(async () => {
  try {
    const { data } = await request.get('/api/products/get-products')
    console.log(data)
    productsData.value = data
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
})
</script>

<template>
  <div class="py-20">
    <button class="save-button" @click.prevent="addProduct">Add product</button>
    <CardList :data="productsData" />
  </div>
</template>
