import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import Afff from '@/components/Afff.vue'
=======
import hello from '@/components/Hello.vue'
>>>>>>> f59a87b471f94bfef05b24c1358949e5e86a8177
import products from '@/components/product/list.vue'
import product from '@/components/product/item.vue'
import Gallery from '@/application/base/gallery/gallery'

Vue.use(Router)
const Foo = () => Promise.resolve({
  template: `<div>this is World</div>`
})
export default new Router({
  routes: [
    {
      // 路由画布页面
      path: '/',
<<<<<<< HEAD
      name: 'helloAbcd',
=======
      name: 'gallery',
>>>>>>> f59a87b471f94bfef05b24c1358949e5e86a8177
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
    { //  当路径为空时随便指向一个页面  TODO : 移除
      path: '/hello',
      name: 'world',
      // component: Afff,
      component: () => import(/* webpackChunkName: "Afff" */ '../../../components/Afff.vue'),
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
    {
      path: '/main/hello',
      name: 'hello',
      component: hello,

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
    { //  产品页
      path: '/product/:productId',
      name: 'product',
      component: product,
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
        description: '产品详情',
        param: {}
      }
    }
  ]
})
