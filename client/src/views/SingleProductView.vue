<script setup>
import FullScreenImages from '@/components/FullScreenImages.vue'
import ButtonLoading from '@/loading/ButtonLoading.vue'
import Loading from '@/loading/Loading.vue'
import { useBrandStore } from '@/stores/brands'
import { useCartStore } from '@/stores/carts'
import { useCategoryStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const quantity = ref(1)
const showFullScreen = ref(false)

const cartStore = useCartStore()
const productStore = useProductsStore()
const brandStore = useBrandStore()
const categoryStore = useCategoryStore()

const discountedPrice = (productPrice, productDiscount) => {
  return (productPrice - productPrice * (productDiscount / 100)).toFixed(2)
}

onMounted(async () => {
  if (route.params.id) {
    await productStore.getProduct(route.params.id)
    await categoryStore.fetchCategories()
    await brandStore.fetchSingleBrand(productStore.singleProduct.brand)
  }
})
const subCategoryName = computed(() => {
  const categoryId = productStore.singleProduct.category
  const allSubCategories = categoryStore.categoriesData.flatMap(
    (category) => category.subCategories,
  )
  return allSubCategories.find((sub) => sub._id === categoryId)
})

function increaseQuantity() {
  if (quantity.value < 5) {
    quantity.value += 1
  }
}
function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}
</script>

<template>
  <Loading v-if="productStore.loading.getProduct" />
  <div v-else class="flex flex-col xl:flex-row gap-12 w-[90%] xl:w-[80%] mx-auto py-12">
    <div class="flex-2">
      <div
        class="border border-teal-600/20 flex justify-center items-center group overflow-hidden rounded-md"
      >
        <Transition
          enter-active-class="transition-opacity duration-100"
          leave-active-class="transition-opacity duration-100"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          mode="out-in"
        >
          <img
            v-if="productStore.selectedImage"
            :key="productStore.selectedImage"
            :src="productStore.selectedImage"
            :alt="productStore.selectedImage"
            class="h-[400px] object-contain group-hover:scale-105 transition ease-in-out duration-300 cursor-pointer"
            @click="showFullScreen = true"
          />
        </Transition>
      </div>
      <FullScreenImages
        v-if="showFullScreen"
        v-model:showFullScreen="showFullScreen"
        :data="productStore.singleProduct.images"
      />
      <div class="grid grid-cols-4 gap-2 pt-2">
        <div
          v-for="image of productStore.singleProduct.images"
          :key="image"
          class="w-full border border-teal-600/20 rounded-md group cursor-pointer"
        >
          <img
            :src="image"
            :alt="image"
            @click="productStore.selectedImage = image"
            class="w-full object-contain group-hover:scale-105 transition ease-in-out duration-300"
          />
        </div>
      </div>
    </div>

    <div class="flex-3 flex-col">
      <div class="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <div class="flex gap-4 items-center mb-4">
            <p
              v-if="productStore.singleProduct.gender"
              class="py-1 px-4 min-w-32 bg-teal-600 text-white text-sm rounded-md"
            >
              {{ productStore.singleProduct.gender }}
            </p>
            <p
              v-if="productStore.singleProduct.season"
              class="py-1 px-4 min-w-32 bg-teal-600 text-white text-sm rounded-md"
            >
              {{ productStore.singleProduct.season }}
            </p>
          </div>
          <h2 class="text-3xl font-bold">{{ productStore.singleProduct.name }}</h2>
          <p class="text-gray-700 italic">{{ subCategoryName?.name }}</p>
        </div>
        <img
          v-if="brandStore.singleBrand"
          :src="brandStore.singleBrand.image"
          class="w-32 lg:w-48"
        />
      </div>
      <div class="border-t border-gray-200 my-4"></div>
      <div class="flex gap-6">
        <div class="flex items-end">
          <h3
            class="text-2xl font-medium"
            :class="{
              'line-through decoration-red-600 text-gray-500': productStore.singleProduct.discount,
            }"
          >
            €{{ productStore.singleProduct.price }}
          </h3>
          <p v-if="productStore.singleProduct.discount" class="text-red-600 translate-y-2">
            -{{ productStore.singleProduct.discount }}%
          </p>
        </div>
        <h3 v-if="productStore.singleProduct.discount" class="text-2xl font-medium text-teal-600">
          {{
            discountedPrice(productStore.singleProduct.price, productStore.singleProduct.discount)
          }}
        </h3>
      </div>
      <div class="border-t border-gray-200 my-4"></div>
      <p class="text-gray-800">{{ productStore.singleProduct.description }}</p>
      <div class="py-4 flex flex-col items-center gap-2 w-fit">
        <p class="font-medium">Choose a Quantity</p>
        <div class="flex items-center border border-gray-200 rounded-full h-12">
          <div class="cursor-pointer px-4 w-full h-full flex items-center justify-center">
            <Icon icon="lucide:minus" class="text-lg" @click="decreaseQuantity" />
          </div>
          <p
            class="border-l border-r border-gray-200 px-5 font-medium text-lg h-12 flex items-center justify-center"
          >
            {{ quantity }}
          </p>
          <div class="cursor-pointer px-4 w-full h-full flex items-center justify-center">
            <Icon icon="lucide:plus" class="text-lg" @click="increaseQuantity" />
          </div>
        </div>
      </div>
      <button
        class="min-w-74 my-4 save-button"
        @click="cartStore.addCart(productStore.singleProduct._id, quantity)"
      >
        <ButtonLoading v-if="cartStore.loadingCart === productStore.singleProduct._id" />
        <span v-else> Add to Cart </span>
      </button>
      <div class="flex gap-4 w-full py-4">
        <p
          class="flex items-center gap-4 grow-1 py-6 px-4 border border-teal-600 font-medium md:text-lg"
        >
          <Icon icon="ph:package-light" width="40" height="40" class="shrink-0" />The product can be
          returned within 30 days
        </p>
        <p
          class="flex items-center gap-4 grow-1 py-6 px-4 border border-teal-600 font-medium md:text-lg"
        >
          <Icon
            icon="material-symbols-light:delivery-truck-speed-outline"
            width="40"
            height="40"
            class="shrink-0"
          />Delivery is free for all orders over 30 EUR
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
