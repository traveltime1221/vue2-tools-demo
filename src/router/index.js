import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/YearPickerPage',
    name: 'YearPickerPage',
    component: () => import('../views/YearPickerPage.vue')
  },
  {
    path: '/MonthRangePage',
    name: 'MonthRangePage',
    component: () => import('../views/MonthRangePage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
