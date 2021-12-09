import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CountryDetail from '../views/CountryDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
    meta: {
      title: 'Search by country'
    }
  },
  {
    path: '/:country',
    name: 'country-detail',
    component: CountryDetail,
    props: true,
    meta: {
      title: 'Detailed information about the country'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
