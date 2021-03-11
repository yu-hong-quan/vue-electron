import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base:process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: require('@/view/Home').default,
	  meta:{title:'首页'},
	  children:[
		{
		    path: '/userInfo',
		    name: 'userInfo',
		    component: resolve => require(['@/components/UserInfo'], resolve),
		    meta: { //配置路由元信息表
		        title: '用户信息',
		        keepAlive: true, // 需要被缓存
		        needLogin: true // 需要登录
		    },
		},
	  ]
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
