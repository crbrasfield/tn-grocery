import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import config from './firebase/index.js'

Vue.use(VueRouter)
firebase.initializeApp(config)

const app = new Vue({
  router
}).$mount('#app')
