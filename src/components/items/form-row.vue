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
  <div class="form-row">
    <root-item :overRide="$formRule.overRide" :name="name" :rule="$formRule">
      <!-- 覆盖默认表单 -->
      <template v-if="$formRule.overRide">
        <template :slot="name">
          <slot :name="name"></slot>
        </template>
      </template>
      <template v-else-if="$formRule.type=='block'||$formRule.type=='title'">
        <template :slot="name">
          <slot :name="name"></slot>
          <slot>
            <div class="head"><div class="msg">{{$formRule.label}}</div></div>
          </slot>
        </template>
      </template>
      <!-- 默认的表单类型 -->
      <template v-else>
        <template slot="label" v-if="$formRule.label"><label class="input-label">{{$formRule.label}}</label></template>
        <template slot="val" v-if="$formRule.type">
          <!-- input 类型 -->
          <root-input
            v-if="$formRule.type=='input'"
            @formChange="onChange"
            @formPassed="onVlid"
            :rules="$formRule.rules"
            :value="$formModel.value"
            :name="name">
          </root-input>
          <!-- input 类型 -->

          <!-- select 类型 -->
          <root-select
            v-if="$formRule.type=='select'"
            @formChange="onChange"
            @formPassed="onVlid"
            :rules="$formRule.rules"
            :value="$formModel.value"
            :name="name">
          </root-select>
          <web-select-item
            v-if="$formRule.type=='web-select'"
            @formChange="onChange"
            @formPassed="onVlid"
            :rules="$formRule.rules"
            :value="$formModel.value"
            :name="name">
          </web-select-item>
          <!-- select 类型 -->

          <!-- 性别 -->
          <sex-item
            v-if="$formRule.type=='sex'"
            @formChange="onChange"
            :rules="$formRule.rules"
            :value="$formModel.value"
            :name="name">
          </sex-item>
          <!-- 性别 -->

          <!-- 日期 -->
          <time-item
            v-if="$formRule.type=='time'"
            @formChange="onChange"
            :rules="$formRule.rules"
            :value="$formModel.value"
            :name="name">
          </time-item>
          <!-- 日期 -->

          <!-- input-camera 类型 -->
          <!--<input-camera-item-->
            <!--v-if="$formRule.type=='input-camera'"-->
            <!--@formChange="onChange"-->
            <!--@formPassed="onVlid"-->
            <!--:rules="$formRule.rules"-->
            <!--:value="$formModel.value"-->
            <!--:name="name">-->
          <!--</input-camera-item>-->
          <!-- input-camera 类型 -->

          <!-- input-txt 类型 -->
          <input-txt-item
            v-if="$formRule.type=='input-txt'"
            @formChange="onChange"
            @formPassed="onVlid"
            :rules="$formRule.rules"
            :value="$formModel.value"
            :name="name">
          </input-txt-item>
          <!-- input-txt 类型 -->

          <!-- yesorno 类型 -->
          <yesorno-item
            v-if="$formRule.type=='yesorno'"
            @formChange="onChange"
            @formPassed="onVlid"
            :rules="$formRule.rules"
            :value="$formModel.value"
            :name="name">
          </yesorno-item>
          <!-- yesorno 类型 -->
        </template>
      </template>
    </root-item>
  </div>
</template>

<script>
  import rootItem from '../root-items/root-base'
  import rootSelect from '../root-items/root-select'
  import rootInput from '../root-items/root-input'
  import webSelectItem from './web-select-item'
  import sexItem from './sex-item'
  import timeItem from './time-item'
//  import inputCameraItem from './input-camera-item'
  import yesornoItem from "./yesorno-item"
  import inputTxtItem from './input-txt-item'
  import formMixin from "../mixins/form-mixin"

  export default {
    name: 'form-row',
    mixins: [formMixin],
    components: {
      rootItem,
      rootSelect,
      rootInput,
      sexItem,
      // inputCameraItem,
      inputTxtItem,
      timeItem,
      webSelectItem,
      yesornoItem
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
      index: [Number, String],
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
      onVlid (val) {
        this.$emit('formValid', val)
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
  .form-row {
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
      /*width: rem-calc(100);*/
      display: block;
      /*padding-left: rem-calc(15);*/
    }
  }
</style>
