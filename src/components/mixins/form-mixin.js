/**
 mix 组件
 auth: jankergg
 desc: 一些表单通用方法
 */
export default {
  data () {
    return {
      isInit: null
    }
  },
  created () {
    if (!this.isInit) {
      this.isInit = true
    }
    this.init()
  },
  activated () {
    if (!this.isInit) {
      this.isInit = true
      this.init()
    }
  },
  mounted () {
    this.ready()
  },
  deactivated () {
    if (this.isInit !== null) {
      this.destroy()
    }
    this.isInit = null
  },
  beforeDestroy () {
    if (this.isInit !== null) {
      this.destroy()
    }
    this.isInit = null
  },
  methods: {
    init () {},
    ready () {},
    destroy () {},
    onValid () {},
    onChange () {},
    // 以下是工具方法，添加工具方法请以 '__' 为前缀
    __toast (msg) {
      this.$vux.toast.show({
        text: msg,
        type: 'text',
        width: '50%',
        isShowMask: true
      })
    },
    __bounce (time) {
      var timer = time || 50
      var that = this
      return {
        do: function (fun) {
          if (that.counter) {
            clearTimeout(that.counter)
          }
          that.counter = setTimeout(function () {
            fun()
            that.counter = null
          }, timer)
        }
      }
    },
    __isValid (err) {
      for (let i in err) {
        let item = err[i]
        if (typeof item === 'string') continue
        if (!item) return false
        if (!item.isValid) {
          // err.errorMsg = item.msg || item.name + " error: 未指定errorMsg或placeHolder"
          return false
        }
      }
      return true
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
    __reset (formModel, defaultValue) {
      for (let i in formModel) {
        if (formModel[i] && formModel[i].value) {
          formModel[i].value = defaultValue || ''
        }
      }
      return formModel
    },
    // 从接口转换数据，生成model类型的数据
    __patch (data, $mod) {
      let mod = Object.assign({}, $mod)
      for (let item in data) {
        if ($mod) {
          if (mod[item] === undefined) {
            // console.error(item + '在formModels中不存在，请检查')
          } else {
            if (!mod[item].value && !mod[item].name) {
              throw new Error('参数一为数据源，参数二为目标对象，请检查参数顺序')
            }
            mod[item].value = data[item]
          }
        } else {
          mod[item] = {
            name: item,
            value: data[item]
          }
        }
      }
      return this.__obj(mod)
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
    __keyValue (target, obj) {
      for (let i in obj) {
        target[i] = {}
        target[i].name = i
        target[i].value = obj[i]
      }
      return target
    },
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
    __arraykv2ob (target, obj) {
      obj.forEach(item => {
        this.$set(target, item.name, item)
      })
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
      if (typeof obj !== 'object') {
        throw new Error('不能对非对象类型使用JSON stringify')
      }
      return JSON.stringify(obj)
    },
    __obj (obj) {
      let o = this.__str(obj)
      return JSON.parse(o)
    }
  }
}
