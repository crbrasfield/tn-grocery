<template>
  <div class="item">
      <div>
        Item: {{ item.name }}
        <br>
        Link: {{ item.link }}
        <br>
        itemKey: {{ itemKey }}
        <br>
        purchased: {{ item.purchased }}
        <br>
        {{ likeCount }}
      </div>
      <button type="button" name="button" @click="deleteItem(itemKey)">Delete</button>
      <button type="button" name="button" @click="markAsPurchased(itemKey)">Mark as Purchased</button>
      <button type="button" name="button" @click="likeItem(itemKey)" v-if="hasBeenLiked">Add Vote</button>
      <button type="button" name="button" @click="dislikeItem(itemKey)" v-else>Remove Vote</button>


      <br>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: ['item', 'itemKey', 'hasBeenLiked', 'likeCount'],
  data () {
    return ({
      itemData: null
    })
  },
  mounted () {},
  methods: {
    markAsPurchased (key) {
      firebase.database().ref(`items/${key}`).update({purchased: true})
    },
    deleteItem (key) {
      firebase.database().ref(`items/${key}`).remove()
    },
    likeItem (key) {
      const uid = document.cookie
      firebase.database().ref(`items/${key}/likes/${uid}`).set({liked: true})
    },
    dislikeItem (key) {
      const uid = document.cookie
      firebase.database().ref(`items/${key}/likes/${uid}`).remove()
    }
  },
  computed: {
    hasUserLikedThisItem () {}
  }
}
</script>

<style lang='scss' scoped>
.item {
  margin: 10px;
  background-color: white;
}
</style>
