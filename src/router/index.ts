import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

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
    meta: {
      requireAuth: true,
    },
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
        name: 'menu-create',
        path: '/menu/create',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create_or_edit' */ '@/views/menu/MenuCreate.vue'
          ),
      },
      {
        name: 'menu-edit',
        path: '/menu/:id/edit',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create_or_edit' */ '@/views/menu/MenuEdit.vue'
          ),
        props: true,
      },
      {
        name: 'role',
        path: '/role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
      },
      {
        name: 'alloc-menu',
        path: '/role/:roleId/alloc-menu',
        component: () =>
          import(
            /* webpackChunkName: 'alloc-menu' */ '@/views/role/AllocMenu.vue'
          ),
        props: true,
      },
      {
        name: 'alloc-resource',
        path: '/role/:roleId/alloc-resource',
        component: () =>
          import(
            /* webpackChunkName: 'alloc-resource' */ '@/views/role/AllocResource.vue'
          ),
        props: true,
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

router.beforeEach((to, from, next) => {
  // 将要跳转的需要权限验证
  if (to.matched.some((route) => route.meta.requireAuth)) {
    // 判断用户是否登录
    if (store.state.user) {
      next()
    } else {
      // 没有登录/登录过期
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  } else {
    next()
  }
})

export default router
