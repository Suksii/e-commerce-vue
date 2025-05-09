<script setup>
import BrandsSlider from '@/components/BrandsSlider.vue'
import CategorySection from '@/components/CategorySection.vue'
import FeaturedSection from '@/components/FeaturedSection.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div class="flex flex-col w-full">
    <FeaturedSection />
    <CategorySection />
    <BrandsSlider />
    <FooterSection />
  </div>
</template>
