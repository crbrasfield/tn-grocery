<template>
  <a :href="itemData.url">
    <div class="wrapper">
      <img class="thumbnail-image":src="itemData.image || 'http://www.freeiconspng.com/uploads/no-image-icon-23.jpg' " alt="">
      {{ itemData.title || 'Title not found' }}
    </div>
  </a>
</template>

<script>
export default {
  name: 'LinkPreview',
  props: ['itemData'],
  data () {
    return ({})
  },
  methods: {
    log: () => {
      console.log('hello')
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  color: gray;
  border-radius: 5px;
  background-color: whitesmoke;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}
.thumbnail-image {
  max-width: 80px;
  max-height: 80px;
  margin-right: 10px;
}
</style>
