<template>
  <div class="">
    <div class="wrapper">
      <img class="thumbnail-image" :src="itemData.data.thumbnail_url || 'http://www.freeiconspng.com/uploads/no-image-icon-23.jpg' " alt="">
      <div class="item-info">
        <a class="item-link" :href="itemData.data.url">
          <span class="title">
            {{ itemData.data.title || 'Title not found' }}
          </span>
        </a>
        <br>
        <span class="sub-title">
          {{ itemData.data.provider_url || ''}}
        </span>
      </div>
    </div>
  </div>
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
  flex-direction: row;
}
.thumbnail-image {
  max-width: 80px;
  max-height: 80px;
  margin-right: 10px;
}
.item-info {
  flex-direction: column;
}
.title {
  color: cornflowerblue;
  font-weight: bolder;
  align-self: flex-start;
  font-size: 20px;
}
.item-link {
  text-decoration: none;
}
.sub-title {
  color: grey;
  font-size: 12px;
}
</style>
