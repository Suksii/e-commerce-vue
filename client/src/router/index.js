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
import Featured from '@/views/administrator/Featured.vue'

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
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/update-product/:id',
      name: 'updateProduct',
      component: ProductForm,
      meta: { requiresAuth: true, requiresAdmin: true },
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
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsTable,
      meta: { requiresAuth: true, requiresAdmin: true },
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
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/brands',
      name: 'brands',
      component: Brands,
      meta: { requiresAuth: true, requiresAdmin: true },
    },

    {
      path: '/featured',
      name: 'featured',
      component: Featured,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const profileStore = useProfile()
  await profileStore.userProfile()
  if (to.meta.requiresAuth && !profileStore.currentUser) {
    return next('/login')
  }
  if (to.meta.requiresAdmin && !profileStore.currentUser?.isAdmin) {
    return next('/')
  }
  next()
})
export default router
