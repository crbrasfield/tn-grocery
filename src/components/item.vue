<template>
  <div class="item">
      <div>
        Item: {{ item.name }}
        <br>
        <span class="item-link" @click="openItemLink(item.link)">View Item (broken atm)</span>
        <br>
        itemKey: {{ itemKey }}
        <br>
        purchased: {{ item.purchased }}
        <br>
        <div class="like-container" >
          <span class="like-span" @click="dislikeItem(itemKey)" v-if="!hasBeenLiked">
            <span class="like-button-text">{{ likeCount }}</span>
            <i class="material-icons icon liked">thumb_up</i>
          </span>
          <span class="like-span" @click="likeItem(itemKey)" v-else>
            <span class="like-button-text">{{ likeCount }}</span>
            <i class="material-icons icon disliked">thumb_up</i>
          </span>
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
    },
    openItemLink (link) {
      window.open(
        link,
        '_blank'
      )
    }
  },
  computed: {
    hasUserLikedThisItem () {}
  }
}
</script>

<style lang='scss' scoped>
.item {
  margin-bottom: 5px;
}
.item-link {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
.like-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: lightgrey;
  width: 50px;
  border-radius: 5px;
  padding: 5px;
}
.like-span {
  display: flex;
  align-items: center;
  justify-content: center;
}
.like-button-text {
  font-size: 15px;
  margin-right: 5px;
  padding-top: 3px;
}
.liked {
  color: #00b3fe;
}
.disliked {
  color: grey;
}
.icon {

}
</style>
