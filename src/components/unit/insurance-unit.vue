<template>
  <div class="form-unit">
    <slot name="unit-title" :order="order"></slot>

    <template v-for="(value, key, index) in $formRules" v-if="$formModels && $formRules">
      <form-row
        :key="key"
        :index="index"
        :formModel="$formModels[key]"
        :formRule="value"
        :name="key"
        @formChange="onChange">
      </form-row>
    </template>

    <slot name="unit-foot" :order="order">
      <div class="pre-step">首年保费：<span>666.00元</span></div>
    </slot>
  </div>
</template>

<script>
import formRow from '../items/form-row'
import formUnitMixin from '../mixins/form-unit-mixin'

export default {
  name: 'insurance-unit',
  mixins: [formUnitMixin],
  data () {
    return {
      Models: null,
      Rules: null
    }
  },
  props: ["insItem", "order"],
  methods: {
    init () {
      if (this.insItem && this.insItem.paramList) {
        // 创建rules,modles
        let _rules = {}
        let _modles = {}

        this.insItem.paramList.forEach(item => {
          try {
            _rules[item.key] = {
              label: item.label,
              type: item.inputType,
              rules: {
                vRules: 'required',
                disabled: !item.canEdit,
                showName: true
              }
            }
            // 如果是select
            if (item.inputType === 'select') {
              let lst = item.itemList.map(i => {
                return {name: i.value, value: i.key}
              })
              _rules[item.key].rules.options = [lst]
            }
            // 如果是input
            if (item.inputType === 'input') {
              _rules[item.key].rules.placeholder = '请填写' + item.label
            }
            // 构造 models
            _modles[item.key] = {
              name: item.key,
              value: item.value || ''
            }
          } catch (e) {
            alert(e)
          }
        })

        this.Rules = _rules
        this.Models = _modles
      }
    }
  },
  computed: {
    $formModels () {
      return this.Models
    },
    $formRules () {
      return this.Rules
    }
  },
  watch: {
    insItem: {
      deep: true,
      handler () {
      }
    }
  },
  components: {
    formRow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .form-unit {
    .head {
      position: relative;
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
      .act-btn{
        position: absolute;
        right: rem-calc(10);
        display: inline-block;
        width: rem-calc(91/2px);
        height: rem-calc(91/2px);
        -webkit-background-size: cover;
        background-size: 40%;
        text-indent: -999em;
        overflow: hidden;
      }
      .add-unit {
        background: url('~@/assets/image/enroll/add.png') no-repeat center center
      }
      .delete-unit {
        background: url('~@/assets/image/enroll/trash.png') no-repeat center center
      }
    }
    .pre-step{
      text-align:right;
      padding:rem-calc(15);
    }
    .relative {
      position: relative;
      /*background-color: #f7f7f7;*/
      @include borderbottom-1px(#000);
      overflow: hidden;
      height: rem-calc(91/2px);
      line-height: rem-calc(91/2px);
      box-sizing: border-box;
      padding-right: rem-calc(15);
      margin-left: rem-calc(15);
      .msg {
        float: left;
        font-size: rem-calc(30/2px);
        color: #666;
      }
    }
  }
</style>
