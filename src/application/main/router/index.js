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
        }
      },
      Info: {
        description: '产品列表',
        param: {}
      }
    },
    { //  计划书-产品介绍
      path: '/plan/product-intro',
      name: 'product_intro',
      component: () => import(/* webpackChunkName: "product-intro" */ '@/application/main/plan/product-intro.vue'),
      meta: {
        requireAuth: true,
        title: 'hello',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '计划书-产品介绍',
        param: {}
      }
    },
    { //  计划书-产品预览
      path: '/plan/product-preview',
      name: 'product_preview',
      component: () => import(/* webpackChunkName: "product-intro" */ '@/application/main/plan/product-preview.vue'),
      meta: {
        requireAuth: true,
        title: '产品介绍',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        },
        exclude: {
          default: ''
        }
      },
      Info: {
        description: '计划书-产品预览',
        param: {}
      }
    },
    { //  计划书-录入客户信息
      path: '/plan/import-client-info',
      name: 'import-client-info',
      component: () => import(/* webpackChunkName: "import-client-info" */ '@/application/main/plan/import-client-info.vue'),
      meta: {
        requireAuth: true,
        title: '录入客户信息',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '计划书-录入客户信息',
        param: {}
      }
    },
    { //  计划书-产品演示
      path: '/plan/product_demo',
      name: 'product_demo',
      component: () => import(/* webpackChunkName: "product_demo" */ '@/application/main/plan/product_demo.vue'),
      meta: {
        requireAuth: true,
        title: '产品演示',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        },
        exclude: {
          default: ''
        }
      },
      Info: {
        description: '计划书-产品演示',
        param: {}
      }
    },
    { //  计划书-投保人信息
      path: '/plan/applicant_info',
      name: 'plan_applicant_info',
      component: () => import(/* webpackChunkName: "product-intro" */ '@/application/main/plan/applicant-info.vue'),
      meta: {
        requireAuth: true,
        title: '投保人信息',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '计划书-投保人信息',
        param: {}
      }
    },
    { //  计划书-被保人信息
      path: '/plan/insured_info',
      name: 'plan_insured_info',
      component: () => import(/* webpackChunkName: "product-intro" */ '@/application/main/plan/insured-info.vue'),
      meta: {
        requireAuth: true,
        title: '被保人信息',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        },
        exclude: {
          default: ''
        }
      },
      Info: {
        description: '计划书-被保人信息',
        param: {}
      }
    }
  ]
})
