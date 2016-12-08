<template>
  <div v-if="this.userData" class="top-wrap">
    <div class="left-wrap">
       {{this.greeting()}}
    </div>
    <div class='right-wrap'>
      <div class="profile-div">

        <input v-if='showUpload' type="file" @change="uploadPhoto">

        <div
          v-if="this.profilePhotoUrl === null"
          class='profile-bubble'
          v-bind:style="styles"
          v-on:click="showUpload = !showUpload"
        >
        {{userData.initials}}
        </div>

        <div
          v-if="this.profilePhotoUrl !== null"
          v-bind:style="profilePhoto"
          class='profile-bubble'
          v-on:click="showUpload = !showUpload"
        >
        <i v-if="showUpload" class='fa fa-times' />
        </div>

      </div>
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
      profilePhotoUrl: null,
      showUpload: false
    })
  },
  computed: {
    styles: function() {
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

      }
    }
  },
  methods: {
    uploadPhoto (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref(`profile-photos/${document.cookie}`)
      let metadata = {customMetadata: {'uid': `${this.uid}`}}
      storageRef.put(file, metadata).then(function(snapshot){
        console.log('UPLOADED');
      }).catch(function(error){console.log(error)})
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
      console.log('successful download');
      this.profilePhotoUrl = url
    }).catch((error) => {
      console.log('FAILED download');
      this.profilePhotoUrl = null
      return
    })
  },
  mounted () {
    console.log(this.uid, this.profilePhotoUrl);
    if (!this.uid) {
      router.push('/')
    }
    this.time = moment().format('LT')

    const userInfo = firebase.database().ref(`users/${this.uid}`)
    userInfo.on('value', (snapshot) => {
      console.log('userData grabbed', snapshot.val());
      this.userData = snapshot.val()
    })
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100px;
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

.logout {
  cursor: pointer;
  align-self: flex-end;
  margin-top: 10px;
}

.logout:hover {
  text-decoration: underline;
}

.upload-text {
  margin-right: 5px;
}
</style>
