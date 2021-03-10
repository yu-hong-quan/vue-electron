import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base:process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: require('@/view/Home').default
    },
    {
      path: '/',
      name: 'login',
      component: require('@/view/Login').default
    },
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/404',
      name: '404',
      component: require('@/components/404').default
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
