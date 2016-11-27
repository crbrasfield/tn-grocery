<template>
  <div class="dashboard-wrap">
    <UserInfoPanel />
    <PostItem />
    <ItemList />
  </div>
</template>

<script>
import { store } from '../main.js'
import router from '../router.js'
import PostItem from './post-item.vue'
import UserInfoPanel from './user-info-panel.vue'
import ItemList from './item-list.vue'

export default {
  name: 'dashboard',
  components: {
    PostItem,
    UserInfoPanel,
    ItemList
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;;
  width: 950px;
  margin: auto;
  margin-top: 50px;
}
</style>
