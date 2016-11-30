<template>
  <div class="info-wrap">
    <div v-if="hasProfilePhoto" class="profile-bubble" id="profile-bubble" v-bind:style="{backgroundColor: userData.profileTheme}">
    </div>
    <div v-if="!hasProfilePhoto" class="profile-bubble" id="profile-bubble" v-bind:style="{backgroundColor: userData.profileTheme}">
      <span class="profile-initials">{{ userData.initials }}</span>
    </div>
    <input type='file' id='file-input' v-on:change="handleFiles">
  </div>
</template>

<script>
import { store } from '../main.js'
import router from '../router.js'

export default {
  name: 'dashboard',
  props: ['profilePhotoUrl'],
  data () {
    return ({
      uid: document.cookie,
      userData: false
    })
  },
  methods: {
    handleFiles (e) {
      let image = e.target.files[0]
      let storageRef = firebase.storage().ref()
      let nameRef = storageRef.child(image.name)
      let fullPathRef = storageRef.child(`profile-photos/${this.uid}`)
      let metadata = {
        customMetadata: {
          'uid': `${this.uid}`
        }
      }
      fullPathRef.put(image, metadata).then(function(snapshot) {
        console.log('Uploaded image!', snapshot)
      })
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
    if (this.profilePhoto) {
      document.getElementById("profile-bubble").style.backgroundImage=`url(${this.profilePhotoUrl})`
    }
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
  background-repeat: none;
  background-position: center;
  background-size: cover;
}

.profile-initials {
  display: flex;
  color: white;
  font-size: 14pt;
  padding: 3%;
}

</style>
