<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title">
        TheraChat
      </h3>
    </div>
    <div class="panel-body">
    <div id="chat-box" class="">
      <div class="" v-for="(message, key) in messages">
        <span class="">{{ users[message.postedBy].firstName}}</span>: {{ message.message }}
      </div>
    </div>
    </div>
    <div class="panel-footer">
      <form @submit.prevent="postMesasge" class="">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Say hello!" v-model="message">
          <span class="input-group-btn">
            <button class="btn btn-default" type="submit" @click="postMesasge">Send</button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
export default {
  name: 'chat',
  data () {
    return ({
      message: '',
      messages: null,
      users: null
    })
  },
  mounted () {
    const component = this
    const users = firebase.database().ref().child(`users`)
    users.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
    const chatLog = firebase.database().ref().child(`chat`)
    chatLog.on('value', function(snapshot) {
      component.messages = snapshot.val()
      Vue.nextTick(component.scrollToTop)
    })
  },
  methods: {
    postMesasge () {
      if (!this.message) {
        return
      }
      firebase.database().ref().child('chat').push({
        message: this.message,
        postedBy: document.cookie,
        postedAt: moment().format("LLLL")
      })
      this.message = null
    },
    scrollToTop () {
      const element = document.getElementById("chat-box")
      element.scrollTop = element.scrollHeight
    }
  }
  }
</script>

<style lang='scss' scoped>
.button-wrap {
  padding: 0;
}
#chat-box {
  height: 200px;
  overflow: scroll;
}
</style>
