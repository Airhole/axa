import Vue from 'vue'
const config = {
  baseUi: [
    {
      name: 'c_mask',
      path: require('@/components/base/mask')
    },
    {
      name: 'c_article',
      path: require('@/components/base/article')
    },
    {
      name: 'c_scroll',
      path: require('@/components/base/scroll')
    },
    {
      name: 'c_errMsg',
      path: require('@/components/base/errmsg')
    },
    {
      name: 'c_button',
      path: require('@/components/base/default-btn')
    },
    {
      name: 'c_radio',
      path: require('@/components/base/cradio')
    },
    {
      name: 'c_selectBlock',
      path: require('@/components/base/selectblock')
    },
    {
      name: 'c_radioBlock',
      path: require('@/components/base/radioblock')
    },
    {
      name: 'c_gender',
      path: require('@/components/base/gender')
    },
    {
      name: 'c_selectBlock',
      path: require('@/components/base/selectblock')
    },
    // 同步注册告知问题 开始
    {
      name: 'qtype1',
      path: 'components/service/notify/qtype1',
      src: true
    },
    {
      name: 'qtype2',
      path: 'components/service/notify/qtype2',
      src: true
    },
    {
      name: 'qtype3',
      path: 'components/service/notify/qtype3',
      src: true
    },
    {
      name: 'qtype4',
      path: 'components/service/notify/qtype4',
      src: true
    },
    {
      name: 'qtype5',
      path: 'components/service/notify/qtype5',
      src: true
    },
    {
      name: 'qtype6',
      path: 'components/service/notify/qtype6',
      src: true
    },
    {
      name: 'qtype7',
      path: 'components/service/notify/qtype7',
      src: true
    },
    {
      name: 'qtype8',
      path: 'components/service/notify/qtype8',
      src: true
    },
    {
      name: 'qtype8a',
      path: 'components/service/notify/qtype8a',
      src: true
    },
    {
      name: 'qtype9',
      path: 'components/service/notify/qtype9',
      src: true
    },
    {
      name: 'qtype10',
      path: 'components/service/notify/qtype10',
      src: true
    },
    {
      name: 'qtype11',
      path: 'components/service/notify/qtype11',
      src: true
    },
    {
      name: 'qtype12',
      path: 'components/service/notify/qtype12',
      src: true
    },
    {
      name: 'qtype13',
      path: 'components/service/notify/qtype13',
      src: true
    },
    {
      name: 'qtype14',
      path: 'components/service/notify/qtype14',
      src: true
    },
    {
      name: 'qtype15',
      path: 'components/service/notify/qtype15',
      src: true
    },
    {
      name: 'qtype16',
      path: 'components/service/notify/qtype16',
      src: true
    },
    {
      name: 'qtype17',
      path: 'components/service/notify/qtype17',
      src: true
    },
    // 同步注册告知问题 结束
    {
      name: 'study',
      path: 'application/study/index',
      src: true // 'application/study/test'
    },
    {
      name: 'c_btngroup',
      path: require('@/components/base/btngroup')
    },
    // 入职推荐分享
    {
      name: 'entroll_share',
      path: require('@/components/base/entroll_share')
    },
    // 入职推荐弹层
    {
      name: 'entroll_err',
      path: require('@/components/base/entrollerr')
    }
  ],
  serviceUi: [
    {
      name: 'c_staticlist',
      path: require('@/components/service/staticlist')
    }
  ]
}
let objKey = Object.keys(config)
objKey.map(function (ele, index, array) {
  config[ele].map(function (e, i, a) {
    if (e.src) {
      Vue.component(e.name, (resolve) => {
        require.ensure([], (require) => {
          let req = require.context("@/", true, /^\.\/.*\.vue$/)(`./${e.path}.vue`)
          resolve(req)
          // resolve(require.context('@/xx/', false, /\.vue$/)(`./${name}`))
          // resolve(require.context('@/components/', false, /\.vue$/)(`./${name}`))
        })
      })
    } else {
      Vue.component(e.name, e.path)
    }
  })
})

export default config
