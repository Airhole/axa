/**
 auth: jankergg
 desc: 全局 mixin工具方法，添加工具方法请以 '__' 为前缀
 Warning: 添加全局方法须谨慎，非必要情况请把全局方法添加到 base/settings !!!!!
 */
export default {
  methods: {
    // toast 提示的简单封装，主要是为了方便调用
    __toast (msg) {
      if (!this.$vux) {
        return alert('请检查vux组件是否引入！！')
      }
      this.$vux.toast.show({
        text: msg,
        type: 'text',
        width: '50%',
        isShowMask: true
      })
    },
    // 节流方法，防止短时间内大量重复触发调用
    __bounce (time) {
      var timer = time || 50
      var counter = null
      return {
        // 等到动作完成，最后再触发
        do: function (fun) {
          if (counter) {
            clearTimeout(counter)
          }
          counter = setTimeout(function () {
            fun()
            counter = null
          }, timer)
        },
        // 固定时间内触发，忽略后续输入
        end: function (fun) {
          if (counter) {
            return
          }
          counter = setTimeout(function () {
            fun()
            counter = null
          }, timer)
        }
      }
    },
    // 从对象提取指定的属性，生成新对象
    __attach (attr, ele) {
      let obj = {}
      if (arguments.length === 2) {
        if (Array.isArray(attr)) {
          attr.forEach(prop => {
            obj[prop] = ele[prop]
          })
        } else {
          for (let i in attr) {
            if (attr.hasOwnProperty(i)) {
              obj[i] = ele[i]
            }
          }
        }
      } else {
        throw new Error('必须2个参数')
      }
      return obj
    },
    __num2cn (index) {
      return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][index]
    },
    __getFirstProp (obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return obj[prop]
        }
      }
    },
    __values (obj) {
      return Object.values(obj)
    },
    __keys (obj) {
      return Object.keys(obj)
    },
    // {a:1,b:2} => {a: {key: a, value: 1}, b: {key: a, value: 2}}
    __keyValue (target, obj) {
      for (let i in obj) {
        target[i] = {}
        target[i].name = i
        target[i].value = obj[i]
      }
      return target
    },
    // __keyValue 的ob版，生成能被vue监听的对象
    __obkv (target, obj) {
      for (let i in obj) {
        if (!target[i]) {
          target[i] = {}
        }
        this.$set(target[i], 'name', i)
        this.$set(target[i], 'value', obj[i])
      }
      return target
    },
    __getUrlParam (param) {
      let a = {}
      try {
        window.location.href.split('?')[1].split('&').map((e, i, arr) => {
          a[e.split('=')[0]] = decodeURIComponent(e.split('=')[1])
        })
        return a[param]
      } catch (e) {
        return null
      }
    },
    __str (obj) {
      return JSON.stringify(obj)
    },
    __s2o (str) {
      let o = null
      try {
        o = JSON.parse(str)
      } catch (e) {
        alert(e)
      }
      return o
    },
    __obj (obj) {
      let o = this.__str(obj)
      return JSON.parse(o)
    }
  }
}
