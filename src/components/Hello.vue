<template>
  <div id="test">
    <div class="container">
      <h1>{{ msg }}</h1>
    </div>
    <div class="container">
      Type your message here:
      <input v-model="alertText"></input>
      <button class="button" type="button" name="button" @click="alertMe">
        Alert your message
      </button>
      <br>
      Your message: {{ alertText }}
    </div>
    <button type="button" name="button" @click="logTest">Click me to log test</button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to the Test component. This is where you can test out the features offered by Vue and get the hang of data-binding, event handeling, and component structure!',
      derp: 'test',
      alertText: null
    }
  },
  methods: {
    logTest () {
      console.log('test')
    },
    alertMe () {
      alert(this.alertText)
    }
  }
}
</script>

<style lang='scss' scoped>
#test {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: 1000px;
  margin: auto;
  border-left: 2px solid #2c3e50;
  min-height: 200px;
  text-align: left;
  padding-left: 50px;
}

.button {
  margin: 10px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
