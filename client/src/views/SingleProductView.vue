<script setup>
import { useCartStore } from '@/stores/carts'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const baseImgUrl = 'http://localhost:3000/uploads/products/'
const quantity = ref(1)
const cartStore = useCartStore()
const productStore = useProductsStore()

const discountedPrice = (productPrice, productDiscount) => {
  return (productPrice - productPrice * (productDiscount / 100)).toFixed(2)
}

onMounted(() => {
  if (route.params.id) {
    productStore.getProduct(route.params.id)
  }
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
  <div class="flex flex-col md:flex-row gap-12 w-[90%] md:w-[70%] mx-auto py-24">
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
            :src="baseImgUrl + productStore.selectedImage"
            :alt="productStore.selectedImage"
            class="h-[400px] object-cover scale-75 group-hover:scale-90 transition ease-in-out duration-300"
          />
        </Transition>
      </div>
      <div class="grid grid-cols-4 gap-2 pt-2">
        <div
          v-for="image of productStore.singleProduct.images"
          :key="image"
          class="w-full border border-teal-600/20 rounded-md group cursor-pointer"
        >
          <img
            :src="baseImgUrl + image"
            :alt="image"
            @click="productStore.selectedImage = image"
            class="w-full object-cover scale-75 group-hover:scale-90 transition ease-in-out duration-300"
          />
        </div>
      </div>
    </div>

    <div class="flex-3 flex-col">
      <h2 class="text-3xl font-bold">{{ productStore.singleProduct.name }}</h2>
      <p class="text-gray-700">{{ productStore.singleProduct.category }}</p>
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
        Add to Cart
      </button>
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
