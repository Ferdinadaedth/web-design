import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: login},
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    path: '/',
    name: 'getallquestions',
    component: () => import(/* webpackChunkName: "about" */ '../views/Getallquestions.vue')
  },
  {
    path: '/answer/:questionid',
    name: 'answer',
    component: () => import(/* webpackChunkName: "about" */ '../views/answer.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/user.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "about" */ '../views/message.vue')
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const tokenStr = sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
export default router
