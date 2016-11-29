<template>
  <div class="">


    <div class="" v-for="(message, key) in messages">
      {{ users[message.postedBy].firstName}}: {{ message.message }}
    </div>
    <input type="text" v-model="message">
    <button type="button" name="button" @click="postMesasge">Send</button>
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
    const users = firebase.database().ref().child(`users`)
    users.on('value', (snapshot) => {
      console.log(snapshot.val())
      this.users = snapshot.val()
    })
    const chatLog = firebase.database().ref().child(`chat`)
    chatLog.on('value', (snapshot) => {
      this.messages = snapshot.val()
    })
  },
  methods: {
    postMesasge () {
      firebase.database().ref().child('chat').push({
        message: this.message,
        postedBy: document.cookie,
        postedAt: moment().format("LLLL")
      })
    }
  }
  }
</script>

<style lang='scss' scoped>
.post-item {
  display: flex;
  padding: 10px;
  box-shadow: 2px 10px 24px -8px rgba(0,0,0,0.55);
}
.main-head {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px 0px 15px;
  border-radius: 5px 5px 0 0;
  background-color: white;
  color: #008cc7;
  box-shadow: 2px 10px 24px -8px rgba(0,0,0,0.55);
  border-top: 1px solid whitesmoke;
  border-left: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;
  float: left;
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
