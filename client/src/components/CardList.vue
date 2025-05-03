<script setup>
import Card from './Card.vue'

defineProps({
  data: Array,
})
</script>

<template>
  <div class="flex justify-center flex-wrap gap-4 py-12">
    <div
      v-if="data && data.length"
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
    <div v-else class="text-3xl font-medium tracking-wide">No data to display</div>
  </div>
</template>
