/*
* @Author: jankergg
* @Date:   2017-09-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2017-11-15 11:11:45
*/

import {Validator} from 'vee-validate'

export default {
  data () {
    return {
      innerValue: this.value,
      __eventType: this.rules.event,
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
      let eName = 'e_' + this.__eventType
      if (this.__eventType === type) {
        // 触发
        typeof this[eName] === 'function' && this[eName](e)
      } else {
        this.$emit('onEvent', {event: e, type: type})
      }
    },
    // event 类型
    e_input (e) {
      this.innerValue = (e && e.target.value) || ""
    },
    e_change (e) {
      this.innerValue = (e && e.target.value) || ""
    },
    e_blur (e) {
      this.innerValue = (e && e.target.value) || ""
    },
    e_focus (e) {
    },
    onValidate () {
      if (this.rules) {
        // rules 是表单规则，无规则则不触发验证
        this.validator.validate(this.name, this.innerValue).then(res => {
          if (res === true) {
            this.$emit('formValid', this.innerModel())
          }
        }).catch((e) => {
          // this.$emit('formError', this.innerModel)
        })
      }
      // 针对input事件做节流
      if (this.__eventType === 'input') {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$emit('formChange', this.innerModel())
        }, 350)
      } else {
        this.$emit('formChange', this.innerModel())
      }
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
      this.onValidate()
    }
  }
}
