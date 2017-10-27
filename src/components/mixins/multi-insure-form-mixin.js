/**
 mix 组件
 auth: jankergg
 desc: 一些表单通用方法
 */
// import {ENROLL_INTERSET} from '@/api'
export default {
  data () {
    return {
      errorMsg: null,
      form: [],
      formErrors: [],
      defaultModel: null,
      formStatus: {},
      isValid: false,
      modQueue: [], // 如果有一个队列需要初始化
      options: {}
    }
  },
  watch: {
    formErrors: {
      deep: true,
      handler () {
        this.validate()
      }
    }
  },
  methods: {
    addForm (idx, name, mod) {
      let demod = mod || JSON.parse(this.defaultModel)
      if (!demod) return
      this.$set(this.formMods, idx, {
        ...demod
      })
    },
    updateForm (val) {
      this.formStatus[val.index] = val.status
      this.$set(this.form, val.index, val.value)
      this.$set(this.formErrors, val.index, {msg: val.msg, isValid: val.isValid})
    },
    addOneForm () {
      let keys = Object.keys(this.formMods)
      let index = keys.length ? parseInt(keys[keys.length - 1]) + 1 : 0
      let mod
      if (this.modQueue.length) {
        mod = this.modQueue.shift(0)
      }
      this.addForm(index, name, mod)
    },
    addAllForm () {
      for (;this.modQueue.length;) {
        this.addOneForm()
      }
    },
    onDelted (val, index) {
      this.$delete(this.formMods, index)
      this.$delete(this.form, index)
      this.$delete(this.formErrors, index)
      this.$delete(this.formStatus, index)
      this.emit()
    },
    validate () {
      let _valid = Object.values(this.formErrors).find(item => item.isValid === false)
      this.isValid = !_valid
      if (_valid) {
        this.errorMsg = _valid.msg
      }
    },
    onChange (val) {
      this.updateForm(val)
      this.emit()
    },
    emit () {
      this.__bounce(200).do(() => {
        this.$emit('formChange', this.innerModel())
      })
    },
    innerModel () {
      let status = 'valid'
      for (let i in this.formStatus) {
        if (this.formStatus[i] === 'dirty') {
          status = 'dirty'
          break
        }
        if (this.formStatus[i] === 'empty') {
          status = 'empty'
          break
        }
      }
      return {
        name: 'insuranceInfo',
        value: this.__values(this.form),
        status: status,
        msg: this.isValid ? null : this.errorMsg,
        isValid: this.isValid
      }
    }
  }
}
