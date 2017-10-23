<!--
      descript: native 省市区 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <group class="web-select-box">
    <x-address :title="''" raw-value :list="list" placeholder="省 / 市 / 县" v-model="innerValue"></x-address>
  </group>
</template>
<script>
  import { Group, XAddress, Value2nameFilter as value2name } from 'vux'
  import formMixin from '../mixins/form-mixin'

  export default {
    name: 'web-select-item',
    mixins: [formMixin],
    components: {
      Group, XAddress
    },
    data () {
      return {
        innerValue: this.modelValue,
        innerErrors: null,
        innerValid: null,
        rawText: '',
        list: []
      }
    },
    created () {
      window.v2n = value2name
      let datas = require('./types/area')
      this.list = JSON.parse(datas.areaData.data)
    },
    props: ['rules', 'value', 'name'],
    watch: {
      value (v) {
        if (!v || !v.length) {
          return
        }
        this.modelValue = v
      },
      innerValue (v) {
        this.$nextTick(() => {
          this.rawText = this.$el.querySelector('.vux-popup-picker-value')
          if (this.rawText) {
            this.rawText = this.rawText.innerText.split(' ').join('/')
            setTimeout(() => {
              this.$el.querySelector('.vux-popup-picker-value').innerText = this.rawText
            })
          }
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
          } else if (typeof this.value === 'string' && this.value !== '') {
            v = this.value.split('/')
          } else {
            v = this.value
          }
          return v
        },
        set (val) {
          let v = val
          if (!v) {
            v = []
          } else if (typeof v === 'string') {
            v = v.split('/')
          }
          this.innerValue = this.__obj(v)
        }
      },
      innerModel () {
        return {
          name: this.name,
          value: this.innerValue ? this.rawText : '',
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
