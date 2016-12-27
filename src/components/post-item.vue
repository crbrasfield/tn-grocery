<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title">
        Post an Item
      </h3>
    </div>
    <div class="panel panel-body">

  <div class="form-group">
    <div class="">
      <span class="">
        {{ errorMessage }}
      </span>

      <div class="" >
        <label class="">Title</label>
        <label class="">(required)</label>
        <input class="form-control" type="text" v-model="itemData.name">
      </div>

      <div class="">
        <label class="">Link to Item</label>
        <label class="">(preferred)</label>
        <input class="form-control" type="text" v-model="itemData.link">
      </div>

      <div class="">
        <label class="">Description</label>
        <label class="">(required)</label>
        <input class="form-control" type="text" v-model="itemData.description">
      </div>

      <div class="office">
        <div class="office-left">
        <label class="">Office</label>
        <div class="office-input-wrap">
          <div class="radio">
            <label class=''>
              <input type="radio" value="Main" v-model="itemData.office">Main
            </label>
          </div>
          <div class="radio">
            <label class=''>
              <input type="radio" value="Dev" v-model="itemData.office">Dev
            </label>
          </div>
          <div class="radio">
            <label class=''>
              <input type="radio" value="Remote" v-model="itemData.office">Remote
            </label>
          </div>
        </div>
      </div>
      <div class="office-right">
        <button class="btn btn-primary post" @click="postItem">
          Post
        </button>
      </div>
      </div>

    </div>
  </div>
</div>

</div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import { linkPreview } from '../link-preview.js'
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
      console.log(this.formatLink(this.itemData.link));
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
      const prefix = 'http'
      console.log(link.substr(0, prefix.length))
      if (_.trim(link) === '') {
        return ''
      }
      if (link.substr(0, prefix.length) !== prefix) {
        return 'http://' + link
      } else return link
    }
  }
}
</script>

<style lang='scss' scoped>

.panel.panel-body {
  margin-bottom: 0;
  padding-bottom: 5px;
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

.office {
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.office-input-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.radio {
  margin: 0;
  margin-right: 10px;
}

.post {
  float: right;
}

</style>
