 <!--
      descript: input 组件
        author: jankergg
        param: props
        example:
        <iform></iform>
        2017.9.9 modified by rickyshin
        add attr for type of number {
          type, min, max
        }
-->
<template>
  <input
    class="rootInput"
    @input="onInput"
    :placeholder="rules.placeholder"
    :maxlength="rules.maxlength"
    :value="innerValue"
    :name="name"
    :class="{'is-danger': errorMsg()}"
    :readonly="rules.readOnly"
    :disabled="rules.disabled" />
</template>
<script>
  import formMixin from '../mixin/rootInput-mixin'

  export default {
    name: 'root-input',
    mixins: [formMixin]
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';

  input {
    /*font-size: rem-calc(15);*/
    /*text-align: right;*/
    /*color: #333;*/
    /*outline: none;*/

    /*flex: 1;*/
    /*font-size: rem-calc(15px);*/
    /*border: 0;*/
    /*outline: none;*/
    /*-webkit-appearance: none;*/
    /*text-align: right;*/
    /*color: #333;*/
    /*& > a {*/
      /*text-decoration: none;*/
    /*}*/
  }

  input::-webkit-input-placeholder {
    font-size: rem-calc(15px);
    color: #ccc;
    text-align: right;
  }

  .rootInput {
    flex: 1;
    display: flex;
    font-size: rem-calc(15);
    margin: 0 0 rem-calc(3) 0;
    padding-right: rem-calc(15);
    border: 0;
    outline: none;
    -webkit-appearance: none;
    text-align: right;
    color: #333;
    & > a {
      text-decoration: none;
    }
  }
</style>
