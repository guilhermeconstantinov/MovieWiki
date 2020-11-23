import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Movies from '../components/Movies.vue'
import Series from '../components/Series.vue'
import Description from '../components/page/Description.vue'
import Favorite from '../components/Favorite.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    meta: {type: 'movie'},
    component: Description
  },
  {
    path: '/series',
    name: 'Series',
    component: Series
  },
  {
    path: '/serie/:id',
    name: 'Serie',
    meta: {type:'tv'},
    component: Description
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
