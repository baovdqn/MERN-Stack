import DashboardVue from '@/views/Dashboard.vue'
import NotFoundVue from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardVue
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundVue },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = window.localStorage.getItem('token')?.toString();
  if (to.path !== '/signin' && !isAuth) next({ name: 'signin' })
  else next()
})

export default router
