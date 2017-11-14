import {Validator} from 'vee-validate'

export default {
  data () {
    return {
      innerValue: this.value,
      timer: null
    }
  },
  props: {
    label: String,
    value: [String, Number],
    index: [String, Number],
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
  computed: {
    validator () {
      if (this._validator) {
        return this._validator
      }
      const validator = new Validator()
      validator.attach(this.name, this.rules.vRules, this.label)
      this._validator = validator
      return validator
    }
  },
  methods: {
    init () {
      // rules.event 定义数据变化事件
      this.__eventType = (this.rules && this.rules.event) || 'input'
      this.onValidate()
    },
    eventHandler (e, type) {
      if (type === this.__eventType) {
        typeof this[type] === 'function' && this[type](e)
      }
    },
    // event 类型
    input (e) {
      this.innerValue = e.target.value || ""
    },
    change (e) {
      this.innerValue = e.target.value || ""
    },
    blur (e) {
      this.innerValue = e.target.value || ""
    },
    focus (e) {
    },
    onValidate () {
      if (this.rules) {
        // rules 是表单规则，无规则则不触发验证
        if (!this.innerValue) { return }
        this.validator.validate(this.name, this.innerValue).then(res => {
          if (res === true) {
            this.$emit('formValid', this.innerModel())
          }
        }).catch((e) => {
          // this.$emit('formError', this.innerModel)
        })
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$emit('formChange', this.innerModel())
      }, 350)
    },
    errorMsg () {
      let _msg = this.validator.errorBag.first(this.name)
      if (_msg !== this.name) {
        return _msg
      }
      return this.rules.errorMsg || this.rules.placeholder
    },
    innerModel () {
      return {
        name: this.name,
        value: this.innerValue,
        index: this.index,
        msg: this.rules.errorMsg || this.rules.placeholder || this.errorMsg(),
        isValid: !this.validator.errorBag.has(this.name)
      }
    }
  },
  watch: {
    value (v) {
      if (v === null || v === undefined) {
        v = ''
      }
      this.innerValue = v
    },
    innerValue (val) {
      console.log('innerValue change:::', val)
      this.onValidate()
    }
  }
}
