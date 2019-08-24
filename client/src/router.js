import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from './views/Landingpage.vue'
import Dashboardpage from './views/Dashboard.vue'
import Detail from './views/Detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing_page',
      component: Landingpage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboardpage,
      children: []
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
        path: '/detail/:id',
        component: Detail
    }
  ]
})
