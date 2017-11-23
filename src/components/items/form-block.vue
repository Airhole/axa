<!--
      descript: input-row 组件
      note: 新表单类型需要先在该组件注册
        author: jankergg
        param: props {
          formModels // 表单值 数据结构
          formRules // 表单初始化属性，包含name/type/验证规则等等
        }
        example:
        <root-input
          v-if="$formRules[item.name].rules.type=='input'"
          @formChange="onChange"
          @formPassed="onVlid"
          :rules="$formRules[item.name].rules"
          :value="item.value"
          :name="item.name">
        </root-input>
-->
<template>
<div class="form-block">
    <div class="main nonflex">
    <!-- 覆盖默认表单 -->
    <template v-if="$formRule.overRide">
      <template :slot="name">
        <slot :name="name"></slot>
      </template>
    </template>
    <!-- 默认的表单类型 -->
    <template v-else>
        <template v-if="$formRule.type">
        <slot :name="name">
          <!-- 标题 类型 -->
          <title-item
          v-if="$formRule.type=='title'"
          :label="$formRule.label"
          :rules="$formRule.rules"
          :value="$formModel.value"
          :name="$formModel.name"
          ></title-item>
          <!-- 标题 类型 -->
          <!-- checker 类型 -->
          <root-checker
          v-if="$formRule.type=='checker'"
          @formChange="onChange"
          @emission="onEmission"
          :rules="$formRule.rules"
          :value="$formModel.value"
          :name="$formModel.name"
          ></root-checker>
          <!-- checker 类型 -->

          <!-- textarea-类型 -->
          <textarea-item
          v-if="$formRule.type=='textarea'"
          @formChange="onChange"
          @emission="onEmission"
          @onEvent="evtHandler"
          :rules="$formRule.rules"
          :value="$formModel.value"
          :name="$formModel.name"
          ></textarea-item>
          <!-- textarea-类型 -->

          <!-- checker-block 类型 -->
          <check-block-item
          v-if="$formRule.type=='check-block'"
          @formChange="onChange"
          @emission="onEmission"
          :rules="$formRule"
          :value="$formModel.value"
          :name="$formModel.name"
          ></check-block-item>
          <!-- checker-block 类型 -->

          <!-- address 类型 -->
          <address-item
            v-if="$formRule.type=='address'"
            @formChange="onChange"
            @emission="onEmission"
            :configs="$formRule"
            :rules="$formRule.rules"
            :value="$formModel.value"
            :name="name">
          </address-item>
          <!-- address 类型 -->
        </slot>
        </template>
    </template>
  </div>
</div>
</template>

<script>
  import rootChecker from "../root-items/root-checker"
  import textareaItem from "./textarea-item"
  import titleItem from "./title-item"
  import checkBlockItem from "./check-block-item"
  import addressItem from './address-item'

  export default {
    name: 'form-block',
    components: {
      textareaItem,
      rootChecker,
      titleItem,
      checkBlockItem,
      addressItem
    },
    props: {
      formModel: {
        type: [Array, Object],
        default () {
          return {
            name: 'name',
            value: ''
          }
        }
      },
      formRule: {
        type: [Array, Object],
        default () {
          return {
            name: {
              label: 'input title',
              type: 'input',
              rules: {
                vRules: 'required|phonenum',
                placeholder: 'xxxxx'
              }
            }
          }
        }
      },
      name: {
        type: String
      }
    },
    computed: {
      $formModel () {
        return this.formModel
      },
      $formRule () {
        return this.formRule
      }
    },
    methods: {
      onChange (val) {
        this.$emit('formChange', val)
      },
      onEmission (val) {
        this.$emit('emission', val)
      },
      evtHandler (val) {
        this.$emit('onEvent', val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  input {
    outline: none;
  }
  input::-webkit-input-placeholder{
    font-size: rem-calc(30/2)
  }
  .form-block{
    margin: 0;
    padding: 0;
    list-style: none;
    min-height: rem-calc(45px);
    line-height: rem-calc(45px);
    vertical-align: middle;
    position: relative;
    font-size: rem-calc(16px);
    overflow: hidden;
    clear: both;
    /deep/
    .baseBox {
      box-sizing: border-box;
      padding-left:rem-calc(15);
      .line{
        background-image: none !important;
      }
      .title{
        padding-left:0 !important;
      }
      .main{
        min-height: rem-calc(45);
        line-height: rem-calc(45);
        padding-top:1px;
        padding-bottom:1px;
        @include borderbottom-1px(#efefef);
        display:flex;
        .baseBoxLeft{
          font-size: rem-calc(15px);
        }
        .baseBoxright{
          flex:1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .baseBoxright.atop{
          align-items: flex-start!important;
        }
      }
      .nonflex{
        display:block;
      }
    }
    .selectRelation {
      font-size: rem-calc(30/2px);
    }
    & > span:first-child {
      font-size: rem-calc(30/2px);
      color: #333;
    }
    .input_padding {
      padding-right: rem-calc(5px);
      font-size: rem-calc(15px);
      color: #999;
    }
    .disableblock {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 99;
    }
    .head {
      background-color: #f7f7f7;
      overflow: hidden;
      height: rem-calc(91/2px);
      line-height: rem-calc(91/2px);
      box-sizing: border-box;
      padding: 0px rem-calc(30/2px);
      .msg {
        float: left;
        font-size: rem-calc(30/2px);
        color: #666;
        &:before {
          content: "";
          display: inline-block;
          width: rem-calc(5/2px);
          height: rem-calc(32/2px);
          padding-left: rem-calc(16/2px);
          box-sizing: border-box;
          border-left: rem-calc(5/2px) solid #00b0ff;
          vertical-align: middle;
          margin-top: rem-calc(-2);
        }
      }
    }
    .input-label {
      width: rem-calc(100);
      display: block;
      /*padding-left: rem-calc(15);*/
    }
  }
</style>
