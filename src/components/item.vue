<template>
  <div class="item">
      <div>
        <div class="status-row">
          <a class="item-title" target="_blank" :href="item.link" >
            {{ item.name }}
          </a>
          <!-- Item order status -->
          <div  v-if="item.purchased" class="item-has-been-ordered">
            Item ordered! <span class="material-icons small-icon">check</span>
          </div>
          <div  v-if="!item.purchased" class="item-has-not-been-ordered">
            Order Pending...
          </div>
        </div>
        <span class="office-text">
          Office: {{ item.office }}
        </span>
          <br>
          <br>
          "{{ item.description }}"
        <div class="action-row">
          <div class="like-container" >
            <span class="like-span" @click="dislikeItem(itemKey)" v-if="!hasBeenLiked">
              <span class="like-button-text liked">{{ likeCount }}</span>
              <i class="material-icons icon liked">thumb_up</i>
            </span>
            <span class="like-span" @click="likeItem(itemKey)" v-else>
              <span class="like-button-text disliked">{{ likeCount }}</span>
              <i class="material-icons icon disliked">thumb_up</i>
            </span>
          </div>
          <div v-if="userIsAdmin() && !item.purchased" class="mark-purchased-button" @click="markAsPurchased(itemKey)">
            Mark As purchased
            <i class="material-icons small-icon">check</i>
          </div>
          <div v-if="postedByThisUser(item.postedBy)" class="cancel-button" @click="deleteItem(itemKey)">
            Cancel Request
            <i class="material-icons small-icon">cancel</i>
          </div>
        </div>

  </div>
</template>

<script>
export default {
  name: 'item',
  props: ['item', 'itemKey', 'hasBeenLiked', 'likeCount'],
  data () {
    return ({
      itemData: null,
      users: null
    })
  },
  mounted () {
    const users = firebase.database().ref().child(`users`)
    users.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
  },
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
    postedByThisUser (itemKey) {
      return itemKey == document.cookie
    },
    userIsAdmin () {
      if (this.users) {
        return this.users[document.cookie].admin
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.item {
  margin-bottom: 5px;
}
.status-row {
  display: flex;
  justify-content: space-between;
}
.action-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.item-title {
  color: #8dcf3a;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
}
.item-link {
  color: #00b3fe;
  cursor: pointer;
}
.cancel-button {
  align-items: center;
  justify-content: center;
  display: flex;
  float: right;
  font-size: 12px;
  background-color: red;
  color: white;
  border-radius: 5px;
  padding: 2px 4px 2px 6px;
  cursor: pointer;
}
.office-text {
  font-size: 13px;
}
.like-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 50px;
  border-radius: 5px;
  padding: 2px;
}
.like-span {
  display: flex;
  align-items: center;
  justify-content: center;
}
.like-button-text {
  font-size: 17px;
  margin-right: 5px;
  padding-top: 3px;
}
.liked {
  color: #00b3fe;
}
.disliked {
  color: grey;
}
.item-has-been-ordered {
  color: #8dcf3a;
}
.item-has-not-been-ordered {
  color: lightgrey;
}
.small-icon {
  font-size: 15px;
  padding-left: 5px;
}
.mark-purchased-button {
  align-items: center;
  justify-content: center;
  display: flex;
  float: right;
  font-size: 12px;
  color: white;
  border-radius: 5px;
  padding: 2px 4px 2px 6px;
  cursor: pointer;
  background-color: #8dcf3a;
}
</style>
