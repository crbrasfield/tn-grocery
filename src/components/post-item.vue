<template>
  <div class="post-item-wrap">
    <span class="main-head">
      Post an Item!
    </span>
    <div class="post-item">
      <span class="error-message">
        {{ errorMessage }}
      </span>

      <div class="mdl-textfield mdl-js-textfield input" >
        <span class="input-title">Title</span>
        <span class="required">(required)</span>
        <input class="mdl-textfield__input text-input" type="text" v-model="itemData.name">
      </div>

      <div class="mdl-textfield mdl-js-textfield input">
        <span class="input-title">Link to Item</span>
        <input class="mdl-textfield__input text-input" type="text" v-model="itemData.link">
      </div>

      <div class="mdl-textfield mdl-js-textfield input">
        <span class="input-title">Description</span>
        <span class="required">(required)</span>
        <input class="mdl-textfield__input text-input" type="text" v-model="itemData.description">
      </div>
      <div class="radio-buttons">
        <span class="input-title">Office</span>
        <label class='radio-label'>
          <input type="radio" value="Main" v-model="itemData.office">Main
        </label>
        <label class='radio-label'>
          <input type="radio" value="Dev" v-model="itemData.office">Dev
        </label>
      </div>
      <br>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button" @click="postItem">
        Post
      </button>
    </div>
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
        office: 'Main',
        description: ''
      },
      errorMessage: ''
    })
  },
  methods: {
    postItem () {
      if (!this.itemData.name || !this.itemData.description) {
        this.errorMessage = 'Ya left something blank, dingus!'
        return
      }
      firebase.database().ref().child('items').push({
        name: this.itemData.name,
        link: this.formatLink(this.itemData.link),
        office: this.itemData.office,
        likes: false,
        description: this.itemData.description,
        createdAt: moment().format("LLLL"),
        postedBy: document.cookie,
        purchased: false
      }).then(() => {
        this.itemData.name = ''
        this.itemData.link = ''
        this.errorMessage = '',
        this.itemData.description = ''
      })
    },
    formatLink (link) {
      const prefix = 'http://'
      if (link.substr(0, prefix.length) !== prefix) {
        return prefix + link
      } else return
    }
  }
}
</script>

<style lang='scss' scoped>
.post-item-wrap {
  margin: 5px;
  flex-direction: column;
}
.post-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 10px 24px -8px rgba(0,0,0,0.55);
  background-color: #fbfbfb;
}
.main-head {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px 0px 15px;
  border-radius: 5px 5px 0 0;
  background-color: #fbfbfb;
  color: #008cc7;
  border-top: 1px solid whitesmoke;
  border-left: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;

}
.error-message {
  color: red;
}
.input {
  color: gray;
  width: 100%;
}
.input-title {
  color: #8dcf3a;
}

.radio-label {
  color: gray;
  margin-right: 50px;
}
.required {
  font-size: 12px;
}
.radio-buttons {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.button {
  background-color: #008cc7;
  color: white;
}

</style>
