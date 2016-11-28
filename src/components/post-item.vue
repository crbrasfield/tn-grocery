<template>
  <div class="post-item mdl-card mdl-shadow--2dp">
    <span class="main-head">
      Post an Item!
    </span>

    <div class="mdl-textfield mdl-js-textfield input" >
      Title
      <input class="mdl-textfield__input text-input" type="text" v-model="itemData.name">
    </div>

    <div class="mdl-textfield mdl-js-textfield input">
      Link to item
      <input class="mdl-textfield__input text-input" type="text" v-model="itemData.link">
    </div>

    <div class="radio-buttons">
      <label class='radio-label'>
        <input type="radio" value="main" v-model="itemData.office">For main office
      </label>
      <label class='radio-label'>
        <input type="radio" value="dev" v-model="itemData.office">For dev office
      </label>
    </div>

    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button" @click="postItem">
      Post
    </button>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'post-item',
  data () {
    return ({
      itemData: {
        name: '',
        link: '',
        office: null
      }
    })
  },
  methods: {
    postItem () {
      firebase.database().ref().child('items').push({
        name: this.itemData.name,
        link: this.itemData.link,
        office: this.itemData.office,
        likes: false,
        createdAt: moment().format("LLLL"),
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
  display: flex;
  width: 50%;
  margin: 30px 0;
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
  width: 100%;
}

.radio-label {
  color: gray;
  margin-right: 50px;
}

.radio-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
}

</style>
