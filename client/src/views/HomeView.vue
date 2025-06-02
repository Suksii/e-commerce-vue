<script setup>
import BrandsSlider from '@/components/BrandsSlider.vue'
import CategorySection from '@/components/CategorySection.vue'
import FeaturedSection from '@/components/FeaturedSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import ButtonLoading from '@/loading/ButtonLoading.vue'
import Loading from '@/loading/Loading.vue'
</script>

<template>
  <div class="flex flex-col w-full">
    <FeaturedSection />
    <CategorySection />
    <BrandsSlider />
    <FooterSection />
  </div>
</template>
