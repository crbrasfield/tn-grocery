<template>
  <div>
  <div v-if="this.userData" class="top-wrap">
    <div class="left-wrap">
       {{this.greeting()}}
    </div>
    <div class='right-wrap'>

        <!-- file upload input -->
        <div v-if='showUpload' class='profile-upload-actions'>
          <label class='btn btn-primary'>
            Upload Profile Photo<input type="file" @change="uploadPhoto" style="display: none;">
          </label>
          <button v-if='profilePhotoUrl' class="btn btn-warning" @click="removeProfilePhoto">Remove Profile Photo</button>
          <button class="btn btn-danger" @click="closeUpload">Cancel</button>
        </div>

        <!-- Empty Profile Photo -->
        <div
          v-if="!this.profilePhotoUrl"
          class='profile-bubble'
          v-bind:style="emptyProfileBubble"
          v-on:click="showUpload = !showUpload"
        >
        {{userData.initials}}
        </div>
        <!-- Has Profile Photo -->
        <div
          v-if="this.profilePhotoUrl"
          v-bind:style="profilePhoto"
          class='profile-bubble'
          v-on:click="showUpload = !showUpload"
        >
        </div>
    </div>
  </div>
  <div class="bottom-wrap">
    <div @click="logout" class="logout">Logout</div>
  </div>
  </div>
</template>

<script>
import { store } from '../main.js'
import router from '../router.js'
import moment from 'moment'

export default {
  name: 'dashboard',
  data () {
    return ({
      uid: document.cookie || '',
      userData: false,
      time: '',
      hasPhoto: false,
      profilePhotoUrl: false,
      showUpload: false
    })
  },
  computed: {
    emptyProfileBubble: function() {
      return {
        'background-color': this.userData.profileTheme
      }
    },
    themeColor: function() {
      return {
        'color': this.userData.profileTheme
      }
    },
    profilePhoto: function() {
      return {
        'background-image': `url(${this.profilePhotoUrl})`,
        'border': `2px solid ${this.userData.profileTheme}`

      }
    }
  },
  methods: {
    uploadPhoto (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref(`profile-photos/${document.cookie}`)
      let metadata = {customMetadata: {'uid': `${this.uid}`}}
      storageRef.put(file, metadata).then(function(snapshot){
        this.updateUserHasPhoto(true) //update hasPhoto user prop
        this.closeUpload()
      }.bind(this)).catch(function(error){console.log(error)})
    },
    removeProfilePhoto () {
      let storageRef = firebase.storage().ref(`profile-photos/${document.cookie}`)
      storageRef.delete().then(function(){
        this.updateUserHasPhoto(false) //update hasPhoto user prop
      }.bind(this)).catch(function(error){ console.log('Error', error)} )
    },
    updateUserHasPhoto (bool){
      let userRef = firebase.database().ref(`users/${document.cookie}`)
      userRef.update({
        hasPhoto: bool
      })
    },
    closeUpload () {
      this.showUpload = false
    },
    logout () {
      document.cookie = ''
      router.push('/sign-in')
    },
    greeting () {
      if (this.time.includes('AM')) {
        return `Good morning, ${this.userData.firstName}!`
      }
      if (this.time.includes('PM')) {
        let timeOfAfternoon = parseInt(this.time.slice(0,1))
        if (timeOfAfternoon === 12 || (timeOfAfternoon >= 1  && timeOfAfternoon <= 5)) {
          return `Good afternoon, ${this.userData.firstName}!`
        } else {
          return `Good evening, ${this.userData.firstName}!`
        }
      }
    }
  },
  created () {
    const userProfilePhotoRef = firebase.storage().ref(`profile-photos/${document.cookie}`)
    userProfilePhotoRef.getDownloadURL().then((url) => {
      this.profilePhotoUrl = url
    }).catch((error) => {
      this.profilePhotoUrl = false
      return
    })
  },
  mounted () {
    if (!this.uid) {
      router.push('/')
    }
    this.time = moment().format('LT')

    const userInfo = firebase.database().ref(`users/${this.uid}`)
    userInfo.on('value', (snapshot) => {
      this.userData = snapshot.val()
    })
  },
  updated () {
    if (this.userData.hasPhoto){ //conditional that prevents firebase from throwing errors after looking at ref that doesn't exist
      const userProfilePhotoRef = firebase.storage().ref(`profile-photos/${document.cookie}`)
      userProfilePhotoRef.getDownloadURL().then((url) => {
        this.profilePhotoUrl = url
      }).catch((error) => {
        this.profilePhotoUrl = false
        return
      })
    } else {
      this.profilePhotoUrl = false
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

.bottom-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.left-wrap {
  margin: 5px;
  display: flex;
  flex: 1;
  height: 50px;
  align-items: flex-end;
  font-size: 20px;
}

.right-wrap {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
}

.profile-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.profile-bubble {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-repeat: none;
  background-position: center;
  background-size: cover;
  color: white;
  font-size: 14pt;
  padding: 3%;
  cursor: pointer;
}

.profile-upload-actions {
  margin-right: 5%;
}

.logout {
  cursor: pointer;
  margin-bottom: 10px;
}

.logout:hover {
  text-decoration: underline;
}

.upload-text {
  margin-right: 5px;
}
</style>
