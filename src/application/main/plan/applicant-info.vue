<!--********************************************************************
 * Author        : rickyshin
 * Filename      : applicant-info.vue
 * Description   : 计划书-投保人信息
 * Time          : 2017/10/24
 *
********************************************************************-->
<template>
  <div class="page_plan-applicant-info">
    <div class="tab">
      <div class="applicant">
        投保人信息
      </div>
      <div class="insured">
        被保人信息
      </div>
    </div>
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
      <div class="pre-step">上一步</div>
      <div class="next-step" @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
  import formUnit from '@/components/unit/form-unit'
  import epMixin from '@/components/mixins/enroll-page-mixin'
//  import {ENROLL_SUBMMIT, ENROLL_INTERSET, QUERY_DICT} from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  // models
  import formModels from './models/applicant-info-model'
  import formRules from './models/applicant-info-rule'

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
        this.$router.push({name: 'plan_insured_info'})
        if (!this.isValid) {
          this.__toast(this.formErrors[0].msg)
        } else {
          if (this.validIdCardBirthdaySex()) {
            this.axios.post(ENROLL_SUBMMIT, {baseInfo: Object.values(this.form), ...this.options}).then(res => {
              let result = res.data
              if (result.success) {
                window.name = JSON.stringify({uid: result.value.id})
                this.$router.push({name: 'registerResume', query: {id: result.value.id}})
              } else {
                if (result.errorMsg) {
                  this.__toast(result.errorMsg)
                }
              }
            })
          }
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
    },
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
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .page_plan-applicant-info {
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
      margin: rem-calc(50) 0 rem-calc(50) 0;
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
        flex: 1;
        color: #20aee5;
        background: #fff;
      }
      .next-step {
        flex: 1;
        background: #20aee5;
        color: #fff;
      }
    }
  }

</style>
