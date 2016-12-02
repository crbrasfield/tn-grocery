import VueRouter from 'vue-router'
import SignIn from './components/sign-in.vue'
import SignUp from './components/sign-up.vue'
import ResetPassword from './components/reset-password.vue'
import Dashboard from './components/dashboard.vue'
import UserInfoPanel from './components/user-info-panel.vue'
import NotFound from './components/not-found.vue'
import PostItem from './components/post-item.vue'

const routes = [
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: SignUp },
  { path: '/reset-password', component: ResetPassword },
  { path: '/', component: Dashboard },
  { path: '*', component: NotFound },

]

const router = new VueRouter({
  routes
})

export default router
