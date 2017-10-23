import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/hello.vue'
import products from '@/components/product/list.vue'
import product from '@/components/product/item.vue'
import Gallery from '@/application/base/gallery/gallery'

Vue.use(Router)

export default new Router({
  routes: [
    { //  当路径为空时随便指向一个页面  TODO : 移除
      path: '/',
      name: 'hello',
      component: hello
    }, { // 产品列表
      path: '/products',
      name: 'products',
      component: products
    }, { //  产品页
      path: '/product/:productId',
      name: 'product',
      component: product
    },
    {
      // 入职推荐搜索页
      path: '/hello',
      name: 'hello',
      components: {
        default: resolve => require(['@/application/base/gallery/gallery'], resolve)
        // default: import('@/components/hello')
      },
      meta: {
        requireAuth: true,
        title: '画布',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn',
          params: 'go:recommend'
        },
        exclude: {
          default: 'recommend_search'
        }
      },
      Info: {
        description: '画布',
        param: {}
      }
    }
  ]
})
