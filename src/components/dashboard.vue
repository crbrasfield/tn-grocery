<template>
  <div class="wrap">


  <div class="row">

    <div class="col-md-12">
      <UserInfoPanel />
    </div>

  </div>

  <div class="row">

    <div class="col-md-6">
      <PostItem />
    </div>

    <div class="col-md-6">
      <ItemList />
    </div>

  </div>

  <div class="row">

  <div class="col-md-12">
    <Chat />
  </div>

  </div>
  </div>
</template>

<script>
import { store } from '../main.js'
import router from '../router.js'
import PostItem from './post-item.vue'
import UserInfoPanel from './user-info-panel.vue'
import ItemList from './item-list.vue'
import Chat from './chat.vue'

export default {
  name: 'dashboard',
  components: {
    PostItem,
    UserInfoPanel,
    ItemList,
    Chat
  },
  data () {
    return ({
      profilePhotoUrl: false
    })
  },
  mounted () {
    if (!document.cookie) {
      router.push('/sign-in')
    }
    //see if user has profile photo and download it
    // const userProfilePhotoRef = firebase.storage().ref(`profile-photos/${document.cookie}`)
    // userProfilePhotoRef.getDownloadURL().then((url) => {
    //   this.profilePhotoUrl = url
    // }).catch((error) => {
    //   return
    // })
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  max-width: 1000px;
  margin: auto;
}
</style>
