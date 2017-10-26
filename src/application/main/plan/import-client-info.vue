<template>
  <div class="page_applicant-info">
    <!-- 投被保人信息 -->
    <div class="form">
      <form-unit
        :formModels="formModels"
        :formRules="formRules"
        @formChange="onChange">
      </form-unit>
    </div>
    <!-- 投被保人信息 -->
    <!-- 主、附险信息 -->
    <div class="form">
      <insurance-info
        :insureList="insureList"
        @formChange="onChange">
      </insurance-info>
    </div>
    <!-- 主、附险信息 -->
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
      window.info = this
      return {
        formModels: formModels,
        formRules: formRules,
        insureList: [],
        options: {
          editStep: '1'
        }
      }
    },
    computed: {

    },
    methods: {
      init () {
        this.getData()
      },
      nextStep () {
        if (!this.isValid) {
          this.__toast(this.formErrors[0].msg)
        } else {
          this.__toast('提交成功！')
        }
      },
      getData () {
        this.axios.get(MAKE_PLAN(true)).then((response) => {
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
