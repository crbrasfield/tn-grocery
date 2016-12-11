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
            Upload Image<input type="file" @change="uploadPhoto" style="display: none;">
          </label>
          <button class="btn btn-danger" @click="closeUpload">Cancel</button>
        </div>

        <!-- Empty Profile Photo -->
        <div
          v-if="this.profilePhotoUrl === null"
          class='profile-bubble'
          v-bind:style="emptyProfileBubble"
          v-on:click="showUpload = !showUpload"
        >
        {{userData.initials}}
        </div>
        <!-- Has Profile Photo -->
        <div
          v-if="this.profilePhotoUrl !== null"
          v-bind:style="profilePhoto"
          class='profile-bubble'
          v-on:click="showUpload = !showUpload"
        >
        </div>

      <!-- <div @click="logout" class="logout">Logout</div> -->
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
      profilePhotoUrl: null,
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
        console.log('UPLOADED');
        this.$forceUpdate()
      }).catch(function(error){console.log(error)})
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
  },
  updated () {
    console.log('update!!')
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
