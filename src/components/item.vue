<template>
  <div class="">
        <div class="">
          <div class=''>
            <!-- <div v-if="profileImage" class="profile-bubble" v-bind:style="{borderColor: posterData.profileTheme}">
              <img class="profile-image" :src="profileImage"/>
            </div>
            <div v-if="!profileImage" class="profile-bubble" v-bind:style="{backgroundColor: posterData.profileTheme}">
              <span class="profile-initials">{{ posterData.initials }}</span>
            </div> -->
            <div class="">
              {{ item.name }}
              <a v-if="item.link" class="item-link" :href="item.link" target="_blank">View</a>
            </div>
              <span class="">{{ item.office }} Office</span>
          </div>
          <!-- Item order status -->
          <div class=''>
            <div  v-if="item.purchased" class="">
              Item ordered! <span class="">check</span>
            </div>
            <div  v-if="!item.purchased" class="">
              Order Pending
            </div>
          </div>
        </div>
          "{{ item.description }}"
        <div class="">
          <div class="" >
            <span class="" @click="dislikeItem(itemKey)" v-if="!hasBeenLiked">
              <span class="">{{ likeCount }}</span>
              <i class="">thumb_up</i>
            </span>
            <span class="" @click="likeItem(itemKey)" v-else>
              <span class="">{{ likeCount }}</span>
              <i class="">thumb_up</i>
            </span>
          </div>
          <div v-if="userIsAdmin() && !item.purchased" class="" @click="markAsPurchased(itemKey)">
            Mark As purchased
            <i class="material-icons small-icon">check</i>
          </div>
          <div v-if="postedByThisUser(item.postedBy)" class="" @click="deleteItem(itemKey)">
            Cancel Request
            <i class="">cancel</i>
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
      itemData: {},
      users: {},
      posterData: {},
      postProfilePhotoUrl: false,
      profileImage: ''
    })
  },
  mounted () {
    const users = firebase.database().ref().child(`users`)
    users.on('value', (snapshot) => {
      this.users = snapshot.val()
    })

    // const postedByUserId = Object.keys(this.users).filter((userKey) => userKey === this.item.postedBy)
    // const postedByUserObject = this.users[postedByUserId]
    // this.posterData = postedByUserObject
    //
    //
    // const postedByRef = firebase.storage().ref(`profile-photos/${this.item.postedBy}`)
    // postedByRef.getDownloadURL().then((url) => {
    //   this.profileImage = url
    //   this.imagesLodaed = true
    // }).catch((error) => {
    //   return
    // })
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
      if (this.users[document.cookie]) {
        return this.users[document.cookie].admin
      } else {
        return false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.item {
  margin-bottom: 5px;
}
.header-row {
  display: flex;
  justify-content: space-between;
}
.profile-title-div {
  display: flex;
  justify-content: flex-start;
  padding-top: 5px;
  flex-direction: column;
}
.status-office-div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
}
.item-link {
  color: #00b3fe;
  cursor: pointer;
  font-size: 12px;
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
  color: #008cc7;
  padding-left: 5px;
}
.mdl-chip.teale {
  background-color: #008cc7;
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
.profile-bubble {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-style: solid;
  overflow: hidden;
}
.profile-initials {
  display: flex;
  color: white;
  font-size: 14pt;
  padding: 3%;
}
</style>
