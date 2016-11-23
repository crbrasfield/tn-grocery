<template>
  <div id="not-found">
    Dashboard!
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  mounted: function () {
    const route = this.$root.$route
    console.log(route)
  }
}
</script>

<style lang='scss' scoped>

</style>
