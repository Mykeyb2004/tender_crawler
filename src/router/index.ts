import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import TenderList from '../views/TenderList.vue'
import TenderForm from '../views/TenderForm.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/tenders', component: TenderList, meta: { requiresAuth: true } },
  { path: '/tenders/new', component: TenderForm, meta: { requiresAuth: true } },
  { path: '/tenders/:id', component: TenderForm, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router