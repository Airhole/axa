<!--
      descript: native 省市区 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <group class="web-select-box">
    <x-address :title="''" :list="list" placeholder="省 / 市 / 县" v-model="innerValue"></x-address>
  </group>
</template>
<script>
  import { Group, XAddress } from 'vux'

  export default {
    name: 'web-select-item',
    components: {
      Group, XAddress
    },
    data () {
      return {
        innerValue: this.modelValue,
        innerErrors: null,
        innerValid: null,
        originValue: [],
        originName: [],
        rawText: '',
        list: []
      }
    },
    created () {
      if (!window.__select_area_data) {
        let datas = require('./types/area')
        window.__select_area_data = JSON.parse(datas.areaData.data)
      }
      this.list = window.__select_area_data
    },
    props: ['rules', 'value', 'name'],
    watch: {
      value (v) {
        this.modelValue = v
        // console.warn('select:::', v)
      },
      innerValue (v) {
        this.$nextTick(() => {
          this.rawText = this.$el.querySelector('.vux-popup-picker-value')
          if (this.rawText) {
            this.rawText = this.rawText.innerText.split(' ').join('/')
            setTimeout(() => {
              let _dom = this.$el.querySelector('.vux-popup-picker-value')
              _dom && (_dom.innerText = this.rawText)
            })
          }
          // console.warn('innerValue:::', this.__str(this.innerModel))
          this.$emit('formChange', this.innerModel)
        })
      }
    },
    computed: {
      $rules: {
        get () {
          return this.rules
        },
        set (val) {
          return val
        }
      },
      modelValue: {
        get () {
          let v
          if (!this.value) {
            v = []
          } else if (typeof this.value === 'string') {
            v = v.split('/')
          } else if (Array.isArray(this.value)) {
            v = this.value
          } else {
            if (this.value && this.value.entry_province && this.value.entry_province.value) {
              v = [this.value.entry_province.value, this.value.entry_city.value, this.value.entry_district.value]
            } else {
              v = []
            }
          }
          return v
        },
        set (val) {
          let v = val
          if (!v) {
            return
          } else if (typeof v === 'string') {
            v = v.split('/')
          } else if (Array.isArray(v)) {
          } else {
            if (v && v.entry_province && v.entry_province.value) {
              v = [v.entry_province.value, v.entry_city.value, v.entry_district.value]
            } else {
              return
            }
          }
          this.innerValue = v
        }
      },
      innerModel () {
        let _address = {
          entry_province: {
            value: '',
            name: ''
          },
          entry_city: {
            value: '',
            name: ''
          },
          entry_district: {
            value: '',
            name: ''
          },
          detail: ''
        }
        let _value = this.innerValue
        if (_value.length && this.list.length) {
          let p = this.list.find(i => i.value == _value[0])
          _address.entry_province.name = p ? p.name : ''
          _address.entry_province.value = _value[0]
          let c = this.list.find(i => i.value == _value[1])
          _address.entry_city.name = c ? c.name : ''
          _address.entry_city.value = _value[1]
          let d = this.list.find(i => i.value == _value[2])
          _address.entry_district.name = d ? d.name : ''
          _address.entry_district.value = _value[2]
        }
        // console.error(this.__str(_value), this.__str(_address))
        return {
          name: this.name,
          value: this.__clone(_address),
          msg: this.errorMsg,
          isValid: !!(this.innerValue && this.innerValue.length)
        }
      },
      errorMsg () {
        return this.innerValue && this.innerValue.length ? null : (this.$rules.placeholder || '请选择省、市、区')
      }
    },
    methods: {
      init () {
        this.innerValue = this.modelValue
        // window['s' + this.name] = this
      },
      onShow (e) {
        // console.log('show::', e)
      },
      onChange (e) {
        // console.log('change', e, this.innerValue)
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .web-select-box{
    .vux-cell-box:before,.weui-cells:before,.weui-cells:after,.weui-cells:before{display:none;}
    .vux-no-group-title{margin-top:rem-calc(10.5);}
    .weui-cell{padding-top:0;padding-bottom:0;font-size:rem-calc(15);}
  }
</style>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .web-select-box{
    display:flex;
    height:100%;
    .input {
      flex: 1;
      font-size: rem-calc(15);
      border: 0;
      outline: none;
      -webkit-appearance: none;
      text-align: right;
      color: #333;
      & > a {
        text-decoration: none;
      }
    }
    .input_padding {
      padding-right: rem-calc(15);
    }
  }
</style>
