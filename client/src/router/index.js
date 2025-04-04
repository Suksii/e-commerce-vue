import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SingleProductView from '@/views/SingleProductView.vue'
import ProductsView from '@/views/ProductsView.vue'
import { useProfile } from '@/stores/profile'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/product',
      name: 'singleProduct',
      component: SingleProductView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const profileStore = useProfile()
  await profileStore.userProfile()
  next()
})
export default router
