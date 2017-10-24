<!--********************************************************************
 * Author        : xangzhi
 * Filename      : input_policy.vue
 * Description   : 在线投保-投保书预览-录入投保单号
 * Time          : 2017/10/24
 *
********************************************************************-->
<template>
  <div class="page_applicant_input_policy">
    <div class="form">
      <form-unit
        :formModels="formModels"
        :formRules="formRules"
        @formChange="onChange"
        @formValid="onValid">
      </form-unit>
    </div>
    <div class="btn-wrapper">
      <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
      <div class="next-step">保存</div>
    </div>
  </div>
</template>

<script>
  import formUnit from '@/components/unit/form-unit'
  import epMixin from '@/components/mixins/enroll-page-mixin'
  //  import {ENROLL_SUBMMIT, ENROLL_INTERSET, QUERY_DICT} from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  // models
  let formModels = {
    name: {
      value: "",
      name: 'name'
    },
    tel: {
      value: "",
      name: 'tel'
    }
  }
  let formRules = {
    name: {
      label: '投保单号：',
      type: 'input',
      rules: {
        vRules: '',
        placeholder: '请输入您的投保单号'
      }
    },
    tel: {
      label: '投保日期：',
      type: 'input',
      rules: {
        vRules: '',
        placeholder: '请输入您的投保日期'
        // errorMsg: errorMsg.tel
      }
    }
  }
  export default {
    name: 'input_policy',
    components: {
      formUnit,
      defaultBtn
    },
    mixins: [epMixin],
    data () {
      window.info = this
      return {
        formModels: formModels,
        formRules: formRules,
        options: {
          editStep: '1'
        }
      }
    },
    methods: {
      nextStep () {
        if (!this.isValid) {
          this.__toast(this.formErrors[0].msg)
        } else {}
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .page_applicant_input_policy {
    .form {
      .baseBoxLeft {
        label {
          padding-right: rem-calc(15);
        }
      }
      .baseBoxright {
        input {
          text-align: left;

          &::-webkit-input-placeholder {
            text-align: left;
          }
        }
      }
    }
  }
</style>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .page_applicant_input_policy {
    background-color: #f7f7f7;
    @include fullpage;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: rem-calc(15);
    .form {
      position: relative;
      background-color: #fff;
      list-style: none;
      padding: 0 rem-calc(15);
      margin-bottom: rem-calc(15);
    }
    .btn-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: rem-calc(25) 0 0 0;
      display: flex;
      line-height: rem-calc(50);
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: rem-calc(18);
      .next-step {
        flex: 1;
        background: #00a4ff;
        color: #fff;
      }
    }
  }

</style>
