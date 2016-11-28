<template>
  <div class="item-list">
    <span class="main-head">
      Item List
    </span>
    <div class="list-type-button" v-bind:class="{ active: showFullList }" @click="showAllItems">All Items</div>
    <div class="list-type-button" v-bind:class="{ active: !showFullList }" @click="showPurchasedItems">Purchased Items</div>
    <div v-if="showFullList" v-for="(item, key) in items">
      <Item
      :item="item"
      :itemKey="key"
      :hasBeenLiked="hasBeenLiked(key)"
      :likeCount="likeCount(item.likes || 0)"
      />
    </div>
    <div  v-if="!showFullList" v-for="(item, key) in purchasedItems">
      <Item
      :item="item"
      :itemKey="key"
      :hasBeenLiked="hasBeenLiked(key)"
      :likeCount="likeCount(item.likes || 0)"
      />
    </div>

  </div>
</template>

<script>
import Item from './item.vue'
import _ from 'lodash'

export default {
  name: 'item-list',
  components: {
    Item
  },
  data () {
    return ({
      items: {},
      purchasedItems: {},
      showFullList: true
    })
  },
  mounted () {
    const itemList = firebase.database().ref().child(`items`)
    itemList.on('value', (snapshot) => {
      console.log(snapshot.val())
      this.items = snapshot.val()
      this.purchasedItems = _.pickBy(snapshot.val(), (item) => item.purchased)
    })
  },
  methods: {
    showAllItems () {
      this.showFullList = true
    },
    showPurchasedItems () {
      this.showFullList = false
    },
    markAsPurchased (key) {
      firebase.database().ref(`items/${key}`).update({purchased: true})
    },
    deleteItem (key) {
      firebase.database().ref(`items/${key}`).remove()
    },
    hasBeenLiked (key) {
      if (this.items[key].likes) {
        return this.items[key].likes[document.cookie]
        ? false
        : true
      } else {
        return true
      }
    },
    likeCount (likes) {
      return Object.keys(likes).length
    }
  }
}
</script>

<style lang='scss' scoped>
.item-list {
  min-height: 350px;
  padding: 15px;
}
.main-head {
  font-size: 20px;
  font-weight: bold;
  color: #008cc7;
}
.list-type-button {
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  background-color: #008cc7;
  color: white;
}
.active {
  background-color: #006f9e;
}
</style>
