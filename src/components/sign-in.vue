<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="wrap">
          <img class="img" src="http://vignette4.wikia.nocookie.net/mountaindew/images/2/20/CANDIDEW.png/revision/latest?cb=20120223231746" alt="">
          <div class="">

            <div class="input-group input">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <input class="form-control" type="text" id="email" placeholder="awesome@theranest.com" v-model="email">
            </div>
            <br>
            <div class="input-group input">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-key" aria-hidden="true"></i>
              </span>
              <input class="form-control" type="password" id="password" placeholder="Password" v-model="password">
            </div>
          </div>

          <div class="error-message">
            {{errorMessage}}
          </div>

          <div class="buttons">
            <button type="button" class="btn btn-primary button" name="signInButton" @click="signUp">
              Sign Up
            </button>
            <button type="button" class="btn btn-primary button" name="signInButton" @click="signIn">
              Sign In
              <i class="fa fa-sign-in icon" aria-hidden="true"></i>
            </button>
          </div>
          <div class='extra-links'>
            <router-link to="reset-password">Reset your password</router-link>
          </div>
        </div>
      </div>
    </div>
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
        router.push({path: '/'})
      })
      .catch((error) => {
        this.errorMessage = error.message
      })
    },
    goToResetPassword () {
      router.push({path: '/reset-password'})
    }
  }
}
</script>

<style lang='scss' scoped>
.img {
  margin: 10px;
  text-align: center;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
.wrap {
  display: flex;
  padding-top: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.button {
  width: 140px;
  margin: 10px;
  background-color: #85c53b;
  border: none;
}
.error-message {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}
.extra-links {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.input {

}
.icon {
  margin-left: 5px;
  font-size: 15px;
}
</style>
