<template>
  <div class="info-wrap">
    User info in this module
    <hr>
    {{ userData.firstName }}
    {{ userData.lastName }}
  </div>
</template>

<script>
import { store } from '../main.js'
import router from '../router.js'

export default {
  name: 'dashboard',
  data () {
    return {
      uid: document.cookie,
      userData: {}
    }
  },
  mounted () {
    if (!this.uid) {
      router.push('/')
    }
    const userInfo = firebase.database().ref(`users/${this.uid}`)
    userInfo.on('value', (snapshot) => {
      this.userData = snapshot.val()
    })
  }
}
</script>

<style lang='scss' scoped>

.info-wrap {
  width: 300px;
  height: 350px;
  background-color: whitesmoke;
}

</style>
