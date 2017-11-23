/*
* @Author: jankergg
* @Date:   2017-11-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2017-11-14 15:44:33
*/

export default {
  data () {
    return {
      formModels: null, // 从外部文件引入的原始数据
      formRules: null, // 从外部文件引入的原始规则
      $formModels: this.__Model, // 传给formUnit
      $formRules: this.__Rule, // 传给formUnit
      formErrors: [], // 表单报错信息集合
      formStatus: '', // 表单状态：empty, dirty, valid
      form: {}, // 表单数据合集，根据响应 实时更新
      options: {}, // 页面一些配置参数，用于接口请求，如applyId, planId
      __data: null // 接口数据的本地缓存
    }
  },
  computed: {
    // 引入可计算属性，主要是考虑到数据结构及类型的转换
    // 计算及转换formModel
    __Model: {
      get () {
        this.$formModels = this.__modHelper(this.formModels)
      },
      set (v) {
        this.formModels = this.__modHelper(v)
      }
    },
    // 计算及转换formRules
    __Rule: {
      get () {
        this.$formModels = this.__ruleHelper(this.formModels)
      },
      set (v) {
        this.formRules = this.__ruleHelper(v)
      }
    },
    isValid () {
      return this.formErrors.length === 0
    },
    errorMsg () {
      return this.formErrors.length ? this.formErrors[0].msg : ''
    }
  },
  methods: {
    init () {
      this.$formModels = this.__Model
      this.$formRules = this.__Rule
    },
    ready () {
      this.getData()
    },
    getData () {},
    onChange (val) {
      this.$nextTick(() => {
        this.__updateForm(val)
      })
    },
    __updateForm (val) {
      this.formErrors = val.errorBag
      this.formStatus = val.status
      this.form = val.value
    },
    // 这个方法可以重写
    __modHelper (v) {
      return v
    },
    // 这个方法可以重写
    __ruleHelper (v) {
      return v
    }
  }
}