<script setup>
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import Modal from './Modal.vue'
import ProfileContent from './ProfileContent.vue'
import CartContent from './CartContent.vue'
import { useCartStore } from '@/stores/carts'
import SearchInput from './SearchInput.vue'
import { RouterLink } from 'vue-router'

const showProfileModal = ref(false)
const showCartModal = ref(false)
const cartStore = useCartStore()

function toggleProfileModal() {
  showProfileModal.value = !showProfileModal.value
  showCartModal.value = false
}
function toggleCartModal() {
  showCartModal.value = !showCartModal.value
  showProfileModal.value = false
}
onMounted(() => {
  cartStore.getCarts()
})
</script>

<template>
  <nav class="flex items-center h-14 bg-teal-700">
    <div class="w-[80%] mx-auto flex items-center justify-between">
      <RouterLink to="/" class="relative">
        <Icon icon="mdi:storm-outline" width="62" height="62" class="text-yellow-400" />
        <p
          class="absolute left-1/2 top-1/2 -translate-1/2 text-3xl font-bold italic tracking-wider text-nowrap text-white"
        >
          S-Shop
        </p>
      </RouterLink>
      <div class="flex gap-8 items-center">
        <SearchInput />
        <div class="relative">
          <Icon
            icon="qlementine-icons:user-24"
            width="26"
            height="26"
            class="cursor-pointer text-white"
            @click="toggleProfileModal"
          />
          <Modal
            v-if="showProfileModal"
            :custom-class="'fixed lg:absolute bg-white right-1/2 lg:right-0 translate-x-1/2 lg:translate-x-0'"
            ><ProfileContent v-model:showProfileModal="showProfileModal"
          /></Modal>
        </div>
        <div class="relative">
          <div class="cursor-pointer text-white" @click="toggleCartModal">
            <Icon icon="mdi:cart" width="26" height="26" />
            <span
              class="absolute -top-2 -right-3 min-h-4.5 min-w-4.5 px-1 flex items-center justify-center bg-red-600 text-white text-[10px] font-semibold rounded-full"
              >{{ cartStore.carts.length }}</span
            >
          </div>
          <Modal
            v-if="showCartModal"
            :custom-class="'fixed lg:absolute bg-white right-1/2 lg:right-0 translate-x-1/2 lg:translate-x-0'"
            ><CartContent v-model:showCartModal="showCartModal"
          /></Modal>
        </div>
      </div>
    </div>
  </nav>
</template>
