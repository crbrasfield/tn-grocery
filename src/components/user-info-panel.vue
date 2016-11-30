<template>
  <div class="top-wrap">
  <div class="left-wrap">
     Hello, {{ userData.firstName }}!
  </div>
  <div @click="logout" class="right-wrap">
    Logout
  </div>
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
      uid: document.cookie || '',
      userData: false
    })
  },
  methods: {
    // handleFiles (e) {
    //   let image = e.target.files[0]
    //   let storageRef = firebase.storage().ref()
    //   let nameRef = storageRef.child(image.name)
    //   let fullPathRef = storageRef.child(`profile-photos/${this.uid}`)
    //   let metadata = {
    //     customMetadata: {
    //       'uid': `${this.uid}`
    //     }
    //   }
    //   fullPathRef.put(image, metadata).then(function(snapshot) {
    //     console.log('Uploaded image!', snapshot)
    //   })
    // }
    logout () {

      document.cookie = ''
      router.push('/sign-in')
    }
  },
  mounted () {
    console.log(this.uid);
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
.top-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #008cc7;
}
.left-wrap {
  margin: 5px;
  display: flex;
  height: 50px;
  align-items: center;
  font-size: 20px;
}

.right-wrap {
  cursor: pointer;
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
