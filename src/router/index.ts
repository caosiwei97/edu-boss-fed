import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    name: 'login',
    path: '/login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
  },
  {
    name: '404',
    path: '*',
    component: () =>
      import(/* webpackChunkName: '404' */ '@/views/404/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'home',
        path: '',
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
      },
      {
        name: 'advert',
        path: '/advert',
        component: () =>
          import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
      },
      {
        name: 'advert-space',
        path: '/advert-space',
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'
          ),
      },
      {
        name: 'course',
        path: '/course',
        component: () =>
          import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
      },
      {
        name: 'menu',
        path: '/menu',
        component: () =>
          import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
      },
      {
        name: 'role',
        path: '/role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
      },
      {
        name: 'user',
        path: '/user',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
      },
      {
        name: 'resource',
        path: '/resource',
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ '@/views/resource/index.vue'
          ),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
