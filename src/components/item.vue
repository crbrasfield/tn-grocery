<template>
  <div class="item mdl-card mdl-shadow--2dp">
      <div class="item-info-div">
        <span>Created At: {{ item.createdAt }}</span>
        <span>Item: {{ item.name }}</span>
        <span>Link: {{ item.link }}</span>
        <span>Office: {{ item.office }}</span>
        <span>itemKey: {{ itemKey }}</span>
        <span>purchased: {{ item.purchased }}</span>
        <span>liked: {{ likeCount }}</span>
      </div>
      <div class='actions-div'>
        <button class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect' type="button" name="button" @click="likeItem(itemKey)" v-if="hasBeenLiked">
          <i class="material-icons blue">thumb_up</i>
        </button>
        <button class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect' type="button" name="button" @click="dislikeItem(itemKey)" v-else>
          <i class='material-icons blue'>thumb_down</i>
        </button>
        <button class='mdl-button white mdl-js-button mdl-button--accent' type="button" name="button" @click="markAsPurchased(itemKey)">Mark as Purchased</button>
        <button class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect' type="button" name="button" @click="deleteItem(itemKey)">
          <i class="material-icons red">delete_forever</i>
        </button>
      </div>
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
  margin: 10px auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.item-info-div {
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.actions-div {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #0E89BC;
}

.material-icons.blue {
  color: #ADD8E6;
}

.material-icons.red {
  color: red;
}

.mdl-button.white {
  color: white;
}

</style>
