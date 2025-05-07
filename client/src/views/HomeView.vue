<script setup>
import BrandsSlider from '@/components/BrandsSlider.vue'
import FeaturedSection from '@/components/FeaturedSection.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <FilterSidebar />
    <div class="flex flex-col">
      <FeaturedSection />
      <!-- <BrandsSlider /> -->
    </div>
  </div>
</template>
