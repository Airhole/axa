import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Afff.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/share/hello',
      name: 'hello',
      component: HelloWorld,
      meta: {
        requireAuth: true,
        title: 'hello',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn',
          params: 'go:recommend'
        },
        exclude: {
          default: ''
        }
      },
      Info: {
        description: 'Hello World 页面',
        param: {}
      }
    }
  ]
})
