<!--
      descript: native 省市区 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <div class="native-select-box" @click="nativeAddr">
    <span type="text" class="input arrow_icon2 input_padding" v-if="innerValue.province">
      {{innerValue.provinceDesc}} / {{innerValue.cityDesc}} / {{innerValue.districtDesc}}
    </span>
    <span type="text" class="input arrow_icon2 input_padding" v-else>省 / 市 / 县</span>
  </div>
  <!-- <x-address :title="" :list="list" placeholder="省 / 市 / 县" v-model="inne"></x-address> -->
</template>
<script>
  import formMixin from '../mixin/form-mixin'
  // import { Group, XAddress, ChinaAddressV3Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'

  export default {
    name: 'native-select-item',
    mixins: [formMixin],
    data () {
      return {
        innerValue: this.value,
        innerErrors: null,
        innerValid: null,
        // addressData: ChinaAddressV3Data,
        list: []

      }
    },
    created () {
    },
    props: ['rules', 'value', 'name'],
    watch: {
      value (v) {
        this.innerValue = v
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
      innerModel () {
        return {
          name: this.name,
          value: this.innerValue,
          msg: this.errorMsg,
          isValid: this.innerValue.province
        }
      },
      errorMsg () {
        return this.innerValue.province ? null : (this.$rules.placeholder || '请选择省、市、区')
      },
      isValid () {
        return this.innerValid
      }
    },
    methods: {
      onChange (e) {
        this.$emit('formChange', this.innerModel)
      },
      onVlid () {},
      nativeAddr () {
        window.callAddress().then(success => {
          const address = JSON.parse(success)
          // console.log(address)
          this.innerValue.province = address.province.split(';')[0]
          this.innerValue.provinceDesc = address.province.split(';')[1]
          this.innerValue.district = address.district.split(';')[0]
          this.innerValue.districtDesc = address.district.split(';')[1]
          this.innerValue.city = address.city.split(';')[0]
          this.innerValue.cityDesc = address.city.split(';')[1]
          // console.log(this.innerValue)
        }, fail => {
          console.log('呼叫app地址失败')
        }).catch(e => {
          console.log('呼叫app地址出错')
          throw new Error(e)
        })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .native-select-box{
    display:flex;
    padding-right:rem-calc(15);
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
