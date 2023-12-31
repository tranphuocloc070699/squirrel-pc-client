
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      beforeEnter: (to, from,next) => {
        const isAdmin = localStorage.getItem("admin");
        return isAdmin && isAdmin=='true' ? next() : false
      },
    },
    {
      path: '/podcast',
      name: 'podcast',
      component: () => import('../views/PodcastView.vue')
    },
    {
      path: '/podcast/:id',
      name: 'podcast-detail',
      component: () => import('../views/DetailPodcastView.vue')
    },
    {
      path: '/show/:id',
      name: 'show-detail',
      component: () => import('../views/ShowView.vue')
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('../views/BookView.vue')
    },
    {
      path: '/author/:id',
      name: 'author',
      component: () => import('../views/AuthorView.vue')
    },
    {
      path: '/category/:id',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/video/:id',
      name: 'video',
      component: () => import('../views/DetailVideoView.vue')
    },
    {
      path: '/channel/:id',
      name: 'channel',
      component: () => import('../views/ChannelView.vue')
    },
    {
      path: '/book/:id',
      name: 'book-detail',
      component: () => import('../views/DetailBookView.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../views/FeedbackView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
