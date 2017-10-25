<template>
  <div class="page_applicant-info">
    <!-- 投被保人信息 -->
    <div class="form">
      <form-unit
        :formModels="formModels"
        :formRules="formRules"
        @formChange="onChange"
        @formValid="onValid">
      </form-unit>
    </div>
    <!-- 投被保人信息 -->
    <div class="btn-wrapper">
      <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
      <div class="pre-step">首年保费合计：<span>666.00元</span></div>
      <div class="next-step" @click="nextStep">生成计划书</div>
    </div>
  </div>
</template>

<script>
  import formUnit from '@/components/unit/form-unit'
  import epMixin from '@/components/mixins/enroll-page-mixin'
  //  import {ENROLL_SUBMMIT, ENROLL_INTERSET, QUERY_DICT} from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  // models
  import formModels from './models/import-client-info-model'
  import formRules from './models/import-client-info-rule'

  const ENROLL_SUBMMIT = ''
  const ENROLL_INTERSET = ''
  const QUERY_DICT = ''
  export default {
    name: 'baseInfo',
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
        } else {
          this.__toast('提交成功！')
        }
      },
      // 验证身份证和性别，身份证和出生日期是否符合
      validIdCardBirthdaySex () {
        let idCardVal = this.form.idCardNo.value
        let birthday = this.form.birthday.value
        let sex = this.form.sex.value
        let birthFromIdCard = idCardVal.split('').splice(6, 8).join('')
        let birthFromBirth = birthday.split('-').join('')
        let sexFromIdCard = idCardVal.split('').splice(16, 1).join('')
        let sexFlag = sexFromIdCard % 2 === 0 ? 'F' : 'M'
        if (sex !== sexFlag) {
          this.__toast('性别和身份证不符')
          return false
        } else if (birthFromBirth !== birthFromIdCard) {
          this.__toast('出生日期和身份证不符')
          return false
        } else {
          return true
        }
      },
      getData () {
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .page_applicant-info {
    @include fullpage;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .form {
      margin: 0 0 rem-calc(50) 0;
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
      font-size: rem-calc(16);
      border-top: 1px solid #e9e9e9;
      .pre-step {
        flex: 3;
        color: #666;
        background: #fff;
        span {
          color: #20aee5;
        }
      }
      .next-step {
        flex: 2;
        background: #20aee5;
        color: #fff;
      }
    }
  }

</style>
