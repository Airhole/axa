<template>
  <div class="form-unit">
    <template v-for="(value, key, index) in $formRules" v-if="$formModels[key]">
      <form-row
        :key="key"
        :index="index"
        :formModel="$formModels[key]"
        :formRule="value"
        :name="key"
        @formChange="onChange">
      </form-row>
    </template>
    <div class="pre-step">首年保费：<span>666.00元</span></div>
  </div>
</template>

<script>
import formRow from '../items/form-row'
import formUnitMixin from '../mixins/form-unit-mixin'

export default {
  name: 'insurance-unit',
  mixins: [formUnitMixin],
  props: ['insItem'],
  mounted () {
    window.xx = this
  },
  computed: {
    $formRules () {

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
      .delete-unit {
        position: absolute;
        right: 0;
        display: inline-block;
        width: rem-calc(91/2px);
        height: rem-calc(91/2px);
        background: url('~@/assets/image/enroll/trash.png') no-repeat;
        -webkit-background-size: cover;
        background-size: 40%;
        background-position: center center;
      }
    }
    .pre-step{
      text-align:right;
      padding-right:rem-calc(15);
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
      .delete-unit {
        position: absolute;
        right: 0;
        display: inline-block;
        width: rem-calc(91/2px);
        height: rem-calc(91/2px);
        background: url('~@/assets/image/enroll/trash.png') no-repeat;
        -webkit-background-size: cover;
        background-size: 40%;
        background-position: center center;
      }
    }
  }
</style>
