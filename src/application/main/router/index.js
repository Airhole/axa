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
      component: () => import(/* webpackChunkName: "applicant-info" */ '@/application/main/plan/applicant-info.vue'),
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
      component: () => import(/* webpackChunkName: "insured-info" */ '@/application/main/plan/insured-info.vue'),
      meta: {
        requireAuth: true,
        title: '被保人信息',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '计划书-被保人信息',
        param: {}
      }
    },
    { //  在线投保-选择受益人
      path: '/insurance/choose_beneficiary',
      name: 'insurance_choose_beneficiary',
      component: () => import(/* webpackChunkName: "choose-beneficiary" */ '@/application/main/insurance/choose-beneficiary.vue'),
      meta: {
        requireAuth: true,
        title: '选择受益人',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '在线投保-选择受益人',
        param: {}
      }
    },
    { //  在线投保-受益人列表
      path: '/insurance/beneficiary_list',
      name: 'beneficiary_list',
      component: () => import(/* webpackChunkName: "add-beneficiary" */ '@/application/main/insurance/beneficiary-list.vue'),
      meta: {
        requireAuth: true,
        title: '受益人列表',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '在线投保-受益人列表',
        param: {}
      }
    },
    { //  在线投保-指定受益人填写
      path: '/insurance/add_beneficiary',
      name: 'add_beneficiary',
      component: () => import(/* webpackChunkName: "add-beneficiary" */ '@/application/main/insurance/add-beneficiary.vue'),
      meta: {
        requireAuth: true,
        title: '指定受益人填写',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '在线投保-指定受益人填写',
        param: {}
      }
    },
    { //  在线投保-投保书预览-手工单录入结果
      path: '/insurance/manual_result',
      name: 'manual_result',
      component: () => import(/* webpackChunkName: "manual_result" */ '@/application/main/insurance/manual_result.vue'),
      meta: {
        requireAuth: true,
        title: '手工单录入结果',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '在线投保-手工单录入结果',
        param: {}
      }
    },
    { //  在线投保-投保书预览-录入投保单号
      path: '/insurance/input_policy',
      name: 'input_policy',
      component: () => import(/* webpackChunkName: "input_policy" */ '@/application/main/insurance/input_policy.vue'),
      meta: {
        requireAuth: true,
        title: '录入投保单号',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '在线投保-录入投保单号',
        param: {}
      }
    },
    { //  添加附加险弹窗
      path: '/base/additional_insurance',
      name: 'additional_insurance',
      component: () => import(/* webpackChunkName: "additional_insurance" */ '@/application/base/modals/add-additional-insurance.vue'),
      meta: {
        requireAuth: true,
        title: '附加险',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '添加附加险弹窗',
        param: {}
      }
    },
    { //  在线投保-投保书预览
      path: '/main/insure_application_pre',
      name: 'insure_application_pre',
      component: () => import(/* webpackChunkName: "insure_application_pre" */ '@/application/main/insurance/insure-application-pre.vue'),
      meta: {
        requireAuth: true,
        title: '投保书预览',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '在线投保-投保书预览',
        param: {}
      }
    }
  ]
})
