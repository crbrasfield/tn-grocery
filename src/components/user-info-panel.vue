<template>
  <div class="info-wrap">
    <div class="profile-bubble" v-bind:style="{backgroundColor: userData.profileTheme}">
      <span class="profile-initials">{{ userData.firstName.substring(0,1).toUpperCase() }}</span>
      <span class="profile-initials">{{ userData.lastName.substring(0,1).toUpperCase() }}</span>
    </div>
    <input type='file' id='file-input' v-on:change="handleFiles">
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
  computed () {
    return {
      profileTheme: function () {
        return this.userData.profileTheme
      }
    }
  },
  methods: {
    handleFiles (e) {
      let image = e.target.files[0]
      console.log('Hello ', e.target.files[0])
      let storageRef = firebase.storage().ref()
      let nameRef = storageRef.child(image.name)
      let fullPathRef = storageRef.child(`images/${image.name}`)
      let metadata = {
        customMetadata: {
          'uid': `${this.uid}`
        }
      }
      fullPathRef.put(image, metadata).then(function(snapshot) {
        console.log('Uplaoded image!', snapshot.val())
      })
    }
  },
  mounted () {
    console.log(this.uid)
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

.profile-bubble {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-initials {
  display: flex;
  color: white;
  font-size: 14pt;
  padding: 3%;
}

</style>
