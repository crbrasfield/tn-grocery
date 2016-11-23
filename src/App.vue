<template>
  <div id="app">
    <!-- This component is being used to test out different features in Vue -->
    <!-- <Test></Test> -->
    <!-- Remove Test component before implememnting actual code -->
    <SignIn />
  </div>
</template>

<script>
import Test from './components/Hello.vue'
import SignIn from './components/sign-in.vue'

export default {
  name: 'app',
  components: {
    Test,
    SignIn
  }
}
</script>
