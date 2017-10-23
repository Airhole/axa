import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/Afff.vue'
import products from '@/components/product/list.vue'

Vue.use(Router)
const Foo = () => Promise.resolve({
  template: `<div>this is World</div>`
})
export default new Router({
  routes: [
    {
      // 路由画布页面
      path: '/',
      name: 'gallery',
      components: {
        default: resolve => require(['@/application/base/gallery/gallery'], resolve)
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
    },
    {
      path: '/hello',
      name: 'world',
      // component: Afff,
      component: () => import(/* webpackChunkName: "Afff" */ '@/components/Afff.vue'),
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
    },
    { // 产品列表
      path: '/products',
      name: 'products',
      component: resolve => require(['@/components/product/list.vue'], resolve),
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
        description: '产品列表',
        param: {}
      }
    },
    { //  计划书-产品介绍
      path: '/plan/detail',
      name: 'product',
      component: () => import(/* webpackChunkName: "product-intro" */ '@/application/main/plan/product-intro.vue'),
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
        description: '计划书-产品介绍',
        param: {}
      }
    }
  ]
})
