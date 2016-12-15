<template>
  <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">
          Item List
        </h3>
      </div>
        <div class="panel-body">
        <div v-if="!items" class="empty-items">
          <h4>
            Dori is dying to buy something.
          </h4>
          <h4>
            Help her out and request an item!
          </h4>
        </div>
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
.empty-items {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: grey;
}
</style>
