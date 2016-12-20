import Vue from 'vue'
import VueResource from 'vue-resource'
export const key = 'ce5ff224319e46f9861925e7a2f235a1'

Vue.use(VueResource)

export const linkPreview = (url) => {
  return Vue.http.get(`https://api.embedly.com/1/oembed?key=${key}&url=${url}`).then((response, err) => {
    return response
  }, (err) => {
    return
  }
  )
}
