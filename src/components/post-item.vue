<template>
  <div class="post-item">
    Post an item in this module
<hr>
    <div class="item-form">
      Item name <input type="text"  value="" v-model="itemData.name">
      <br>
      Link to item<input type="text"  value="" v-model="itemData.link">
      <br>
      <button type="button" name="button" @click="postItem">Post Item</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post-item',
  data () {
    return ({
      itemData: {
        name: '',
        link: '',
        purchased: false
      }
    })
  },
  methods: {
    postItem () {
      firebase.database().ref().child('items').push({
        name: this.itemData.name,
        link: this.itemData.link,
        purchased: this.itemData.purchased
      }).then(() => {
        this.itemData.name = ''
        this.itemData.link = ''
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.post-item {
  width: 300px;
  height: 350px;
  background-color: whitesmoke;
}
</style>
