import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'button',
          name: 'Button',
          component: () => import('@/views/button.vue')
        },
        {
          path: 'backtop',
          name: 'BackTop',
          component: () => import('@/views/back-to-top.vue')
        },
        {
          path: 'carousel',
          name: 'Carousel',
          component: () => import('@/views/carousel.vue')
        },
        {
          path: 'preview',
          name: 'Preview',
          component: () => import('@/views/preview.vue')
        }
      ]
    }
  ]
})
