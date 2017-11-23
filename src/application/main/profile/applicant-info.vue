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
        :formModels="applicantFormModels"
        :formRules="applicantFormRules"
        @formChange="onApplicantChange"
        @emission="onApplicantEmission">
      </form-unit>
      <form-unit
        :formModels="insurantFormModels"
        :formRules="insurantFormRules"
        @formChange="onInsurantChange"
        @emission="onInsurantEmission">
      </form-unit>
      <insurance-info
        :insureList="insureList"
        @formChange="onUnitChange">
      </insurance-info>

      <div class="tips-bg">
        <div class="tips-wrapper">
          <div class="tips">
            <span class="icon" :class="{active: selected}" @click="changeAgreement"></span>
            <span class="view">{{ $t('view1') }}
            <a href="#">{{ $t('termsOfUse') }}</a>、
            <a href="#">{{ $t('declaration') }}</a>、
            <a href="#">{{ $t('policyWording') }}</a>、
            <a href="#">{{ $t('condition') }}</a>
            <a href="#">{{ $t('privacyPolicy') }}</a>
            {{ $t('view2') }}
            <a href="#">{{ $t('personalInformation1') }}</a>
          </span>
            <input class="hiddenInput" type="hidden" name="clause" v-validate
                   :data-vv-as="$t('view3')" data-vv-rules="required">
          </div>
          <div class="tips">
            <span class="icon" :class="{active: selected}" @click="changeAgreement"></span>
            <span class="view">
            {{ $t('view4') }}
            <a href="#">{{ $t('personalInformation2') }}</a>
            {{ $t('view5') }}。
          </span>
            <input class="hiddenInput" type="hidden" name="clause" v-validate
                   :data-vv-as="$t('view6')" data-vv-rules="required">
          </div>
        </div>
      </div>
    </div>

    <div class="btn-wrapper">
      <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
      <div class="btn-wrapper">
        <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
        <div class="pre-step">{{ $t('payText1') }}<span>{{firstPremium}}&nbsp;</span><em>{{ $t('payText2') }}</em><label>{{ $t('payText3') }}</label></div>
        <div class="next-step" @click="nextStep">{{ $t('immediateInsure') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import insuranceInfo from './import-client-insure-info'
  import formUnit from '@/components/unit/form-unit'
  //  import epMixin from '@/components/mixins/enroll-page-mixin'
  import { READ_APPLICANT_INFO, SAVE_APPLICANT_INFO, INSURE_LOAD_OR_CREATE_PLAN, CREATE_INSURE, CALC_INSURANCE_FEE } from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  // models
  import applicantFormModels from './models/applicant-info-model'
  import applicantFormRules from './models/applicant-info-rule'
  import insurantFormModels from './models/insurant-info-model'
  import insurantFormRules from './models/insurant-info-rule'

  export default {
    name: 'baseInfo',
    components: {
      formUnit,
      defaultBtn,
      insuranceInfo
    },
    // mixins: [epMixin],
    data () {
      return {
        applicantFormModels: this.__clone(applicantFormModels),
        applicantFormRules: this.__clone(applicantFormRules),
        insurantFormModels: this.__clone(insurantFormModels),
        insurantFormRules: this.__clone(insurantFormRules),
        baseInfo: {},
        selected: false,
        firstPremium: '',
        insureList: []
      }
    },
    methods: {
      init () {
        this.axios.post(READ_APPLICANT_INFO, {'a': 'test'}).then(res => {
          console.log('res', res)
          if (res.data.status) {
            let result = res.data.data
            this.applicantFormModels = this.__fixInputName(result.applicant)
            console.log('res.data.data', result.commodityList)
            this.insurantFormModels = this.__fixInputName(result.insurant)
            this.insureList = result.commodityList
          }
        })
      },
      changeAgreement () {
      },
      onUnitChange (val) {
        console.log('onUnitChange', val)
        this.formGroupErrors = val.msg
        this.formGroupStatus = val.status
        this.formGroup = val.value
        let outputData = this.__recapOutputName(this.__plan(val.value[0]))
        console.log('outputData', outputData)
        let editProperty = {
          amount: outputData.amount,
          insure: outputData.insure.value,
          pay: outputData.pay.value,
          pay_freq: outputData.pay_freq.value
        }
        console.log(JSON.stringify(editProperty))
        let params = {
          planId: this.planId,
          editProperty: Object.assign(editProperty, {commodityId: this.commodityId})
        }
        this.calcInsuranceFee(params)
        console.log('params', params)
      },
//      loadApplicant (insureId) {
//        this.axios.post(READ_APPLICANT_INFO, {insureId: insureId}).then(res => {
//          let result = res.data.value
//          this.formModels = this.__fixInputName(res.data.value)
//          this.baseInfo = {
//            insureId: result.insureId,
//            customerId: result.customerId,
//            customerType: result.customerType,
//            planId: result.planId
//          }s
//        })
//      },
      onApplicantChange (v) {
//        console.log('this.formModels++++', v, this.__str(this.__recapOutputName(this.__plan(v.value))))
//        this.__recapOutputName(this.__plan(v.value))
//        this.$emit('onChange', v)
      },
      onInsurantChange (v) {
//        console.log('this.insurantFormModels++++', v, JSON.stringify(this.__plan(v.value)))
        this.__recapOutputName(this.__plan(v.value))
//        this.$emit('onChange', v)
      },
      onApplicantEmission (v) {
        // console.log('eeeeeee', v)
        if (v.value === true) {
          this.formModels.wechatNo.value = '123413413134134xxx'
        } else {
          this.formModels.wechatNo.value = ''
        }
      },
      onInsurantEmission (v) {
        // console.log('eeeeeee', v)
        if (v.value === true) {
          this.formModels.wechatNo.value = '123413413134134xxx'
        } else {
          this.formModels.wechatNo.value = ''
        }
      },
      calcInsuranceFee (params) {
        this.axios.post(CALC_INSURANCE_FEE, params).then((res) => {
          console.log(res)
          if (res.data.status) {
            let result = res.data.data
            this.insureList = result.commodityList
            this.firstPremium = result.firstPremium
          }
        }, (response) => {
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
      },
      nextStep () {
        alert('ffff')
        // this.$emit('nextStep', this.baseInfo)
        this.$router.push({path: "/result", query: {userId: this.userId}})
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
    // overflow: hidden;
    // overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
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
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      margin: 0 0 rem-calc(60) 0;
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
      height: rem-calc(50);
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: rem-calc(15);
      // border-top: 1px solid #e9e9e9;
      .pre-step {
        padding-left: rem-calc(15);
        text-align: left;
        flex: 4;
        color: #666;
        background: #fff;
        border-top: 1px solid #e9e9e9;
        span {
          color: #FE1641;
          padding: 0 rem-calc(5);
        }
        em {
          font-style: normal;
          font-size: rem-calc(14);
        }
        label {
          font-size: rem-calc(12);
          color: #999;
          padding-left: rem-calc(3);
        }
      }
      .next-step {
        flex: 2;
        background: #485BBA;
        color: #fff;
        border-top: 1px solid #485BBA;
        box-sizing: border-box;
      }
    }
  }

</style>
