<template>
  <div v-bind:class="[!item.purchased ? 'panel-info' : 'panel-success', 'panel']">
        <div class="panel-heading">
            <div v-if="profilePhotoUrl" class="profile-bubble" v-bind:style="profilePhoto">
            </div>
            <div v-if="!profilePhotoUrl" class="profile-bubble" v-bind:style="profileTheme">
              <span class="profile-initials">{{ userData.initials }}</span>
            </div>
            <div class="row">
              <div class="col-md-8 title-column">
                <h4>
                  {{ item.name }}
                </h4>
              </div>
              <div class="col-md-2 office">
                <i class="fa fa-map-marker" aria-hidden="true"></i> <span class="">{{ item.office }}</span>
              </div>
          <div class='col-md-2 status'>
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
          <div v-if="item.link && !linkDataReady()" class="col-md-12">
            <a class="link" :href="item.link" target="_blank">
              <i class="fa fa-search" aria-hidden="true"></i>
              View Item
            </a>
            <br>
          </div>
          <div v-if="item.link && linkDataReady()" class="col-md-12">
            <LinkPreview :item-data="linkData" />
            <br>
          </div>
          <div class="col-md-12">
            {{ item.description }}
          </div>
        </div>
            <div class="panel-footer footer">
              <div class="row">
                <div class="col-md-6">
                  <span class="pointer" @click="dislikeItem(itemKey)" v-if="!hasBeenLiked">
                    <span class="pointer">{{ likeCount }}</span>
                    <i class="fa fa-star liked" aria-hidden="true"></i>
                    <span class='liked-alert'>{{ likedBy }}</span>

                  </span>
                  <span class="pointer" @click="likeItem(itemKey)" v-else>
                    <span class="pointer">{{ likeCount }}</span>
                    <i class="fa fa-star-o" aria-hidden="true"></i>
                    <span class='liked-alert'>{{ likedBy }}</span>
                  </span>
                </div>
                <div class="col-md-6 right">
                  <div v-if="userIsAdmin() && !item.purchased" class="left pointer" @click="markAsPurchased(itemKey)">
                    <i class="fa fa-check" aria-hidden="true"></i>Purchased
                  </div>
                  <div v-if="postedByThisUser(item.postedBy)" class="pointer" @click="deleteItem(itemKey)">
                    <i class="fa fa-times cancel" aria-hidden="true"></i>Cancel
                  </div>
                </div>
              </div>
            </div>
        </div>
</template>

<script>
import { linkPreview } from '../link-preview.js'
import LinkPreview from './link-preview.vue'
export default {
  name: 'item',
  props: ['item', 'itemKey', 'hasBeenLiked', 'likeCount'],
  components: {
    LinkPreview
  },
  data () {
    return ({
      itemData: {},
      users: {},
      posterData: {},
      profilePhotoUrl: false,
      userData: false,
      linkData: null
    })
  },
  computed: {
    profilePhoto: function() {
      if (this.profilePhotoUrl) {
        return {
          'background-image': `url(${this.profilePhotoUrl})`
        }
      }
    },
    profileTheme: function() {
      if (this.userData.profileTheme) {
        return {
          'background-color': this.userData.profileTheme
        }
      }
    },
    likedBy: function() {
      if (this.item.likes === undefined || this.item.likes === false) { // returns if nobody has liked the post
        return 'Be the first to star this post!'
      }
      let keys = Object.keys(this.item.likes)
      let names = keys.map(function(key) {
        if (key === document.cookie) {
          return 'You'
        } else {
          return this.item.likes[key].likedBy
        }
      }.bind(this))
      if (names.includes('You')) { // if the current user liked the post, prepend 'You' to list
        let newNames = names.filter(function(name) {
          return name !== 'You'
        }.bind(this))
        newNames.unshift('You')
        return newNames.join(', ')
      }
      return names.join(', ')
    }
  },
  created () {
    const userRef = firebase.database().ref().child(`users/${this.item.postedBy}`)
    userRef.on('value', (snapshot) => {
      this.userData = snapshot.val()
    })
  },
  beforeUpdate () {
    if (this.userData.hasPhoto) {
      const userProfilePhotoRef = firebase.storage().ref(`profile-photos/${this.item.postedBy}`)
      userProfilePhotoRef.getDownloadURL().then((url) => {
        this.profilePhotoUrl = url
      }).catch((error) => {
        this.profilePhotoUrl = false
        return
      })
    } else {
      this.profilePhotoUrl = false
    }
  },
  mounted () {
    this.generateLinkPreview(this.item.link)

    const users = firebase.database().ref().child(`users`)
    users.on('value', (snapshot) => {
      this.users = snapshot.val()
    })

    if (this.userData.hasPhoto) {
      const userProfilePhotoRef = firebase.storage().ref(`profile-photos/${this.item.postedBy}`)
      userProfilePhotoRef.getDownloadURL().then((url) => {
        this.profilePhotoUrl = url
      }).catch((error) => {
        this.profilePhotoUrl = false
        return
      })
    } else {
      this.profilePhotoUrl = false
    }
  },
  methods: {
    generateLinkPreview (itemLink) {
      if (!itemLink) {
        return
      }
      linkPreview(itemLink).then((res) => {
        this.linkData = res
      })
    },
    linkDataReady () {
      return this.linkData ? true : false
    },
    markAsPurchased (key) {
      firebase.database().ref(`items/${key}`).update({purchased: true})
    },
    deleteItem (key) {
      firebase.database().ref(`items/${key}`).remove()
    },
    likeItem (key) {
      const uid = document.cookie
      firebase.database().ref(`items/${key}/likes/${uid}`).set({
        liked: true,
        likedBy: `${this.users[document.cookie].firstName} ${this.users[document.cookie].lastName}`
      })
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
  },
}
</script>

<style lang='scss' scoped>
h4 {
  margin: 3px;
}
.panel-heading {
  position: relative;
  padding-top: 1px;
  padding-bottom: 1px;
}

.link {
  text-decoration: none;
}

.title-column {
  padding-left: 55px;
}

.panel-body {
  padding-left: 0;
  padding-top: 25px;
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
.liked {
  color: #337ab7;
}
.cancel {
  color: red;
  padding-right: 2px;
  cursor: pointer;
}
.status {
  padding-top: 2px;
  text-align: right;
}
.office {
  padding-top: 2px;
  text-align: center;
}
.pointer {
  cursor: pointer;
}

.pointer .liked-alert {
  visibility: hidden;
  background-color: rgba(29, 29, 29, .50);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  border: 1px solid rgb(29, 29, 29);
  padding: 5px 10px;
  position: absolute;
  left: 15%;
  top: -5px;
  z-index: 1;
}

.pointer:hover .liked-alert {
  visibility: visible;
}

.spinner {
  font-size: 20px;
  float: right;
}
.profile-bubble{
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 3px solid white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-repeat: none;
  background-position: center;
  background-size: cover;
  font-size: 14pt;
  padding: 3%;
  position: absolute;
  z-index: 500;
  top: -15px;
  left: -10px;
}
.profile-initials {
  color: white;
}
</style>
