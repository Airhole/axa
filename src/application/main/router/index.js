import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UiGallery from '@/application/base/gallery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/uiGallery',
      name: 'UiGallery',
      component: UiGallery
    }
  ]
})
