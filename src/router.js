import VueRouter from 'vue-router'
import SignIn from './components/sign-in.vue'
import SignUp from './components/sign-up.vue'
import Dashboard from './components/dashboard.vue'
import NotFound from './components/not-found.vue'

const routes = [
  { path: '/', component: SignIn },
  { path: '/sign-up', component: SignUp },
  { path: '/dashboard', component: Dashboard },
  { path: '/not-found', component: NotFound }
]

const router = new VueRouter({
  routes
})

export default router
