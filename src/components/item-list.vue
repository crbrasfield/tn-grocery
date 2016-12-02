<template>
  <div class="">

      <!-- <ul class="nav nav-tabs">
        <li role="presentation" v-bind:class="{ active: showFullList }"><a href="#" @click="showAllItems">All Items</a></li>
      </ul> -->
      <h2>Item List</h2>
        <div v-for="(item, key) in items">
          <Item
          :item="item"
          :itemKey="key"
          :hasBeenLiked="hasBeenLiked(key)"
          :likeCount="likeCount(item.likes || 0)"
          />
        </div>
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
      const allItems = snapshot.val()
      this.items = allItems
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
.item-list-wrap {
  margin: 5px;
  width: 540px;
}
.item-list {
  width: 100%;
  padding: 10px;
  box-shadow: 2px 10px 24px -8px rgba(0,0,0,0.55);
  background-color: #fbfbfb;
  height: 360px;
  overflow: scroll;
}
.item-wrap {
  padding: 10px;
  border-radius: 5px;
}
.item-wrap:nth-child(odd) {
  background-color: #f5f5f5;
  padding: 10px;
}
.main-head {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px 0px 15px;
  border-radius: 5px 5px 0 0;
  background-color: #fbfbfb;
  color: #008cc7;
  box-shadow: 2px 10px 24px -8px rgba(0,0,0,0.55);
  border-top: 1px solid whitesmoke;
  border-left: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;
  float: left;
}
.list-type-button {
  display: inline-block;
  padding: 5px;
  border-radius: 5px 5px 0 0;
  background-color: whitesmoke;
  color: #008cc7;
  box-shadow: 2px 10px 24px -8px rgba(0,0,0,0.55);
  border-top: 1px solid whitesmoke;
  border-left: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;
  float: right;
  margin-left: 10px;
}
.active {
  background-color: white;
}
</style>
