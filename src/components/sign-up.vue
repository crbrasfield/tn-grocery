<template>
  <div id="sign-up">
    <h1>Sign Up</h1>

    <div class="flex-input-container">
      <div class="mdl-textfield mdl-js-textfield text-left">
        email
        <input class="mdl-textfield__input" type="text" id="email" v-model="email">
      </div>

      <div class="mdl-textfield mdl-js-textfield text-left">
        password
        <input class="mdl-textfield__input" type="password" id="password" v-model="password">
      </div>

      <div class="mdl-textfield mdl-js-textfield text-left">
        first name
        <input class="mdl-textfield__input" type="firstName" id="firstName" v-model="firstName">
      </div>

      <div class="mdl-textfield mdl-js-textfield text-left">
        last name
        <input class="mdl-textfield__input" type="lastName" id="lastName" v-model="lastName">
      </div>
    </div>

    <div class="flex-button-container">
      <button class="button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="button" name="backButton" @click="back">Back</button>
      <button class="button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="button" name="registerButton" @click="register">Sign Up</button>
    </div>

    <div class="success-message">
      {{ successMessage }}
    </div>
    <div class="error-message">
      {{errorMessage}}
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
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        // console.log(res)
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
        email,
        uid,
        photo: null,
        admin: false
      })
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
