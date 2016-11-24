import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import router from './router'
import config from './firebase/index.js'
import vueStore from './store.js'

Vue.use(Vuex) // initializing the store
export const store = new Vuex.Store(vueStore)
Vue.use(VueRouter) // initializing router

firebase.initializeApp(config) // connecting the app to firebase

const app = new Vue({ // linking app to the router
  router
}).$mount('#app')
