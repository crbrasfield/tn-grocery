<template>
  <div class="item-list">
    display item list

  <hr>

    <div class="" v-for="(item, key) in items">

      <div>
        <!-- Item name: {{ item.name}} -->
        {{item.name}}
        <br>
        <!-- Item link: {{ item.link }} -->
        {{item.link}}
      </div>
      <button type="button" name="button" @click="deleteItem(key)">Delete</button>
      <button type="button" name="button" @click="markAsPurchased(key)">Mark as Purchased</button>
      <br>
    </div>

  </div>
</template>

<script>
export default {
  name: 'item-list',
  data () {
    return ({
      items: {}
    })
  },
  mounted () {
    const itemList = firebase.database().ref().child(`items`)
    itemList.on('value', (snapshot) => {
      this.items = snapshot.val()
    })
  },
  methods: {
    markAsPurchased (key) {
      firebase.database().ref(`items/${key}`).update({purchased: true})
    },
    deleteItem (key) {
      firebase.database().ref(`items/${key}`).remove()
    }
  }
}
</script>

<style lang='scss' scoped>
.item-list {
  width: 300px;
  height: 350px;
  background-color: whitesmoke;
}
</style>
