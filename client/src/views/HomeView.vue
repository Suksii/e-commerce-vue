<script setup>
import BrandsSlider from '@/components/BrandsSlider.vue'
import CategorySection from '@/components/CategorySection.vue'
import FeaturedSection from '@/components/FeaturedSection.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
</script>

<template>
  <div class="flex justify-center py-2 w-full">
    <FilterSidebar />
    <div class="flex flex-col">
      <FeaturedSection />
      <CategorySection />
      <BrandsSlider />
    </div>
  </div>
</template>
