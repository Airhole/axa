<template>
  <div class="page_applicant-info">
    <!-- 投被保人信息 -->
    <div class="form">
      <form-unit
        :formModels="formModels"
        :formRules="formRules"
        @formChange="onChange">
      </form-unit>
      <!-- 主、附险信息 -->
      <insurance-info
        :insureList="insureList"
        @formChange="onUnitChange">
      </insurance-info>
      <!-- 主、附险信息 -->
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
  import insuranceInfo from './import-client-insure-info'
  import epMixin from '@/components/mixins/enroll-page-mixin'
  import {MAKE_PLAN} from '@/api'
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
      insuranceInfo,
      defaultBtn
    },
    mixins: [epMixin],
    data () {
      return {
        formModels: formModels,
        formRules: formRules,
        insureList: [],
        formGroup: {},
        formGroupErrors: {},
        formGroupStatus: 'empty',
        options: {
          editStep: '1'
        }
      }
    },
    computed: {
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.getData()
        // 暂时假数据
        setTimeout(() => {
          this.insureList = [{
            "name": "横琴优健人生终身重大疾病保险",
            "abbrName": "优健人生",
            "paramList": [{
              "inputType": "select",
              "label": "交费期间",
              "key": "pay",
              "itemList": [{
                "key": "term_30",
                "value": "30年期"
              }],
              "value": "term_20",
              "canEdit": true
            }, {
              "inputType": "select",
              "label": "交费频次",
              "key": "pay_freq",
              "itemList": [{
                "key": "single",
                "value": "一次交清"
              }],
              "value": "year",
              "canEdit": true
            }, {
              "inputType": "select",
              "label": "保险期间",
              "key": "insure",
              "itemList": [{
                "key": "to_full",
                "value": "终身"
              }],
              "value": "to_full",
              "canEdit": true
            }, {
              "inputType": "input",
              "label": "保险金额",
              "key": "amount",
              "itemList": null,
              "value": "",
              "canEdit": true
            }],
            "premium": null,
            "amount": null,
            "payDesc": "20年期",
            "insureDesc": "终身"
          }]
        }, 1000)
      },
      onUnitChange (val) {
        this.formGroupErrors = val.msg
        this.formGroupStatus = val.status
        this.formGroup = val.value
      },
      nextStep () {
        let appInfo = Object.values(this.form)
        let insureInfo = Object.values(this.formGroup).map(i => Object.values(i))
        console.log('appinfo:::', appInfo)
        console.log('insureInfo:::', insureInfo)
        if (this.formStatus === 'dirty') {
          this.__toast(this.formErrors[0].msg)
        } else if (this.formGroupStatus === 'dirty') {
          this.__toast(this.formGroupErrors)
        } else if ((this.formStatus === 'valid' && this.formGroupStatus === 'valid') || (this.formStatus === 'empty' && this.formGroupStatus === 'valid') || (this.formStatus === 'valid' && this.formGroupStatus === 'empty') || (this.formStatus === 'empty' && this.formGroupStatus === 'empty')) {
          this.Submit()
        }
        this.$router.push({name: 'product_demo'})
      },
      Submit () {
        alert('提交成功！')
      },
      getData () {
        this.axios.get(MAKE_PLAN).then((response) => {
          console.log(response)
        }, (response) => {
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
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
