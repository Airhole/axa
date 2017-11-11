export default {
  data () {
    return {
      form: {},
      formErrors: {},
      errorBag: [],
      isValid: false
    }
  },
  props: {
    titleConfig: Object,
    formModels: {
      type: [Array, Object],
      default () {
        return []
      }
    },
    formRules: {
      type: [Array, Object],
      default () {
        return []
      }
    },
    index: {
      type: [String, Number]
    },
    name: {
      type: [String, Number, Object]
    },
    delPart: {
      type: String
    }
  },
  computed: {
    $formModels () {
      if (typeof this.formModels === 'string') {
        return JSON.parse(this.formModels)
      }
      return this.formModels
    },
    $formRules () {
      if (typeof this.formRules === 'string') {
        return JSON.parse(this.formRules)
      }
      return this.formRules
    },
    // 用于排序
    keys () {
      let key
      let keys = []
      let obj = this.$formModels
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key)
        }
      }
      return keys
    }
  },
  methods: {
    submit () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      let mod = this.__obj(this.innerModel())
      this.timer = setTimeout(() => {
        this.$emit('formChange', mod)
        this.timer = null
      }, 200)
    },
    onChange (val) {
      this.updateForm(val)
    },
    updateForm (val) {
      // 缓存带有child的组件name
      if (!this.__cacheParent) {
        this.__cacheParent = {}
        this.mountChild()
      }
      // 收集所有表单信息，用来验证错误
      this.$set(this.formErrors, val.name, val)

      // 如果是子节点更新了
      if (this.__cacheParent[val.name]) {
        let parent = this.__cacheParent[val.name]
        let realVal = this.form[parent] || {}
        realVal.value = realVal.value || {}
        this.$set(realVal, 'name', parent)
        this.$set(realVal.value, val.name, val.value)
        this.$set(this.form, parent, realVal)
      } else {
        // 添加需要更新的属性
        let prop = this.__attach(['name', 'value', 'index'], val)
        this.$set(this.form, val.name, prop)
      }
    },
    mountChild () {
      let obj = this.$formRules
      let ts = this
      for (let i in obj) {
        if (obj.hasOwnProperty(i) && obj[i].child) {
          for (let prop in obj[i].child) {
            if (obj[i].child.hasOwnProperty(prop)) {
              this.__cacheParent[prop] = i
            }
          }
        }
      }
    },
    deleteThis () {
      this.$emit('formDelete', {index: this.index, name: this.name})
    },
    mountErrors () {
      this.errorBag = []
      this.keys.forEach(i => {
        let err = this.formErrors[i]
        if (err && err.name && !err.isValid) {
          // console.log('eeeeeeeee', err)
          this.errorBag.push(err)
        }
      })
      return this.errorBag
    },
    innerModel () {
      this.mountErrors()

      let _msg = (this.errorBag[0] && this.errorBag[0].msg) || '表单信息填写不完整'
      return {
        name: ((this.name || this.index) || 'formUnit').toString(),
        value: this.form,
        index: this.index,
        msg: _msg,
        status: this.isEmpty() ? 'empty' : (this.isValid ? 'valid' : 'dirty'),
        errorBag: this.errorBag,
        isValid: this.isValid
      }
    },
    isEmpty () {
      let _all = Object.values(this.form).filter(item => {
        return (item.value === '' || item.value === null)
      })
      return _all.length === this.keys.length
    },
    __isValid (err) {
      for (let i in err) {
        let item = err[i]
        if (typeof item === 'string') continue
        if (!item) return false
        if (!item.isValid) {
          return false
        }
      }
      return true
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        console.log('formchange::::::', this.formErrors)
        this.isValid = this.__isValid(this.formErrors)
        this.$nextTick(() => {
          this.submit()
        })
      }
    }
  }
}
