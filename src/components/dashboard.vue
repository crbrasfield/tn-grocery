<template>
  <div class="dashboard-wrap">

    <div class="info-container">
      <UserInfoPanel :profilePhotoUrl="profilePhotoUrl" />
    </div>

    <div class="item-container">
      <div class="post-container">
        <PostItem />
      </div>
      <div class="list-container">
        <ItemList />
      </div>
    </div>

    <br>

    <div class="chat-container">
      <Chat />
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
    const userProfilePhotoRef = firebase.storage().ref(`profile-photos/${document.cookie}`)
    userProfilePhotoRef.getDownloadURL().then((url) => {
      this.profilePhotoUrl = url
    }).catch((error) => {
      return
    })
  }
}
</script>

<style lang='scss' scoped>
.dashboard-wrap {
  // margin: auto;
  // max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 770px;
  margin: auto;
  // flex-direction: row;
  // margin-top: 25px;
}
.info-container {
  display: flex;
  width: 100%;
}
.item-container {
  display: flex;
  // align-items: center;
}
.post-container {

}
.list-container {

}
.chat-container {

}
</style>
