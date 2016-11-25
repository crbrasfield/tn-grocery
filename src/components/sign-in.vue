<template>
  <div id="sign-in">
    <h1>Sign In</h1>
    <div class="flex-input-container">
      <div class="mdl-textfield mdl-js-textfield text-left">
        email
        <input class="mdl-textfield__input" type="text" id="emai;" v-model="email">
      </div>

      <div class="mdl-textfield mdl-js-textfield text-left">
        password
        <input class="mdl-textfield__input" type="password" id="password" v-model="password">
      </div>
    </div>

    <div class="error-message">
      {{errorMessage}}
    </div>

    <div class="flex-button-container">
      <button class="button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="button" name="signInButton" @click="signUp">Sign Up</button>
      <button class="button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="button" name="signInButton" @click="signIn">Sign In</button>
    </div>

    <button type="button" name="button" @click="logId">Log current user ID</button>
  </div>
</template>

<script>
import router from '../router.js'
import { store } from '../main.js'

export default {
  name: 'sign-in',
  data () {
    return ({
      email: '',
      password: '',
      errorMessage: ''
    })
  },
  methods: {
    signUp () {
      router.push({path: 'sign-up'})
    },
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        document.cookie = res.uid
        router.push({path: 'dashboard'})
      })
      .catch((error) => {
        this.errorMessage = error.message
      })
    },
    logId () {},
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

.text-left {
  text-align: left;
}

.flex-input-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.flex-button-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
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
  background-color: #9dc641;
  color: white;
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
