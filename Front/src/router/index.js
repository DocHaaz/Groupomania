import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/PostView.vue')
  },
  {
    path: '/user',
    name: 'users',
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/AccountView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
