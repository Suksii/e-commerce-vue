<script setup>
import Card from './Card.vue'

defineProps({
  data: Array,
})
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 w-[90%] lg:w-[80%] mx-auto gap-4 py-12"
  >
    <div
      v-for="item of data"
      :key="data._id"
      class="flex justify-center gap-4"
    >
      <Card
        :id="item._id"
        :images="'http://localhost:3000/uploads/products/' + item.images[0]"
        :name="item.name"
        :price="item.price"
        :category="item.category"
        :description="item.description"
        :discount="item.discount"
      />
    </div>
  </div>
</template>
