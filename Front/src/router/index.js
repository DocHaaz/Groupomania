import { createRouter, createWebHistory } from 'vue-router'


const routes = [
// Route vers view de base (authentification)
  {
    path: '/',
    name: 'auth',
    component: () => import('../views/AuthView.vue')
  },
// Route vers view d'accueil (avec les posts)
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
// Route vers view d'un post avec ces messages
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/PostView.vue')
  },
// Route vers view des utilisateur (admin view)
  {
    path: '/user',
    name: 'users',
    component: () => import('../views/UserView.vue')
  },
// Route vers view du compte de l'utilisateur
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
