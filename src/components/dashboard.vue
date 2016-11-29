<template>
  <div class="dashboard-wrap">

    <div class="info-container">
      <UserInfoPanel />
    </div>

    <div class="chat-container">
      <Chat />
    </div>
    <br>

    <div class="item-container">
      <div class="post-container">
        <PostItem />
      </div>
      <div class="list-container">
        <ItemList />
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
    return ({})
  },
  mounted () {
    if (!document.cookie) {
      router.push('/sign-in')
    }
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
  // flex-direction: row;
  // margin-top: 25px;
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
