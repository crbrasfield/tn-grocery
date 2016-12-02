<template>
  <div v-bind:class="[!item.purchased ? 'panel-primary' : 'panel-success', 'panel']">
        <div class="panel-heading">
            <!-- <div v-if="profileImage" class="profile-bubble" v-bind:style="{borderColor: posterData.profileTheme}">
              <img class="profile-image" :src="profileImage"/>
            </div>
            <div v-if="!profileImage" class="profile-bubble" v-bind:style="{backgroundColor: posterData.profileTheme}">
              <span class="profile-initials">{{ posterData.initials }}</span>
            </div> -->
            <div class="row">
              <div class="col-md-8">
                <h4>
                  {{ item.name }}
                  <a v-if="item.link" class="item-link" :href="item.link" target="_blank">View</a>
                </h4>
              </div>
              <div class="col-md-2">
                <span class="">{{ item.office }}</span>
              </div>
          <div class='col-md-2'>
            <div  v-if="item.purchased" class="">
              Ordered!
            </div>
            <div  v-if="!item.purchased" class="">
              Pending
            </div>
          </div>
        </div>
        </div>
        <div class="panel-body">
            <div class="col-md-12">
              {{ item.description }}
            </div>
        </div>
            <div class="panel-footer footer">
              <div class="row">
                <div class="col-md-6">
                  <span class="" @click="dislikeItem(itemKey)" v-if="!hasBeenLiked">
                    <span class="">{{ likeCount }}</span>
                    <i class="fa fa-star" aria-hidden="true"></i>
                  </span>
                  <span class="" @click="likeItem(itemKey)" v-else>
                    <span class="">{{ likeCount }}</span>
                    <i class="fa fa-star-o" aria-hidden="true"></i>
                  </span>
                </div>
                <div class="col-md-6 right">
                  <div v-if="userIsAdmin() && !item.purchased" class="left" @click="markAsPurchased(itemKey)">
                    <i class="fa fa-check" aria-hidden="true"></i>Purchased
                  </div>
                  <div v-if="postedByThisUser(item.postedBy)" class="" @click="deleteItem(itemKey)">
                    <i class="fa fa-times" aria-hidden="true"></i>Cancel
                  </div>
                </div>
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
h4 {
  margin: 3px;
}
.panel-heading {
  padding-top: 1px;
  padding-bottom: 1px;
}
.right {
  text-align: right;
}
.left {
  float: left;
}
.footer {
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
