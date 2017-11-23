<!--
      descript: input-btn 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <div class="address-box">
    <!-- select 地址 -->
    <div class="baseBox">
      <div class="main">
        <div class="baseBoxLeft"> <label class="input-label">{{configs.label}}</label></div>
        <div class="baseBoxright">
          <web-select-item
          @formChange="onChange"
          :rules="rules"
          :value="selected"
          :name="name">
          </web-select-item>
      </div>
      </div>
    </div>
    <!-- input 详细地址 -->
    <div class="baseBox">
      <div class="main">
        <div class="baseBoxLeft"> <label class="input-label">{{rules.detail.label}}</label></div>
        <div class="baseBoxright">
          <input-btn-item
          @formChange="onChangeDetail"
          @emission="onEmission"
          :rules="rules.detail.rules"
          :value="detail"
          :name="name">
          </input-btn-item>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import inputBtnItem from './input-btn-item'
import webSelectItem from './web-select-item'

export default {
  name: 'address-item',
  data () {
    return {
      innerErrors: null,
      selected: this.innerValue,
      sResult: null,
      sError: '',
      sValid: false,
      detail: this.innerValue ? this.innerValue.detail : '',
      dError: '',
      dValid: false
    }
  },
  props: ['rules', 'value', 'name', 'configs'],
  watch: {
    value (v) {
      this.innerValue = v
    }
  },
  computed: {
    innerValue: {
      get () {
        let v = this.value
        if (!v) {
          return {detail: ''}
        }
        return this.value
      },
      set (v) {
        if (!v) v = {}
        if (v.detail) {
          this.detail = v.detail
        }
        this.selected = v
      }
    }
  },
  methods: {
    init () {
      this.selected = this.innerValue
      this.detail = this.innerValue ? this.innerValue.detail : ''
      if (this.rules.detail && this.rules.detail.rules.showExtBtn) {
        if (this.rules.detail.type !== 'input-btn') {
          alert('type 类型应为 input-btn')
        }
      }
    },
    onChange (e) {
      this.sResult = e.value
      this.sError = e.msg
      this.sValid = e.isValid
      this.emit()
    },
    onChangeDetail (e) {
      this.detail = e.value
      this.dError = e.msg
      this.dValid = e.isValid
      this.emit()
    },
    onVlid (e) {
      this.$emit('formValid', e)
    },
    emit () {
      this.$nextTick(() => {
        let im = this.innerModel()
        this.$emit('formChange', im)
      })
    },
    onEmission (v) {
      // missionTarget: 通知父组件需要更新哪个字段
      this.$emit('emission', v)
    },
    innerModel () {
      let _v = this.__clone(this.sResult || {})
      _v.detail = this.detail
      let _valid = this.sValid && this.dValid
      return {
        name: this.name,
        msg: _valid ? null : (this.sError || this.dError),
        isValid: _valid,
        value: _v
      }
    }
  },
  components: {
    inputBtnItem,
    webSelectItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .address-box {
    height:100%;
  }
</style>
