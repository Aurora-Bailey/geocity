// Core
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import VueData from './modules/VueData'

// Pages
import Home from './pages/Home'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

// The Vue thing
Vue.use(VueRouter)
Vue.use(VueResource)

// Router
const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '*', component: NotFound }
]
const router = new VueRouter({
  // History mode makes links prettier, but requires dedicated hosting. (or in s3 set 404 to index.html)
  mode: 'history',
  routes // short for routes: routes
})

// Vue Main
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  data () {
    return VueData // Data is now native
  }
})
