<!--********************************************************************
 * Author     : xiangzhi
 * Email      :
 * Last modified  : 2017-10-25 13:35
 * Filename     : pay_insurance.vue
 * Description    :  在线投保-投保书预览-手工单录入结果

********************************************************************-->
<template>
  <div class="pay_insurance">
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
      <div class="pre-step">付款金额:</div>
      <div class="next-step" @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
  import formUnit from '@/components/unit/form-unit'
  import epMixin from '@/components/mixins/enroll-page-mixin'
  //  import {ENROLL_SUBMMIT, ENROLL_INTERSET, QUERY_DICT} from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'
  import rootInput from "@/components/root-items/root-input"

  // models
  let formModels = {
    bank: {
      value: "",
      name: "bank"
    },
    name: {
      value: "",
      name: "name"
    },
    account: {
      value: "",
      name: "account"
    }
  }
  let formRules = {
    bank: {
      label: '开户行',
      type: 'select',
      rules: {
        vRules: 'required',
        placeholder: '请输入开户行',
        name: 'bankcode'
        // options: [dict.core_bank_code]
        // errorMsg: errorMsg.bank
      }
    },
    name: {
      label: '姓名',
      type: 'input',
      rules: {
        vRules: 'required|username|checkUser|usernameLength',
        placeholder: '请输入您的姓名'
      }
    },
    account: {
      label: '账号',
      type: "input-camera",
      rules: {
        vRules: 'required|bankcard',
        placeholder: '请输入银行账号'
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
        this.$router.push({name: 'insurance_upload_insurance'})
        if (!this.isValid) {
          this.__toast(this.formErrors[0].msg)
        } else {}
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .pay_insurance {
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
      .pre-step {
        flex: 2;
        // color: #20aee5;
        background: #fff;
      }
      .next-step {
        flex: 1;
        background: #00a4ff;
        color: #fff;
      }
    }
  }

</style>
