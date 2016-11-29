<template>
  <div class="info-wrap">
    You are signed in as
    <br>
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
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 5px;
}

</style>
