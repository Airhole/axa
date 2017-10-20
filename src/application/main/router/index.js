import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Gallery from '@/application/base/gallery/gallery'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // },
    { //
      path: '/',
      name: 'gallery',
      components: {
        default: resolve => require(['@/application/base/gallery/gallery'], resolve)
      },
      meta: {
        requireAuth: true,
        rightMenu: {
          title: '分享',
          javascript: 'shareBusscard'
        },
        leftMenu: {
          title: '返回',
          javascript: 'closeWebview'
        },
        title: '页面汇总',
        exclude: {
          default: 'gallery'
        }
      },
      Info: {
        descript: '页面汇总',
        param: {}
      }
    },
    { //
      path: '/gallery',
      name: 'gallery',
      components: {
        default: resolve => require(['@/application/base/gallery/gallery'], resolve)
      },
      meta: {
        requireAuth: true,
        rightMenu: {
          title: '分享',
          javascript: 'shareBusscard'
        },
        leftMenu: {
          title: '返回',
          javascript: 'closeWebview'
        },
        title: '页面汇总',
        exclude: {
          default: 'gallery'
        }
      },
      Info: {
        descript: '页面汇总',
        param: {}
      }
    }
  ]
})
