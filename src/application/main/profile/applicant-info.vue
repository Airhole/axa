<!--********************************************************************
 * Author        : rickyshin
 * Filename      : applicant-info.vue
 * Description   : 在线投保-投保人信息
 * Time          : 2017/10/25
 *
********************************************************************-->
<template>
  <div class="page_insurance-applicant-info">
    <!--<div class="tab">-->
      <!--<div class="applicant">-->
        <!--投保人信息-->
      <!--</div>-->
      <!--<div class="insured">-->
        <!--被保人信息-->
      <!--</div>-->
    <!--</div>-->
    <div class="form">
      <form-unit
        :formModels="formModels"
        :formRules="formRules"
        @formChange="onChange"
        @emission="onEmission">
      </form-unit>
      <div class="tips-bg">
        <div class="tips-wrapper">
          <div class="tips">
            <span class="icon" :class="{active: selected}" @click="changeAgreement"></span>
            <span class="view">本人已閱讀並同意
            <a href="#">『使用條款』</a>、
            <a href="#">『聲明』</a>、
            <a href="#">『保單條款』</a>、
            <a href="#">『條件和不保事項』</a>
            <a href="#">『私隱政策聲明』</a>
            以及
            <a href="#">『收集個人資料』</a>
          </span>
            <input class="hiddenInput" type="hidden" name="clause" v-validate
                   data-vv-as="请同意营销员声明" data-vv-rules="required">
          </div>
          <div class="tips">
            <span class="icon" :class="{active: selected}" @click="changeAgreement"></span>
            <span class="view">
            本人／我們不同意貴公司根據
            <a href="#">『收集個人資料的聲明』</a>
            使用和轉移本人／我們的個人資料作直接促銷用途（參閱「在直接促銷中使用及將其個人資料提供予其他人士」部份）及並不願意接收任何貴公司的推廣及直接促銷的材料。
          </span>
            <input class="hiddenInput" type="hidden" name="clause" v-validate
                   data-vv-as="请同意营销员声明" data-vv-rules="required">
          </div>
        </div>
      </div>
    </div>

    <div class="btn-wrapper">
      <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
      <div class="btn-wrapper">
        <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
        <div class="pre-step">需支付：<span>0.00&nbsp;</span>港元<label>（首月免費）</label></div>
        <div class="next-step" @click="nextStep">立即投保</div>
      </div>
    </div>
  </div>
</template>

<script>
  import formUnit from '@/components/unit/form-unit'
  //  import epMixin from '@/components/mixins/enroll-page-mixin'
  import { READ_APPLICANT_INFO, SAVE_APPLICANT_INFO, INSURE_LOAD_OR_CREATE_PLAN, CREATE_INSURE } from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  // models
  import formModels from './models/applicant-info-model'
  import formRules from './models/applicant-info-rule'

  export default {
    name: 'baseInfo',
    components: {
      formUnit,
      defaultBtn
    },
    // mixins: [epMixin],
    data () {
      return {
        formModels: this.__clone(formModels),
        formRules: this.__clone(formRules),
        options: {
          editStep: '1'
        },
        baseInfo: {},
        selected: false
      }
    },
    methods: {
      init () {
      },
      ready () {
        /**
        if (window.name) {
          this.loadApplicant(window.name)
        } else {
          this.axios.post(CREATE_INSURE, {engineProductId: "HQL00100", companyId: "hengqin"}).then(resp => {
            if (resp.data.success) {
              window.name = resp.data.value
              this.loadApplicant(resp.data.value)
            }
          })
        }
         */
      },
      changeAgreement () {
      },
      loadApplicant (insureId) {
        this.axios.post(READ_APPLICANT_INFO, {insureId: insureId}).then(res => {
          let result = res.data.value
          this.formModels = this.__fixInputName(res.data.value)
          this.baseInfo = {
            insureId: result.insureId,
            customerId: result.customerId,
            customerType: result.customerType,
            planId: result.planId
          }
        })
      },
      onChange (v) {
        // console.log('this.formModels++++', v)
        this.$emit('onChange', v)
      },
      onEmission (v) {
        // console.log('eeeeeee', v)
        if (v.value === true) {
          this.formModels.wechatNo.value = '123413413134134xxx'
        } else {
          this.formModels.wechatNo.value = ''
        }
      },
      nextStep () {
        this.$emit('nextStep', this.baseInfo)
        /**
         let params = this.__plan(this.formModels)
         console.log('params', this.formModels, params)
         this.axios.post(SAVE_APPLICANT_INFO, params).then(res => {
          let result = res.data
          if (result.success) {
            alert('保存成功')
          } else {
            if (result.errorMsg) {
              this.__toast(result.errorMsg)
            }
          }
        })
         */
        /**
         //        if (!this.isValid) {
//          this.__toast(this.formErrors[0].msg)
//        } else {
//          if (this.validIdCardBirthdaySex()) {
//            this.axios.post(ENROLL_SUBMMIT, {baseInfo: Object.values(this.form), ...this.options}).then(res => {
//              let result = res.data
//              if (result.success) {
//                window.name = JSON.stringify({uid: result.value.id})
//                this.$router.push({name: 'registerResume', query: {id: result.value.id}})
//              } else {
//                if (result.errorMsg) {
//                  this.__toast(result.errorMsg)
//                }
//              }
//            })
//          }
//        }
         */
      }
      /**
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
        this.axios.all([this.getBackendData(), this.getBank()]).then(res => {
          let serverData = res[0].data
          let bankData = res[1].data
          this.$nextTick(() => {
            if (serverData.success) {
              this.formModels = this.__patch(serverData.value)
            } else {
              this.__toast(serverData.value.errorMsg)
            }
            if (bankData.success) {
              this.getDictFromBackend(bankData.value.core_bank_code, 'bank')
            } else {
              this.__toast(bankData.value.errorMsg)
            }
          })
        })
      },
       // 获取后台数据
       getBackendData () {
        return this.axios.post(ENROLL_INTERSET, this.options)
      },
       // 获取银行字典数据
       getBank () {
        return this.axios.get(QUERY_DICT, {params: {dictionarys: 'core_bank_code'}})
      },
       // 数据转义，将后台接口返回数据转换成前端可用的数据
       getDictFromBackend (arr, formRulesKey) {
        let temp = []
        arr.map(item => {
          temp.push(item.name)
        })
        this.formRules[formRulesKey].rules.options = [temp]
      },
       setIdCardInfo (val) {
        let year = val.split('').splice(6, 4).join('')
        let month = val.split('').splice(10, 2).join('')
        let day = val.split('').splice(12, 2).join('')
        let birthdayFromIdCard = [year, month, day].join('-')
        let sexFromIdCard = val.split('').splice(16, 1).join('')
        let sexFlag = sexFromIdCard % 2 === 0 ? 'F' : 'M'
        this.formModels.birthday.value = birthdayFromIdCard
        this.formModels.sex.value = sexFlag
        // this.formRules.idCardNo.rules.disabled = true
      }
       */
    }
    /**
     watch: {
      'form.idCardNo': {
        deep: true,
        handler () {
          let idCardNoValid = this.formErrors.find(item => (item.name === 'idCardNo' && item.isValid === false))
          if (idCardNoValid === undefined && this.formModels.idCardNo.value) {
            this.setIdCardInfo(this.form.idCardNo.value)
          }
        }
      },
      'form.nationality': {
        deep: true,
        handler (v) {
          if (v && v.value && v.value.indexOf('族') === -1) {
            this.formModels.nationality.value = v.value + '族'
          }
        }
      }
    }
     */
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .page_insurance-applicant-info {
    @include fullpage;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .tab {
      background: #fff;
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      height: rem-calc(50);
      line-height: rem-calc(50);
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: rem-calc(16);
      .applicant {
        margin: 0 rem-calc(15);
        flex: 1;
        border-bottom: 2px solid #20aee5;
      }
      .insured {
        flex: 1;
        color: #999;
      }
    }
    .form {
      margin: 0 0 rem-calc(50) 0;
    }
    .tips-bg {
      background: #F7F7F7;
      padding: rem-calc(15) 0 rem-calc(30) 0;
    }
    .tips-wrapper {
      height: auto;
      background: #fff;
      padding: rem-calc(15) rem-calc(15) rem-calc(20) rem-calc(15);
    }
    .tips {
      /*padding: rem-calc(15) rem-calc(15) rem-calc(15) 0;*/
      padding-bottom: rem-calc(15);
      display: flex;
      span {
        font-size: rem-calc(14);
        color: #666666;
        line-height: 1.5;
        a, a:visited {
          text-decoration: none;
          color: #485BBA;
        }
      }
      .icon {
        display: inline-block;
        background-color: #fff;
        min-width: rem-calc(16);
        height: rem-calc(15);
        line-height: rem-calc(15);
        text-align: center;
        border-radius: rem-calc(2);
        margin-top: rem-calc(2);
        margin-right: rem-calc(10);
        border: 1px solid #ddd;
        box-sizing: border-box;
        &:before {
          content: ' ';
          display: block;
          width: rem-calc(16);
          height: rem-calc(8);
          transform: rotate(-45deg) scale(.8);
        }
        &.active {
          background-color: #485BBA;
          border: 0;
          &:before {
            content: ' ';
            display: block;
            border-bottom: 2px solid #ffffff;
            border-left: 2px solid #ffffff;
            width: rem-calc(15);
            height: rem-calc(8);
            transform: rotate(-45deg) scale(.8);
          }
        }
      }
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
      font-size: rem-calc(15);
      border-top: 1px solid #e9e9e9;
      .pre-step {
        flex: 3;
        color: #666;
        background: #fff;
        span {
          color: #FE1641;
        }
        label {
          font-size: rem-calc(12);
          color: #FE1641;
        }
      }
      .next-step {
        flex: 2;
        background: #485BBA;
        color: #fff;
      }
    }
  }

</style>
