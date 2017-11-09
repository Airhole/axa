<!--********************************************************************
 * Author        : rickyshin
 * Filename      : applicant-info.vue
 * Description   : 在线投保-投保人信息
 * Time          : 2017/10/25
 *
********************************************************************-->
<template>
  <div class="page_product_detail">
    <div class="form" ref="preview_form">
      <nav>
        <div class="desc">
          步步保/首月免費
        </div>
      </nav>
      <form-unit
        :formModels="formModels"
        :formRules="formRules"
        @formChange="onChange"
        @emission="onEmission">
      </form-unit>
      <div class="calc-insured">
        <default-btn val="試算保費"></default-btn>
        <div class="insured-fee">
          <label>合計保費：</label>
          <span>300.00</span>
          港元
        </div>
        <div class="divider"></div>
      </div>
      <tab :animate="false" :line-width="2" :defaultColor="'#333'" :active-color="'#485BBA'" v-model="tabIndex">
        <tab-item @on-item-click="tabChange" selected>產品介紹</tab-item>
        <tab-item @on-item-click="tabChange">保險責任</tab-item>
        <tab-item @on-item-click="tabChange">保險案例</tab-item>
        <tab-item @on-item-click="tabChange">理賠流程</tab-item>
      </tab>
      <div id="product_intro">
        <ul>
          <li>產品介紹</li>
          <li>產品介紹</li>
          <li>產品介紹</li>
          <li>產品介紹</li>
          <li>產品介紹</li>
          <li>產品介紹</li>
        </ul>
      </div>
      <div id="insured_liability">
        <ul>
          <li>保險責任</li>
          <li>保險責任</li>
          <li>保險責任</li>
          <li>保險責任</li>
          <li>保險責任</li>
          <li>保險責任</li>
        </ul>
      </div>
      <div>
        <ul id="insured_case">
          <li>保險案例</li>
          <li>保險案例</li>
          <li>保險案例</li>
          <li>保險案例</li>
          <li>保險案例</li>
          <li>保險案例</li>
        </ul>
      </div>
      <div>
        <ul id="claim_flow">
          <li>理賠流程</li>
          <li>理賠流程</li>
          <li>理賠流程</li>
          <li>理賠流程</li>
          <li>理賠流程</li>
          <li>理賠流程</li>
        </ul>
      </div>
    </div>
    <div class="btn-wrapper">
      <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
      <div class="btn-wrapper">
        <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
        <div class="pre-step">
          <span>
            <i :style="{backgroundImage: 'url(' + iconUrl + ')'}"></i>
            眾安
          </span>
          <span>
            <i></i>
            微店
          </span>
          <span>
            <i></i>
            電話
          </span>
        </div>
        <div class="next-step" @click="nextStep">立即投保</div>
      </div>
    </div>
  </div>
</template>

<script>
  import formUnit from '@/components/unit/form-unit'
  import {Tab, TabItem} from 'vux'
  import { READ_APPLICANT_INFO, SAVE_APPLICANT_INFO, INSURE_LOAD_OR_CREATE_PLAN, CREATE_INSURE } from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  // models
  import formModels from './models/product-detail-model'
  import formRules from './models/product-detail-rule'

  export default {
    name: 'baseInfo',
    components: {
      formUnit,
      defaultBtn,
      Tab,
      TabItem
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
        selected: false,
        tabIndex: 0,
        iconUrl: ''
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
      tabChange: function () {
        let id = ''
        switch (this.tabIndex) {
        case 0:
          id = '#product_intro'
          break
        case 1:
          id = '#insured_liability'
          break
        case 2:
          id = '#insured_case'
          break
        case 3:
          id = '#claim_flow'
          break
        default:
          break
        }
        let offsetTop = this.$el.querySelector(id).offsetTop
        this.$refs.preview_form.scrollTop = offsetTop
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
        // this.$emit('nextStep', this.baseInfo)
        this.$router.push({path: "/announcement", query: {userId: this.userId}})
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

  .page_product_detail {
    @include fullpage;
    overflow: hidden;
    overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
    nav {
      height: rem-calc(200);
      display: flex;
      align-items: flex-end;
      .desc {
        line-height: rem-calc(40);
        width: 100%;
        background: #000;
        opacity: 0.4;
        font-size: rem-calc(14);
        color: #fff;
        padding-left: rem-calc(15);
      }
    }
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
        border-bottom: 2px solid #485BBA;
      }
      .insured {
        flex: 1;
        color: #999;
      }
    }
    .form {
      margin: 0 0 rem-calc(50) 0;
      position: absolute;
      top: 0;
      left:0;
      right: 0;
      bottom:0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .calc-insured {
        padding: rem-calc(15) 0 0 0;
        /deep/ {
          .blue-btn {
            background-color: #485BBA;
          }
        }
      }
      .insured-fee {
        background-color: #fff;
        padding: rem-calc(20) rem-calc(15) rem-calc(26) 0;
        height: rem-calc(25);
        text-align: right;
        font-size: rem-calc(15);
        label {
          font-weight: bold;
        }
        span {
          color: #FB0A32;
          font-size: rem-calc(24);
          vertical-align: text-bottom;
        }
      }
      .divider {
        height: rem-calc(20);
        background-color: #f7f7f7;
      }
    }

    .btn-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: rem-calc(25) 0 0 0;
      display: flex;
      line-height: rem-calc(30);
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: rem-calc(15);
      // border-top: 1px solid #e9e9e9;
      background-color: #fff;
      .pre-step {
        flex: 1;
        display: flex;
        border-top: 1px solid #e9e9e9;
        span {
          flex: 1;
          border-right: 1px solid #e6e6e6;
          font-size: rem-calc(10);
          position: relative;
          padding-top: rem-calc(20);
          i {
            position: absolute;
            left: 50%;
            top: rem-calc(8);
            background-size: 100%;
            background-repeat: no-repeat;
            margin-left: rem-calc(-10);
          }
        }
        span:nth-child(1) {
          i {
            width: rem-calc(20);
            height: rem-calc(20);
            background-image: url("~@/assets/image/shop_03.png");
          }
        }
        span:nth-child(2) {
          i {
            width: rem-calc(21);
            height: rem-calc(18);
            background-image: url("~@/assets/image/shop_03.png");
          }
        }
        span:last-child {
          border: none;
          i {
            width: rem-calc(20);
            height: rem-calc(20);
            background-image: url("~@/assets/image/phone_06.png");
          }
        }
      }
      .next-step {
        padding: rem-calc(10) 0;
        flex: 1;
        background: #485BBA;
        color: #fff;
        border-top: 1px solid #485BBA;
      }
    }
  }

</style>
