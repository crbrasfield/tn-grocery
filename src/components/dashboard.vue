<template>
  <div class="wrap">

  <div class="row">
    <div class="col-sm-12">
      <UserInfoPanel />
    </div>
  </div>

  <div class="row">
    <div class="col-sm-4">
      <PostItem />
    </div>
    <div class="col-sm-8">
      <ItemList />
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
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
  mounted () {
    if (!document.cookie) {
      router.push('/sign-in')
    }
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  max-width: 1000px;
  margin: auto;
  padding: 10px;
}
</style>
