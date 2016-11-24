<template>
  <div id="sign-up">
    <h1>Sign Up</h1>
    TheraNest Email:<input type="input" name="userName" v-model="email">
    <br>
    Password:<input type="input" name="password" v-model="password">
    <br>
    First Name:<input type="input" name="firstName" v-model="firstName">
    <br>
    Last Name:<input type="input" name="lastName" v-model="lastName">
    <br>
    <button type="button" name="signInButton" @click="signUp">Register</button>
    <div class="success-message">
      {{ successMessage }}
    </div>
    <div class="error-message">
      {{errorMessage}}
    </div>

    <button type="button" name="button" @click="dashboard">Jump to dashboard</button>
  </div>
</template>

<script>
import router from '../router.js'
export default {
  name: 'sign-up',
  data () {
    return ({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      successMessage: '',
      errorMessage: ''
    })
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((res) => {
          this.successMessage = 'Account created!'
          this.errorMessage = ''
          this.delayedReRoute('sign-in')
        }
      )
      .catch((error) => {
        this.errorMessage = error.message
        this.successMessage = ''
      })
    },
    dashboard () {
      router.push('dashboard')
    },
    delayedReRoute (route) {
      setTimeout(() => {
        router.push({path: route})
      }, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
#sign-up {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: 1000px;
  margin: auto;
  border-left: 2px solid #2c3e50;
  min-height: 200px;
  text-align: left;
  padding-left: 50px;
}

.button {
  margin: 10px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
