<template>
  <div class="info-wrap">
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  background-color: #00b3fe;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}

</style>
