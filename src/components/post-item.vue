<template>
  <div class="post-item">
    <span class="main-head">
      Post an Item!
    </span>

    <div class="mdl-textfield mdl-js-textfield input" >
      Title
      <input class="mdl-textfield__input" type="text" v-model="itemData.name">
    </div>

    <div class="mdl-textfield mdl-js-textfield input">
      Link to item
      <input class="mdl-textfield__input" type="text" v-model="itemData.link">
    </div>

    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button" @click="postItem">
      Post
    </button>
  </div>
</template>

<script>
export default {
  name: 'post-item',
  data () {
    return ({
      itemData: {
        name: '',
        link: ''
      }
    })
  },
  methods: {
    postItem () {
      firebase.database().ref().child('items').push({
        name: this.itemData.name,
        link: this.itemData.link,
        likes: false,
        postedBy: document.cookie,
        purchased: false
      }).then(() => {
        this.itemData.name = ''
        this.itemData.link = ''
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.post-item {
  width: 300px;
  height: 350px;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
}
.main-head {
  font-size: 20px;
  font-weight: bold;
  color: #008cc7;
}
.input {
  color: gray;
}
</style>
