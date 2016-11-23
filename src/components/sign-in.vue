<template>
  <div id="sign-in">
    <h1>Sign in page</h1>
    TheraNest Email:<input type="input" name="userName" v-model="email">
    <br>
    Password:<input type="input" name="password" v-model="password">
    <br>
    <button type="button" name="signInButton" @click="signUp">Sign Up</button>
    <button type="button" name="signInButton" @click="signIn">Sign In</button>
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
  name: 'sign-in',
  data () {
    return ({
      email: '',
      password: '',
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
        }
      )
      .catch((error) => {
        this.errorMessage = error.message
        this.successMessage = ''
      })
    },
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        console.log(res.uid)
        router.push({path: `dashboard/${res.uid}`})
      })
    },
    dashboard () {
      router.push('dashboard')
    }
  }
}
</script>

<style lang='scss' scoped>
#sign-in {
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
