import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from './views/Landingpage.vue'
import Dashboardpage from './views/Dashboard.vue'
import Detail from './views/Detail.vue'
import User from './views/User.vue'
import Transaction from './components/Transaction.vue'
import Cart from './components/Cart.vue'
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
      component: Dashboardpage
    },
    {
        path: '/detail/:id',
        component: Detail
    },
    {
        path: '/user',
        component: User,
        children:[
            {
                path: 'transaction',
                component: Transaction
            },
            {
                path: 'cart',
                component: Cart
            }
        ]
    }
  ]
})
