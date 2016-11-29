<template>
  <div class="chat-wrap">
    <div class="chat-title">
      <span>TheraChat</span> <span class="material-icons icon">sentiment_satisfied</span>
    </div>
    <div id="chat-box" class="top-chat-wrap">
      <div class="chat-text" v-for="(message, key) in messages">
        <span class="username">{{ users[message.postedBy].firstName}}</span>: {{ message.message }}
      </div>
    </div>
    <div class="bottom-chat-wrap">
      <form @submit.prevent="postMesasge" class="input">
        <input type="text" v-model="message" class="input" placeholder="Send a message...">
      </form>
      <div class="button material-icons" @click="postMesasge" >
        present_to_all
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
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
    this.scrollToTop()

    const users = firebase.database().ref().child(`users`)
    users.on('value', (snapshot) => {
      this.users = snapshot.val()
    })
    const chatLog = firebase.database().ref().child(`chat`)
    chatLog.on('value', (snapshot) => {
      this.messages = snapshot.val()
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
      this.message = null;
      this.scrollToTop()
    },
    scrollToTop () {
      const element = document.getElementById("chat-box")
      element.scrollTop = element.scrollHeight
    }
  }
  }
</script>

<style lang='scss' scoped>
.chat-wrap {
  display: flex;
  flex-direction: column;
  background-color: #fbfbfb;
  border-radius: 5px;
  padding: 10px;
  width: 775px;
  height: 250px;
  justify-content: space-between;
  box-shadow: 2px 10px 24px -8px rgba(0,0,0,0.55);


}
.top-chat-wrap {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  font-size: 15px;
  padding-left: 10px;
  border-radius: 5px;
  height: 100%;
  border: 2px solid #008cc7;
  padding-top: 5px;
  background-color: white;
}
.bottom-chat-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;

}
.input {
  display: flex;
  width: 100%;
  height: 20px;
  margin-right: 5px;
  padding-left: 5px;
  font-size: 15px;
  outline: none;
}
.button {
    color: #008cc7;
    font-size: 33px;
    margin-top: 5px;
    cursor: pointer;
}
.username {
  font-weight: bold;
}
.chat-title {
  display: flex;
  padding-bottom: 10px;
  align-items: center;
  color:#008cc7;
  font-weight: bold;
}
.icon {
  padding-left: 2px;
  font-size: 20px;
}

</style>
