import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const menuOneRule = { path: '/menuOne', name: 'menuOne', component: () => import('../views/Page1.vue') }
const menuTwoRule = { path: '/menuTwo', name: 'menuTwo', component: () => import('../views/Page2.vue') }
const menuThreeRule = { path: '/menuThree', name: 'menuThree', component: () => import('../views/Page3.vue') }
const menuFourRule = { path: '/menuFour', name: 'menuFour', component: () => import('../views/Page4.vue') }
const menuFiveRule = { path: '/menuFive', name: 'menuFive', component: () => import('../views/Page5.vue') }

const ruleMap = {
  menuOne: menuOneRule,
  menuTwo: menuTwoRule,
  menuThree: menuThreeRule,
  menuFour: menuFourRule,
  menuFive: menuFiveRule
}

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
      }
      // {
      //   path: '/menu/two',
      //   component: () => import('@/views/Page2.vue')
      // }, {
      //   path: '/menu/three',
      //   component: () => import('@/views/Page3.vue')
      // }, {
      //   path: '/menu/four',
      //   component: () => import('@/views/Page4.vue')
      // }, {
      //   path: '/menu/five',
      //   component: () => import('@/views/Page5.vue')
      // }
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

export const initDynamicRouter = () => {
  console.log(router)
  const rights = store.state.userInfo.rights
  console.log(rights)
  // const routes = router.options.routes
}

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  if (to.path === '/login' || to.path === '*') {
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
