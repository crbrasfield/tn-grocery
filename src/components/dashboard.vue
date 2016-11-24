<template>
  <div id="not-found">
    Dashboard!
  </div>
</template>

<script>
import { store } from '../main.js'
export default {
  name: 'dashboard',
  mounted: function () {
    console.log(store.state.userId)
  }
}
</script>

<style lang='scss' scoped>

</style>
