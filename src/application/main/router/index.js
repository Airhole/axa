import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/Afff.vue'
import products from '@/components/product/list.vue'

Vue.use(Router)
// 鑫能演示 开始---------------稍后去掉
const xinNen = [{ // 产品列表
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
  path: '/plan/product_intro',
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
{ //  计划书-亲启书
  path: '/plan/product_letter',
  name: 'product_letter',
  component: () => import(/* webpackChunkName: "product_letter" */ '@/application/main/plan/product_letter.vue'),
  meta: {
    requireAuth: true,
    title: '亲启书',
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
    description: '计划书-亲启书',
    param: {}
  }
},
{ //  计划书-产品预览
  path: '/plan/product_preview',
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
  path: '/plan/import_client_info',
  name: 'import_client_info',
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
{ //  在线投保-投保人信息
  path: '/insurance/applicant_info',
  name: 'insurance_applicant_info',
  component: () => import(/* webpackChunkName: "applicant-info" */ '@/application/main/insurance/applicant-info.vue'),
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
    description: '在线投保-投保人信息',
    param: {}
  }
},
{ //  在线投保-被保人信息
  path: '/insurance/insured_info',
  name: 'insurance_insured_info',
  component: () => import(/* webpackChunkName: "insured-info" */ '@/application/main/insurance/insured-info.vue'),
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
    description: '在线投保-被保人信息',
    param: {}
  }
},
{ //  在线投保-保障计划
  path: '/plan/insurance_insure_plan',
  name: 'insurance_insure_plan',
  component: () => import(/* webpackChunkName: "insurance-insure-plan" */ '@/application/main/plan/insurance-insure-plan.vue'),
  meta: {
    requireAuth: true,
    title: '保障计划',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '在线投保-保障计划',
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
  name: 'insurance_beneficiary_list',
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
  name: 'insurance_add_beneficiary',
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
  name: 'insurance_manual_result',
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
  name: 'insurance_input_policy',
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
{ //  在线投保-投保资料上传
  path: '/insurance/view_insurance_result',
  name: 'view_insurance_result',
  component: () => import(/* webpackChunkName: "view_insurance_result" */ '@/application/main/insurance/view_insurance_result.vue'),
  meta: {
    requireAuth: true,
    title: '投保资料上传',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '在线投保-投保资料上传',
    param: {}
  }
},
{ //  在线投保-查看投保结果
  path: '/insurance/upload_insurance',
  name: 'insurance_upload_insurance',
  component: () => import(/* webpackChunkName: "see_insurance_result" */ '@/application/main/insurance/upload_insurance.vue'),
  meta: {
    requireAuth: true,
    title: '查看投保结果',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '在线投保-查看投保结果',
    param: {}
  }
},
{ //  在线投保-支付信息
  path: '/insurance/pay_insurance',
  name: 'insurance_pay_insurance',
  component: () => import(/* webpackChunkName: "see_insurance_result" */ '@/application/main/insurance/pay_insurance.vue'),
  meta: {
    requireAuth: true,
    title: '支付信息',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '在线投保-支付信息',
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
  path: '/main/insurance_application_pre',
  name: 'insurance_application_pre',
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
},
{ //  投保进度-查询保单
  path: '/main/prosearch',
  name: 'prosearch',
  component: () => import(/* webpackChunkName: "prosearch" */ '@/application/main/progress/search.vue'),
  meta: {
    requireAuth: true,
    title: '查询保单',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '投保进度-查询保单',
    param: {}
  }
},
{ //  投保进度-详情
  path: '/main/progressdetail',
  name: 'progressdetail',
  component: () => import(/* webpackChunkName: "progressdetail" */ '@/application/main/progress/detail.vue'),
  meta: {
    requireAuth: true,
    title: '投保进度详情',
    rightMenu: null,
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '投保进度-详情',
    param: {}
  }
},
{ //  投保进度-主页
  path: '/main/progress',
  name: 'progress',
  component: () => import(/* webpackChunkName: "progress" */ '@/application/main/progress/index.vue'),
  meta: {
    requireAuth: true,
    title: '投保进度',
    rightMenu: {
      title: '搜索',
      javascript: 'gotoprogressSearch'
    },
    leftMenu: {
      title: '返回',
      javascript: 'gobackbtn'
    }
  },
  Info: {
    description: '投保进度-主页',
    param: {}
  }
}]
// 鑫能演示 结束---------------稍后去掉
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
    {
      path: '/company',
      name: 'company',
      component: () => import(/* webpackChunkName: "company" */ '@/application/main/company'),
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
        description: '公司介绍',
        param: {}
      }
    },
    { //  名片
      path: '/main/card',
      name: 'card',
      component: () => import(/* webpackChunkName: "progress" */ '@/application/main/profile/card.vue'),
      meta: {
        requireAuth: true,
        title: '名片',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '名片',
        param: {}
      }
    },
    { //  公司简介
      path: '/mian/company',
      name: 'company_profile',
      component: () => import('@/application/main/progress/company-profile.vue'),
      meta: {
        requireAuth: true,
        title: '公司简介',
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn'
        }
      },
      Info: {
        description: '公司简介',
        param: {}
      }
    },
    { //  企业简介
      path: '/about_us',
      name: 'about_us',
      component: resolve => require(['@/application/main/ying/about_us'], resolve),
      meta: {
        requireAuth: true,
        title: '企业简介',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn',
          params: 'go:recommend'
        },
        Info: {
          description: '企业简介',
          params: {}
        }
      }
    },
    { //  微店个人信息
      path: '/card',
      name: 'card',
      component: resolve => require(['@/application/main/ying/card'], resolve),
      meta: {
        requireAuth: true,
        title: '名片',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn',
          params: 'go:recommend'
        },
        Info: {
          description: '名片',
          params: {}
        }
      }
    },
    { //  保单查询
      path: '/order_inquiry',
      name: 'order_inquiry',
      component: resolve => require(['@/application/main/ying/order_inquiry'], resolve),
      meta: {
        requireAuth: true,
        title: '订单查询',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn',
          params: 'go:recommend'
        },
        Info: {
          description: '订单查询',
          params: {}
        }
      }
    },
    { //  微店首页
      path: '/index_list',
      name: 'index_list',
      component: resolve => require(['@/application/main/ying/index_list'], resolve),
      meta: {
        requireAuth: true,
        title: '罗小安的微店',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn',
          params: 'go:recommend'
        },
        Info: {
          description: '罗小安的微店',
          params: {}
        }
      }
    },
    { //  我的相关信息
      path: '/user',
      name: 'user',
      component: resolve => require(['@/application/main/ying/user'], resolve),
      meta: {
        requireAuth: true,
        title: '我的',
        rightMenu: null,
        leftMenu: {
          title: '返回',
          javascript: 'gobackbtn',
          params: 'go:recommend'
        },
        Info: {
          description: '我的',
          params: {}
        }
      }
    }
    // ...xinNen
  ]
})