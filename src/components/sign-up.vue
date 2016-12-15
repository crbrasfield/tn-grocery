<template>
  <div class="container">
    <div class="side-note">
      <h2>Before you sign up!</h2>
      <p>Hi everyone! In case you are still wondering, this is a small side project developed by Chase and Eric
      as an OKR for each of us to become better developers as well as give you all what we hope will prove to be
      a useful tool for the internal employees.</p>
      <p>Do keep in mind that this is a work in progress, and anything weird that you see is probably
      us trying to make you laugh!</p>
      <div class="logo-quote">
        <p>Thank you for checking this project out and we hope you enjoy it!</p>
        <img class="img-small" src="https://images.g2crowd.com/uploads/product/image/1473786466/theranest-mental-health.png" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="wrap">
          <div class="">
            <div class="input-group input">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <input class="form-control" type="text" id="email" placeholder="Email" v-model="email">
            </div>
            <br>
            <div class="input-group input">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-key" aria-hidden="true"></i>
              </span>
              <input class="form-control" type="password" id="password" placeholder="Password" v-model="password">
            </div>
            <br>
            <div class="input-group input">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </span>
              <input class="form-control" type="text" id="firstName" placeholder="First Name" v-model="firstName">
            </div>
            <br>
            <div class="input-group input">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </span>
              <input class="form-control" type="text" id="lastName" placeholder="Last Name" v-model="lastName">
            </div>
          </div>

          <div class="error-message">
            {{errorMessage}}
          </div>

          <div class="buttons">
            <button type="button" class="btn btn-primary button" name="signInButton" @click="back">
              Back
            </button>
            <button type="button" class="btn btn-primary button" name="signInButton" @click="register">
              Create
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
    register () {
      if (!this.firstName || !this.lastName) {
        this.errorMessage = 'Please give us your name... for science.'
        return
      }
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((res) => {
          this.createUserDataOnDatabase(res)
          this.successMessage = 'Account created!'
          this.errorMessage = ''
          this.delayedReRoute('/')
        }
      )
      .catch((error) => {
        this.errorMessage = error.message
        this.successMessage = ''
      })
    },
    back () {
      router.push('/')
    },
    delayedReRoute (route) {
      setTimeout(() => {
        router.push({path: route})
      }, 1000)
    },
    createUserDataOnDatabase (data) {
      const {
        uid,
        email,
      } = data
      firebase.database().ref(`users/${uid}`).set({
        firstName: this.firstName,
        lastName: this.lastName,
        initials: `${this.firstName.substring(0,1).toUpperCase()}${this.lastName.substring(0,1).toUpperCase()}`,
        email,
        uid,
        profileTheme: `rgb(0,${Math.floor((Math.random()) * 90) + 100},${Math.floor((Math.random() * 90)) + 100})`,
        photo: null,
        admin: false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.side-note {
  // background-color: red;
  height: 100px;
  width: 500px;
  padding-right: 20px;
  margin-top: -200px;
}
.img {
  margin: 20px;
  text-align: center;
  width: 75%;
}
.img-small {
  width: 8%;
  padding-bottom: 15px;
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
.logo-quote {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
}
.icon {
  margin-left: 5px;
  font-size: 15px;
}
</style>
