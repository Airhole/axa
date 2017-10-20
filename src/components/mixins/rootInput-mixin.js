import {Validator} from 'vee-validate'
import formMixin from './form-mixin'

export default {
  mixins: [formMixin],
  data () {
    return {
      innerValue: this.value
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
      this.onValidate()
    },
    onInput (e) {
      this.innerValue = e.target.value || ""
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
      this.$emit('formChange', this.innerModel())
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
