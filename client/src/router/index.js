import { createRouter, createWebHistory } from 'vue-router'
import { useProfile } from '@/stores/profile'
import PageNotFound from '@/views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/add-product',
      name: 'addProduct',
      component: () => import('@/components/administrator/forms/ProductForm.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/update-product/:id',
      name: 'updateProduct',
      component: () => import('@/components/administrator/forms/ProductForm.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/product/:id',
      name: 'singleProduct',
      component: () => import('@/views/SingleProductView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/administrator/UsersTable.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/administrator/ProductsTable.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/all-products',
      name: 'allProducts',
      component: () => import('@/views/ProductsView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/administrator/Categories.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/brands',
      name: 'brands',
      component: () => import('@/views/administrator/Brands.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },

    {
      path: '/featured',
      name: 'featured',
      component: () => import('@/views/administrator/Featured.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/:catchAll(.*)*',
      name: 'PageNotFound',
      component: () => import('@/views/PageNotFound.vue'),
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
