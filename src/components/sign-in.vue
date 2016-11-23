<template>
  <div id="sign-in">
    <h1>Sign in page</h1>
    <input type="input" name="userName" value="">
    <button type="button" name="signInButton">Sign In</button>
  </div>
</template>

<script>
export default {
  name: 'sign-in',
  data () {
    return {}
  }
}
</script>

<style lang='scss' scoped>
#sign-in {
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
