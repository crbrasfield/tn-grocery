<template>
  <div id="reset-password">
    <div v-if='!emailSent'>
      <h1>Password Reset</h1>
      <p>Enter your email associated with your account and a password recovery email will be sent to you :)
      <div class="flex-input-container">
        <div class="mdl-textfield mdl-js-textfield text-left">
          email
          <input class="mdl-textfield__input" type="text" id="emai;" v-model="email">
        </div>
      </div>

      <div class="error-message">
        {{errorMessage}}
      </div>

      <div class="flex-button-container">
        <button class="button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="button" name="signInButton" @click="goBack">Back</button>
        <button class="button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="button" name="signInButton" @click="resetPassword">Reset Password</button>
      </div>
      <div>
        <span @click="goToResetPassword" Reset your password.</span>
      </div>
    </div>

    <div v-if="emailSent" class='email-sent'>
      <i class="fa fa-check-circle fa-5x check" aria-hidden="true"></i><h1>EMAIL SENT!<h1>
    </div>
  </div>
</template>

<script>
import router from '../router.js'
import { store } from '../main.js'

export default {
  name: 'reset-password',
  data () {
    return ({
      email: '',
      emailSent: false,
      errorMessage: ''
    })
  },
  methods: {
    goBack () {
      router.replace({path: 'sign-in'})
    },
    delayedReRoute (route) {
      setTimeout(() => {
        router.push({path: route})
      }, 2000)
    },
    resetPassword () {
      firebase.auth().sendPasswordResetEmail(this.email)
      .then((res) => {
        this.emailSent = true
        this.delayedReRoute('/sign-in')
      })
      .catch((error) => {
        console.log(error);
        error.code === 'auth/user-not-found' ? this.errorMessage = 'Email not in use.' : this.errorMessage = error.message
      })
    },
    goToResetPassword () {
      router.replace({path: '/reset-password'})
    }
  }
}
</script>

<style lang='scss' scoped>
#reset-password {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.email-sent {
  color: #42b983;
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

.error-message {
  color: red;
}

.success-message {
  color: green;
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
