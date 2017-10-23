<!--
      descript: title- 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- title 类型 -->
  <div class="head">
    <div class="baseBoxLeft">
      <slot name="label"></slot>
      <div class="msg">{{label}}</div>
    </div>
    <div class="baseBoxright">
      <slot name="val"></slot>
      <div class="msg">{{value}}</div>
    </div>
  </div>
  <!-- title 类型 -->
</template>
<script>
import formMixin from '../mixins/form-mixin'

export default {
  name: 'title-item',
  mixins: [formMixin],
  props: ['rules', 'value', 'name', 'label'],
  computed: {
    $rules: {
      get () {
        return this.rules
      },
      set (val) {
        return val
      }
    },
    innerValue () {
      return this.value
    }
  },
  methods: {
    onChange (e) {
      this.$emit('formChange', e)
    },
    onVlid (e) {
      this.$emit('formValid', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .head {
    min-height: rem-calc(45);
    line-height: rem-calc(45);
    @include borderbottom-1px(#efefef);
    font-size: rem-calc(30/2px);
    background-color: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    display:flex;
    &:before {
      position: absolute;
      top: 28%;
      content: ' ';
      display: block;
      border-left: rem-calc(2.5) solid #00b0ff;
      height: rem-calc(15px);
    }
    .msg{
      padding-left:rem-calc(10);
    }
    .baseBoxLeft{
      font-size: rem-calc(15px);
    }
    .baseBoxright{
      flex:1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .txt {
      padding-right: rem-calc(15);
      font-size: rem-calc(15);
    }
  }
</style>
