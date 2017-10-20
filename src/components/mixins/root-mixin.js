/**
  mix 组件
  auth: jankergg
  desc: 基础组件通用方法
*/
export default {
  data () {
    return {
      innerValue: this.value,
      innerErrors: '',
      __hasInited: false,
      __isValid: false
    }
  },
  props: {
    label: String,
    value: [String, Number],
    name: String,
    rules: {
      type: Object,
      default () {
        return {
          vRules: '',
          disabled: false,
          maxlength: ''
        }
      }
    }
  },
  activated () {
    this.__setInit()
    this.$emit('formActive', this.innerModel)
  },
  deactivated () {
    this.__hasInited = false
    this.__isValid = false
  },
  computed: {
    innerModel () {
      return {
        value: this.innerValue,
        msg: this.innerErrors,
        isValid: this.__isValid
      }
    }
  },
  methods: {
    init () {},
    __setInit () {
      if (this.__hasInited) {
        return
      }
      this.__hasInited = true
      this.init()
    }
  },
  watch: {
    value (val) {
      this.innerValue = val
    },
    innerValue (val) {
      this.$emit('formChange', this.innerModel)
    }
  }
}
