import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/menu/one',
    children: [
      {
        path: '/menu/one',
        component: () => import('@/views/Page1.vue')
      }, {
        path: '/menu/two',
        component: () => import('@/views/Page1.vue')
      }, {
        path: '/menu/three',
        component: () => import('@/views/Page1.vue')
      }, {
        path: '/menu/four',
        component: () => import('@/views/Page1.vue')
      }, {
        path: '/menu/five',
        component: () => import('@/views/Page1.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('admin_demo_token')
    console.log(token)
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

const originalPush = VueRouter.prototype.push
// 重写了原型上的push方法，统一的处理了错误信息
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
