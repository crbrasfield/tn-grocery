<template>
  <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">
          Item List
        </h3>
      </div>
        <div class="panel-body">
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

</style>
