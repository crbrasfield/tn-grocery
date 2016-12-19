import Vue from 'vue'
import VueResource from 'vue-resource'
export const key = '5852c7276adede1c5990c959b00181fbc30bf49c3d3f2'

Vue.use(VueResource)

export const linkPreview = (url) => {
  return Vue.http.get(`http://api.linkpreview.net/?key=5852c7276adede1c5990c959b00181fbc30bf49c3d3f2&q=${url}`).then((response, err) => {
    return response
  }, (err) => {
    console.log('err:', err)
  }
  )
}
