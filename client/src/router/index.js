import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SingleProductView from '@/views/SingleProductView.vue'
import ProductsView from '@/views/ProductsView.vue'
import { useProfile } from '@/stores/profile'
import AddProductForm from '@/components/AddProductForm.vue'
import UsersTable from '@/views/UsersTable.vue'
import ProductsTable from '@/views/ProductsTable.vue'

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
      path: '/add-product',
      name: 'addProduct',
      component: AddProductForm,
    },
    {
      path: '/product/:id',
      name: 'singleProduct',
      component: SingleProductView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersTable,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsTable,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const profileStore = useProfile()
  await profileStore.userProfile()
  next()
})
export default router
