/**
 mix 组件
 auth: jankergg
 desc: 多表单页面通用方法
 */

export default {
  data () {
    return {
      errorMsg: null,
      form: [],
      formErrors: [],
      defaultModle: null,
      formStatus: '',
      mutiFormStatus: '',
      modQueue: [] // 如果有一个队列需要初始化
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
    onChange (val) {
      this.updateForm(val)
    },
    addForm (idx, name, mod) {
      let demod = JSON.parse(this.defaultModle)
      if (!demod) return
      this.__reset(demod.formModels)
      // 如果给定数据的情况下，按数据渲染新条目
      if (mod) {
        demod.formModels = mod
      }
      this.$set(this.formMods, idx, {
        ...demod,
        ...this.addMeta(idx, name)
      })
      this.updateTitle()
    },
    addMeta (idx, name) {
      if (!this.titleConfig) {
        return {}
      }
      return {
        name: '' + (name || idx),
        index: idx,
        titleConfig: this.__obj(this.titleConfig(idx))
      }
    },
    updateForm (val) {
      this.formStatus = val.status
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
    onDelted (val) {
      this.$delete(this.formMods, val.index || 0)
      this.$delete(this.form, val.index || 0)
      this.$delete(this.formErrors, val.index || 0)
      console.log(this.formMods)
      this.updateTitle()
    },
    updateTitle () {
      if (!this.titleConfig) return
      let index = 0
      for (let i in this.formMods) {
        this.formMods[i].titleConfig = this.__obj(this.titleConfig(index))
        index += 1
      }
    },
    validate () {
      let _valid = Object.values(this.formErrors).find(item => item.isValid === false)
      this.isValid = !_valid
      if (_valid) {
        this.errorMsg = _valid.msg
      }
    }
  }
}
