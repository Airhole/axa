<!--
      descript: select 行组件
        author: jankergg
        param: props
-->
<template>
  <div class="root-select">
    <group>
      <popup-picker
        :title="title"
        :data="rules.options"
        v-model="innerValue"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        :readonly="readonly"
        :placeholder="rules.placeholder"
      ></popup-picker>
    </group>
  </div>
</template>
<script>
  import {Group, PopupPicker, Picker} from 'vux'
  import formMixin from '../mixin/form-mixin'

  export default {
    mixins: [formMixin],
    data () {
      return {
        innerValue: this.modelValue
      }
    },
    props: {
      // 标题
      title: String,
      // 值
      value: [Array, String],
      // 表单名
      name: String,
      // 是否可编辑
      readonly: Boolean,
      rules: Object
    },
    watch: {
      value (v) {
        if (!v || !v.length) {
          return
        }
        this.modelValue = v
      },
      innerValue (v) {
        this.$nextTick(() => {
          this.$emit('formChange', this.innerModel)
        })
      }
    },
    computed: {
      modelValue: {
        get () {
          let v
          if (!this.value) {
            v = []
          } else if (typeof this.value === 'string') {
            v = this.value.split('/')
          } else {
            v = this.value
          }
          return v
        },
        set (v) {
          if (!v) {
            v = []
          } else if (typeof v === 'string') {
            v = v.split('/')
          }
          this.innerValue = v
        }
      },
      isValid () {
        if (!this.rules.vRules || this.rules.vRules.indexOf('required') == -1) {
          return true
        }
        return this.innerValue && !!this.innerValue.length && !!this.innerValue.join()
      },
      innerModel () {
        return {
          name: this.name,
          value: this.innerValue.join('/'),
          msg: this.isValid ? null : this.rules.errorMsg || this.rules.placeholder,
          isValid: this.isValid
        }
      }
    },
    methods: {
      init () {
        this.innerValue = this.modelValue
      },
      onShow () { },
      onHide (v) { },
      onChange (v) {
        this.innerValue = v
      }
    },
    components: {
      Group, PopupPicker, Picker
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .root-select {
    .weui-cells:before, .weui-cells:after, .vux-cell-box:before, .vux-cell-box:after {
      display: none;
    }
    .weui-cells {
      margin-top: rem-calc(-2px);
      line-height: inherit;
      .weui-cell {
        padding: 0 rem-calc(15);
        font-size: rem-calc(15);
        white-space: nowrap;
      }
    }
  }
</style>
