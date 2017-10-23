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
      name: 'hello/hello/hello/application',
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
    }, { // 产品列表
      path: '/products',
      name: 'products',
      component: products,
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
    }, { //  产品页
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
