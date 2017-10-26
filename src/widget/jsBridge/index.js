/*eslint-disable */
/*
 *
 * jsbridge
 *
 * window.jsBridge status
studyArticleDetail  *
 * window.cook set get delete
 *
 * window.ostype 判断是否为app
 *
 * window.token cookie内获取 token
 *
 * window.HQAppGetH5Header
 * 当app JS 注入完成修改jsBridge.loadstatus 为true
 * window.checkload promise 触发 resolve
 *
 * window.SetH5Header APP设置title
 *
 * window.leftMenu param n 文案 设置左文案
 *
 * window.rightMenu param n 文案 设置右文案
 *
 * window.hideMenu string param 隐藏左右bar按钮 0 左 1右  3全部
 *
 * window.articleDetail app 调用pdf video image
 *
 * window.callCamera
 *
 * HqGotoPrevStep 左边按钮点击后 调用
 *
 * setWebViewMenu 右边按钮
 *
 * showPosterDetail 点击显示大图数组可分享
 *
 * sendSms 发送短信
 *
 * 导入 扫描 客户 待定
 *
 * 职业查询
 *
 */
import cookie from '@/utils/cookie'

// 通过API : app.title = 'xinNen' 设置标题
// 通过app.title获取当前标题 输出 xinNen
// 可以较早尝试设置标题，但会等待jsBridge初始化后才真正设置标题
// 可以多次设置标题 但是最后一次胜出并给出warn
// app.title = title1 ; app.title = title2; 最后app标题会变成 title2，但是这种情况应给出warn

// 所以，得有一个状态集记录 app的状态
// 添加一个加载监听函数： app.load = callback or app.load(callback)

const ACTION = {
  SET_TITLE : 1
}

let nativeInterface = window.HQAppJSInterface

const mockInterface = {
  onJSInvokeResult (actionType, value) {
    if (actionType === ACTION.SET_TITLE) {
      document.title = value
      console.log(`[${Date.now()}]:mock set title.`)
    }
  },
  setActionBarBackItem () {
    console.log(`[${Date.now()}]:mock set backItem in bar.`)
  }
}

// nativeInterface = mockInterface

//  一个symbol的factory, 通过属性访问符添加和访问（但不允许重置）
//  这样添加一个symbol:  $.LOAD
//  再次访问这个symbol也依然用 $.LOAD
//  坏的就是IDE还不能解析这种动态语法
const $ = new Proxy(new WeakMap(), {
  get(target, key) {
    if (!Reflect.has(target, key)) {
      Reflect.set(target, key, Symbol(key))
    }
    return Reflect.get(target, key)
  },
  set (target, key, value) {
    if (Reflect.has(target, key)) {
      throw new TypeError('Assignment to constant variable.')
    } else {
      Reflect.set(target, key, Symbol(value))
    }
    return Reflect.get(target, key)
  }
})


const STATUS_LOAD = Symbol('status_load')
const COUNT_SET_STATUS_LOAD = Symbol('count_set_status_load')
const HANDLERS = Symbol('handlers')
const HANDLER_TITLE = Symbol('handler_title')
const Q_TITLE = Symbol('q_title')
const ON_SET_TITLE = Symbol('on_set_title')

const jsBridge = {
  /**
   * 当前key存放作为一个集合，存放了各种事件的处理函数
   *
   * 通过使用一个symbol作为对象的key的方式，兼顾了调试和安全两个方面，
   * 因为打印时可以看见，当前文件中是可以访问这个，所以调试是方便的
   * 但是因为这个key是'protected'的，当前文件外无法访问，所以这是安全的
   */
  [HANDLERS]: {},
  /**
   * 主动触发一个事件
   * @param event {String} <required> 事件名
   * @param payload {any} <optional> 负荷，会捎带给事件的处理函数
   */
  emit (event, payload) {
    let handlers = this[HANDLERS][event] // handlers是以事件名分组的，每个组是一个数组
    if (Array.isArray(handlers)) { // 如果某种事件有监听的处理函数，那么一定在事件名组成的数组里
      for(let it of handlers) { // 遍历当前事件的处理函数
        if (!it.invalid && typeof it.handler === 'function') { // 如果被标记为不合法的，或者说当前项内没有有效的函数，则跳过
          it.handler(payload) // 一一调用对应的处理函数，并把负荷捎带给它们
          if (it.once) { // 如果一个处理函数被声明为只调用一次，那么先标记为不合法，稍后处理。
            // 为什么不在这儿处理？因为遍历数组的过程中，一边遍历一边更新数组不是一个好的实践
            it.invalid = true
          }
        }
      }
      // 重新归并当前事件的处理函数数组，去掉刚才遍历时标记为不合法的项
      this[HANDLERS][event] = this[HANDLERS][event].reduce((pub, it) => { // pub即为reduce函数的第二个参数，在这里最开始时是[]
        if (!it.invalid) { // 如果是合法的，则收集它们
          pub.push(it)
        }
        return pub
      },[])
      // 如果当前事件的处理函数数组为空，则把空集合清理掉
      if (this[HANDLERS][event].length === 0) {
        delete this[HANDLERS][event]
      }
    }
  },
  /**
   * 向jsBridge注册一个事件处理函数，当该事件发生时该函数会反复发生
   * @param event {String} <required> 事件类型
   * @param handler {Function} <required> 处理函数
   * @param once {Boolean} <optional> 标记当前处理函数是否是只执行一次就移除
   */
  on (event, handler, {once} = {}) {
    // 如果当前集合中没有事件x的事件队列，则以事件为作为key声明一个空数组作为事件x的事件队列
    if (!this[HANDLERS][event] || !Array.isArray(this[HANDLERS][event])) {
      this[HANDLERS][event] = []
    }
    // 在当前的事件队列中放入当前事件处理函数（以及其它标志信息）
    this[HANDLERS][event].push({handler, once})
  },
  /**
   * 向jsBridge注册一个事件处理函数
   * 和on函数注册的事件相比，当前函数注册的事件只会发生一次
   * @param event {String} <required> 事件类型
   * @param handler {Function} <required> 处理函数
   */
  once (event, handler) {
    this.on(event, handler, {once: true}) // 委托on函数绑定事件
  },
  /**
   * 接受一个回调函数，当jsBridge初始化后自动调用
   * 如果jsBridge已经初始化了，则会马上执行（注意，这里仍然是异步）
   * @param callback {Function} 回调函数
   * @returns {Promise} 返回一个promise，可以不使用回调，而是使用promise去处理调用关系
   */
  ready (callback) {
    // 初始化一个promise
    let promise = new Promise(resolve => {
      // 如果jsBridge已经初始化了，立马resolve，否则，则注册一个load事件的处理函数，load事件发生了，resolve当前promise
      this.isInitialized ? resolve() : this.once('load', () => resolve())
    })
    // 如果当前函数调用时传递了回调，则promise好了以后调用该回调函数
    if (typeof callback === 'function') {
      promise.then(() => callback())
    }
    return promise // 返回该回调函数，让调用方处理（如果调用方需要的话）
  },
  get isInitialized () {
    return this.status.loadStatus
  },
  status: {
    [STATUS_LOAD]: false,
    [COUNT_SET_STATUS_LOAD]: 0,
    set loadStatus (loaded) {
      let historyStatus = this[STATUS_LOAD]
      this[STATUS_LOAD] = loaded
      if (loaded) {
        console.assert(this[COUNT_SET_STATUS_LOAD] <= 1 , '设置load status为true多于1次')
        if (historyStatus === false) {  // 当 load status从false变成true，触发一次
          jsBridge.emit('load')
        }
      }
      this[COUNT_SET_STATUS_LOAD] ++
    },
    get loadStatus () {
      return this[STATUS_LOAD]
    },
    camera: {
      status: false,
      value: '',
      index: 1
    },
    idCard: {
      status: false,
      value: ''
    },
    address: {
      status: false,
      value: ''
    },
    bank: {
      status: false,
      value: ''
    },
    job: {
      status: false,
      value: ''
    },
    customer: {
      status: false,
      value: ''
    },
    sign: {
      status: false,
      value: ''
    },
    viewPdf: {
      status: false,
      value: ''
    },
    shareInvoke: {
      status: false,
      value: ''
    },
    audio: {
      status: false,
      value: ''
    }
  }
}

const app = {
  [Q_TITLE]: [],
  [ON_SET_TITLE]: false,
  [HANDLER_TITLE] () {
    if (this[Q_TITLE].length > 1) {
      console.warn('try to set app title multiple.')
    }
    let title = this[Q_TITLE].pop()
    nativeInterface.onJSInvokeResult(ACTION.SET_TITLE, title)
    this[Q_TITLE] = []
    this[ON_SET_TITLE] = false
  },
  set title (title) {
    this[Q_TITLE].push(title)
    if (!this[ON_SET_TITLE]) {
      this[ON_SET_TITLE] = true
      jsBridge.ready(this[HANDLER_TITLE].bind(this))
    }
  },
  get title () {
    // ??
  }
}

window.jsBridge = jsBridge
window.app = app

window.ostype = function () {
  return cookie.get('hq_http_ostype')
}
window.token = function () {
  return cookie.get('hq_http_usertoken')
}
window.HQAppGetH5Header = function (n) { // 当app加载完毕后 app调用修改 loadstatus 表示完毕
  window.jsBridge.status.loadstatus = true
}

window.checkload = function () {
  return new Promise((resolve, reject) => {
    if (!window.jsBridge.status.loadstatus) {
      let tid = window.setInterval(() => {
        if (window.jsBridge.status.loadstatus) {
          window.clearInterval(tid)
          // alert('checkload success')
          resolve('success')
        } else {
          // reject('fail')
        }
      }, 30)
    } else {
      resolve('success')
    }
  })
  // return new Promise((resolve, reject) => {
  //   let tid = window.setInterval(() => {
  //     setTimeout(function () {
  //       resolve('100ms')
  //     }, 100)
  //   })
  // })
}
window.SetH5Header = function (n) {
  app.title = n
  // window.checkload().then(success => {
  //   if (window.HQAppJSInterface) {
  //     window.HQAppJSInterface.onJSInvokeResult(1, n) // 1 title
  //   }
  // }, fail => {
  //   console.log(fail)
  // }).catch(error => {
  //   console.log(error)
  //   throw new Error(error)
  // })
}
// {
// title: //显示的标题
// javascript: 要执行的JavaScript函数名
// params: //JavaScript调用时传递的参数，H5给过来什么数据，App在调用JS时会完整的传回去
// }
window.leftMenu = function (n) { // left menu
  jsBridge.ready(function () {
    nativeInterface.setActionBarBackItem(JSON.stringify(n))
  })
  // let param = JSON.stringify(n)
  // window.checkload().then(success => {
  //   if (window.HQAppJSInterface) {
  //     window.HQAppJSInterface.setActionBarBackItem(param)
  //   }
  // }, fail => {
  //   console.log(fail)
  // }).catch(error => {
  //   console.log(error)
  //   throw new Error(error)
  // })
}
window.toggleMenu = function (n, show) { // hide menu tring param 隐藏左右bar按钮 1 左 2右  3全部
  window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      // alert('toggleMenu n=' + n + 'show=' + show)
      window.HQAppJSInterface.showActionBarPanel(n, show)
    }
  }, fail => {
    console.log(fail)
  }).catch(error => {
    console.log(error)
    throw new Error(error)
  })
}
// {
// type:’text/image
// title: //显示的标题
// url: //如果是text或image，只能设置跳转目标url，
// javascript: 要执行的JavaScript函数名
// params: //JavaScript调用时传递的参数，H5给过来什么数据，App在调用JS时会完整的传回去
// }
window.rightMenu = function (n) { // set 右按钮
  let param = JSON.stringify(n)
  window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      window.HQAppJSInterface.setWebViewMenu(param)
    }
  }, fail => {
    console.log(fail)
  }).catch(error => {
    console.log(error)
    throw new Error(error)
  })
}

window.articleDetail = function (url, title, btnTxt) {  // app 只读pdf
  if (!title) {
    title = ''
  }
  if (!btnTxt) {
    btnTxt = ''
  }
  return window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      return window.HQAppJSInterface.studyArticleDetail(url, title, btnTxt)
    }
    return null
  }, fail => {
    console.log(fail)
  }).catch(error => {
    console.log(error)
    throw new Error(error)
  })
}

window.startAudioRec = function (isShow) {  // app 启动录音
  clearTimer()
  let startAudio = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.audio.status = false
      window.jsBridge.status.audio.value = ''
      window.HQAppJSInterface.requestAudioRecording(isShow)
      window.__tid = window.setInterval(success => {
        // alert(window.jsBridge.status.audio.status)
        if (window.jsBridge.status.audio.status) {
          clearTimer()
          resolve(window.jsBridge.status.audio.value)
          window.jsBridge.status.audio.status = false
          window.jsBridge.status.audio.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return startAudio()
  })
}

window.viewPdf = function (url, title, btnTxt) {  // app 调用pdf video image 带阅读并同意功能
  clearTimer()
  let vPDF = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.viewPdf.status = false
      window.jsBridge.status.viewPdf.value = ''
      window.HQAppJSInterface.studyArticleDetail(url, title, btnTxt)
      window.__tid = window.setInterval(success => {
        // alert('job=' + window.jsBridge.status.bank.status)
        console.log(window.jsBridge.status.viewPdf.status)
        if (window.jsBridge.status.viewPdf.status) {
          // debugger
          clearTimer()
          // alert('job start=' + window.jsBridge.status.bank.status)
          // alert(window.jsBridge.status.bank.value)
          resolve(window.jsBridge.status.viewPdf.value)
          window.jsBridge.status.viewPdf.status = false
          window.jsBridge.status.viewPdf.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return vPDF()
  })
}

// 获取数据字典内容
window.dictionary = {}
let dictionary = [
  // "occupation",        // 职业列表
  // "area",              // 全国地址字典数据类型
  "post_type",         // 保单寄送类型
  "preserve",          // 保全类型
  "sales_channel",      // 销售渠道
  "relation",         // 家庭关系
  "bankcode",          // 银行卡列表
  "benefit_type",      // 受益人类型
  "card_type",         // 证件类型
  "citizenship",       // 国家列表
  "cover",             // 封面类型
  "degree",            // 学历列表
  "coverage_state",    // coverage_state
  "gender",            // 性别
  "insure_state",      // 保单状态
  "marriage",          // 婚姻情况列表
  "nation",            // 民族
  "payment",           // 支付类型
  "policy_channel",    // 保险渠道
  "occupation_level"  // 职业等级列表
]

function KVtoNV (n) {
  // let newObj = {}
  if (typeof n == 'object') {
    if (Array.isArray(n)) {
      return n.map(function (v, i, arr) {
        return KVtoNV(v)
      })
    } else {
      let newN = {}
      Object.keys(n).map(function (v, i, arr) {
        if (v == "key") {
          newN.value = KVtoNV(n[v])
        } else if (v == "value") {
          newN.name = KVtoNV(n[v])
        } else {
          newN[v] = KVtoNV(n[v])
        }
      })
      return newN
    }
  } else {
    return n
  }
}
window.KVtoNV = KVtoNV
window.setDictionary = function (n) { // 获取字典
  let setDic = function () {
    return new Promise((resolve, reject) => {
      if (window.HQAppJSInterface) {
        let stringJson = JSON.parse(window.HQAppJSInterface.getDicDataByType(n))
        window.dictionary[stringJson.name] = KVtoNV(stringJson.item)
        resolve(stringJson)
      } else {
        reject('fail')
      }
    })
  }
  return window.checkload().then(function (data) {
    return setDic()
  })
}
window.setAllDictionary = function () {
  window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      dictionary.map(function (v, i, arr) { // 如果localStorage 无
        let stringJson = JSON.parse(window.HQAppJSInterface.getDicDataByType(v))
        window.dictionary[stringJson.name] = KVtoNV(stringJson.item)
      })
    }
  }, fail => {
    console.log(fail)
  }).catch(e => {
    console.log(e)
    throw new Error(e)
  })
}
window.setAllDictionary()

// 查询字典后返回数据
window.getDictionary = function (n) {
  var dir = function () {
    return new Promise((resolve, reject) => {
      if (window.dictionary[n]) {
        resolve(window.dictionary[n])
      } else {
        reject('fail')
      }
    })
  }

  return window.setDictionary(n).then(function (data) {
    return dir()
  })
}
// 查询字典后返回数据
// window.getDictionary('payment').then(success => {
//   let a = window.findDictionary(success, {value: '01'})  // {name: '男'}
//   console.log(a)
// }, fail => {
//   console.log(fail)
// }).catch(e => console.log(e))
window.findDictionary = function (target, n) { // 查字典  n.name || n.value
  let k = Object.keys(n)[0]
  let va = n[k]
  let seled = null
  function findObject (o) {
    if (typeof o == 'object') {
      if (Array.isArray(o)) {
        o.find(function (v, i, arr) {
          return findObject(v)
        })
      } else {
        if (o[k] == va) {
          seled = o
        }
      }
    }
  }
  findObject(target)
  return seled
}

// 模糊匹配
window._findDictionary = function (target, n) { // 查字典  n.name || n.value
  let k = Object.keys(n)[0]
  let va = n[k]
  let seled = null
  function findObject (o) {
    if (typeof o == 'object') {
      if (Array.isArray(o)) {
        o.find(function (v, i, arr) {
          return findObject(v)
        })
      } else {
        if (o[k].indexOf(va) != -1) {
          seled = o
        }
      }
    }
  }
  findObject(target)
  return seled
}
// timeInterval
window.__tid = null
// 呼叫app 照相机
let timeid
window.callCamera = function (n) {
  clearTimer()
  let camera = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.index += 1
      window.jsBridge.status['camera' + window.jsBridge.status.index] = {
        status: false,
        value: ''
      }
      window.jsBridge.status.camera.status = false
      window.jsBridge.status.camera.value = ''
      window.HQAppJSInterface.takeUserImage()

      window.__tid = window.setInterval(success => {
        if (window.jsBridge.status.camera.status) {
          clearTimer()
          resolve(window.jsBridge.status.camera.value, n)
          window.jsBridge.status.camera.status = false
          window.jsBridge.status.camera.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return camera()
  })
}

// 呼叫app 照相机-裁剪
window.tailorCamera = function (n, bool, width, height) {
  clearTimer()
  let camera = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.index += 1
      window.jsBridge.status['camera' + window.jsBridge.status.index] = {
        status: false,
        value: ''
      }
      window.jsBridge.status.camera.status = false
      window.jsBridge.status.camera.value = ''
      window.HQAppJSInterface.takeUserImage(bool, width, height)

      window.__tid = window.setInterval(success => {
        if (window.jsBridge.status.camera.status) {
          clearTimer()
          resolve(window.jsBridge.status.camera.value, n)
          window.jsBridge.status.camera.status = false
          window.jsBridge.status.camera.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return camera()
  })
}

// // 呼叫app 相机返回
// window.HQAppUploadResult = function (data) {
//   window.jsBridge.status.camera = true
// }
// window.onJSInvokeResult = function (argument) {
//   document.body.innerHTML += argument.name
// }
// 呼叫地址选择
window.callAddress = function () {
  clearTimer()
  let address = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.address.status = false
      window.jsBridge.status.address.value = ''
      window.HQAppJSInterface.popUpAddressChooseView()
      window.__tid = window.setInterval(success => {
        // alert('address=' + window.jsBridge.status.address.status)
        if (window.jsBridge.status.address.status) {
          clearTimer()
          // alert('address start=' + window.jsBridge.status.address.status)
          // alert(window.jsBridge.status.address.value)
          resolve(window.jsBridge.status.address.value)
          window.jsBridge.status.address.status = false
          window.jsBridge.status.address.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return address()
  })
}
// 响应地址选择
// window.onAreaChooseResult = function (data) {
//   window.jsBridge.status.address = true
// }
// // HqGotoPrevStep
// window.HqGotoPrevStep = function () { // app bar left menu click callback
// }
// 呼叫身份证扫描
window.idCardScan = function () {
  clearTimer()
  let idcard = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.idCard.status = false
      window.jsBridge.status.idCard.value = ''
      window.HQAppJSInterface.requestScanCertificateCard()
      window.__tid = window.setInterval(success => {
        if (window.jsBridge.status.idCard.status) {
          clearTimer()
          resolve(window.jsBridge.status.idCard.value)
          window.jsBridge.status.idCard.status = false
          window.jsBridge.status.idCard.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return idcard()
  })
}
// 导入银行卡
window.getBank = function () {
  clearTimer()
  let bank = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.bank.status = false
      window.jsBridge.status.bank.value = ''
      window.HQAppJSInterface.requestScanBankCard()
      window.__tid = window.setInterval(success => {
        // alert('job=' + window.jsBridge.status.bank.status)
        if (window.jsBridge.status.bank.status) {
          clearTimer()
          // alert('job start=' + window.jsBridge.status.bank.status)
          resolve(window.jsBridge.status.bank.value)
          window.jsBridge.status.bank.status = false
          window.jsBridge.status.bank.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return bank()
  })
}

// 启动CA手写签名
window.caSign = function (name, type, keyWord) {
  clearTimer()
  // let arr = []
  // if (arguments.length > 0) {
  //   Array.from(arguments[]).forEach((item) => {
  //     arr.push(item)
  //   })
  // }
  // let params = arr.join(';')
  let sign = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.sign.status = false
      window.jsBridge.status.sign.value = ''
      window.HQAppJSInterface.requestCAGestureSignData(name, type, keyWord)
      window.__tid = window.setInterval(success => {
        // alert('job=' + window.jsBridge.status.bank.status)
        if (window.jsBridge.status.sign.status) {
          clearTimer()
          // alert('job start=' + window.jsBridge.status.bank.status)
          // alert(window.jsBridge.status.bank.value)
          resolve(window.jsBridge.status.sign.value)
          window.jsBridge.status.sign.status = false
          window.jsBridge.status.sign.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return sign()
  })
}

// 导入职业数据
window.getJob = function () {
  clearTimer()
  let job = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.job.status = false
      window.jsBridge.status.job.value = ''
      window.HQAppJSInterface.requestOccupationDicItem()
      window.__tid = window.setInterval(success => {
        // alert('job=' + window.jsBridge.status.job.status)
        if (window.jsBridge.status.job.status) {
          clearTimer()
          // alert('job start=' + window.jsBridge.status.job.status)
          // alert(window.jsBridge.status.job.value)
          resolve(window.jsBridge.status.job.value)
          window.jsBridge.status.job.status = false
          window.jsBridge.status.job.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return job()
  })
}
// 客户导入
window.getCustomer = function () {
  clearTimer()
  let customer = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.customer.status = false
      window.jsBridge.status.customer.value = ''
      window.HQAppJSInterface.requestImportCustomerItem()
      window.__tid = window.setInterval(success => {
        // alert('job=' + window.jsBridge.status.customer.status)
        if (window.jsBridge.status.customer.status) {
          clearTimer()
          // alert('job start=' + window.jsBridge.status.customer.status)
          // alert(window.jsBridge.status.customer.value)
          resolve(window.jsBridge.status.customer.value)
          window.jsBridge.status.customer.status = false
          window.jsBridge.status.customer.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return customer()
  })
}

window.app2js_onDataResult = function (type, data) {
  // alert('type=' + type)
  // alert('data=' + data)
  switch (type) {
  case 'takeUserImage':
    window.jsBridge.status.camera.value = data
    window.jsBridge.status.camera.status = true
    break
  case 'popUpAddressChooseView':
    window.jsBridge.status.address.value = data
    window.jsBridge.status.address.status = true
    break
  case 'requestScanCertificateCard':
    window.jsBridge.status.idCard.value = data
    window.jsBridge.status.idCard.status = true
    break
  case 'requestImportbankItem':
    window.jsBridge.status.bank.value = data
    window.jsBridge.status.bank.status = true
    break
  case 'requestOccupationDicItem':
    window.jsBridge.status.job.value = data
    window.jsBridge.status.job.status = true
    break
  case 'requestCAGestureSignData':
    window.jsBridge.status.sign.value = data
    window.jsBridge.status.sign.status = true
    break
  case 'requestImportCustomerItem':
    window.jsBridge.status.customer.value = data
    window.jsBridge.status.customer.status = true
    break
  case 'studyArticleDetail':
    window.jsBridge.status.viewPdf.value = data
    window.jsBridge.status.viewPdf.status = true
    break
  case 'appLocalShare':
    window.jsBridge.status.shareInvoke.value = data
    window.jsBridge.status.shareInvoke.status = true
    // alert(data)
    // window.AAA = data
    break
  case 'requestAudioRecording':
    window.jsBridge.status.audio.value = data
    window.jsBridge.status.audio.status = true
    // alert(data)
    break
  }
}
// 3.2 关闭webview
// H5调用
// closeWebview(String type)
// h5调用closeWebview关闭当前webview，参数type：
// 1 – 关闭webview并返回到app首页
// 2 – 只关闭webview
window.closeWebview = function (n = 2) {
  window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      window.HQAppJSInterface.closeWebview(n)
    }
  }, fail => {
    console.log(fail)
  }).catch(error => {
    console.log(error)
    throw new Error(error)
  })
}

// window share
// 调用描述：
// H5调用appLocalShare让APP显示分享对话框(分享按钮在H5实现)
// 2)H5调用setAppLocalShareData设置APP分享数据，从而将APP的分享按钮显示出来

// 接口细节：
/** type值的定义描述：
 1 = 未指定，app会默认弹出分享对话框供用户选择
 2 = 微信好友
 3 = 微信朋友圈
 4 = QQ好友
 5 = QQ空间
 6 = 微博
如果要type之间用分号；隔开，比如要分享到微信好友和朋友圈，可将type设置为：
“2;3”
 **/
 // 指定显示右上角的分享按钮(右上角分享按钮事件)
window.showShare = function (type, url, imageUrl, title, desc, callback, hasCallback) {
  if (hasCallback) {
    return window.HQAppJSInterface.appLocalShare(type, url, imageUrl, title, desc, callback)
  }
  clearTimer()
  let share = function () {
    return new Promise((resolve, reject) => {
      window.jsBridge.status.shareInvoke.status = false
      window.jsBridge.status.shareInvoke.value = ''
      if (window.HQAppJSInterface) {
        window.HQAppJSInterface.appLocalShare(type, url, imageUrl, title, desc, callback)
      }
      window.__tid = window.setInterval(success => {
        if (window.jsBridge.status.shareInvoke.status) {
          clearTimer()
          if (window[callback] && typeof window[callback] == 'function') {
            window[callback](window.jsBridge.status.shareInvoke.value)
          }
          resolve(window.jsBridge.status.shareInvoke.value)
          window.jsBridge.status.shareInvoke.status = false
          window.jsBridge.status.shareInvoke.value = ''
        } else {
          // reject('fail')
        }
      }, 30)
    })
  }
  return window.checkload().then(function (data) {
    return share()
  })
}

// String type，String url, String imageUrl, String title, String desc， String callback
// 点击显示分享菜单（页面中分享按钮事件）
window.showShareBtn = function (type, url, imageUrl, title, desc, callback) {
  window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      window.HQAppJSInterface.setAppLocalShareData(type, url, imageUrl, title, desc, callback)
    }
  }, fail => {
    console.log(fail)
  }).catch(error => {
    console.log(error)
    throw new Error(error)
  })
}

 // 指定显示右上角的搜索和分享
window.showShareArr = function (fun, url, imageUrl, title, desc) {
  window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      let array = []
      array[0] = {title: "搜索", javascript: fun}
      array[1] = {title: "分享", attachData: {typeSet: ["1"], url: url, imageUrl: imageUrl, title: title, desc: desc, callback: 'shareCallback'}}
      window.HQAppJSInterface.setWebViewMenus(JSON.stringify(array))
    }
  }, fail => {
    console.log(fail)
  }).catch(error => {
    console.log(error)
    throw new Error(error)
  })
}



// 显示详情页大图数组分享
window.showPosterDetail = function (param, index) {
  window.HQAppJSInterface.showPosterDetail(JSON.stringify(param), index)
}

// 发短信
window.sendSms = function (telNum, content) {
  window.HQAppJSInterface.sendSms(JSON.stringify(telNum), content)
}

window.showShareEntry = function (type, url, title, desc, callback) {
  window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      window.HQAppJSInterface.setAppLocalShareData(type, url, title, desc, callback)
    }
  }, fail => {
    console.log(fail)
  }).catch(error => {
    console.log(error)
    throw new Error(error)
  })
}

function clearTimer () {
  if (window.__tid) {
    window.clearInterval(window.__tid)
    window.__tid = null
  }
}
