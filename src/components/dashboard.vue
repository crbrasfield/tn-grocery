<template>
  <div id="not-found">
    Dashboard!
    {{ userData }}
    <div>
      <input
      v-model="userData.firstName"
      />
      <input
      v-model="userData.lastName"
      />
    </div>
  </div>
</template>

<script>
import { store } from '../main.js'

export default {
  name: 'dashboard',
  data () {
    return {
      uid: store.state.userId,
      userData: {}
    }
  },
  mounted () {
    const userInfo = firebase.database().ref(`users/${this.uid}`)
    userInfo.on('value', (snapshot) => {
      this.userData = snapshot.val()
    })
  }
}
</script>

<style lang='scss' scoped>

</style>
