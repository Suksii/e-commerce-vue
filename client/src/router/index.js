import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SingleProductView from '@/views/SingleProductView.vue'
import ProductsView from '@/views/ProductsView.vue'
import { useProfile } from '@/stores/profile'
import UsersTable from '@/views/administrator/UsersTable.vue'
import ProductsTable from '@/views/administrator/ProductsTable.vue'
import ProductForm from '@/components/administrator/forms/ProductForm.vue'
import Brands from '@/views/administrator/Brands.vue'
import Categories from '@/views/administrator/Categories.vue'

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
      component: ProductForm,
    },
    {
      path: '/update-product/:id',
      name: 'updateProduct',
      component: ProductForm,
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
    {
      path: '/all-products',
      name: 'allProducts',
      component: ProductsView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
    },
    {
      path: '/brands',
      name: 'brands',
      component: Brands,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const profileStore = useProfile()
  await profileStore.userProfile()
  next()
})
export default router
