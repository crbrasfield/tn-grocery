<template>
  <div class="item-list">
    display item list

  <hr>

    <div class="" v-for="(item, key) in items">
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

export default {
  name: 'item-list',
  components: {
    Item
  },
  data () {
    return ({
      items: {}
    })
  },
  mounted () {
    const itemList = firebase.database().ref().child(`items`)
    itemList.on('value', (snapshot) => {
      this.items = snapshot.val()
    })
  },
  methods: {
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
  width: 300px;
  min-height: 350px;
  background-color: whitesmoke;
}
</style>
