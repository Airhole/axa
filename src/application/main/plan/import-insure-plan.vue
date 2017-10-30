<template>
  <div class="page_applicant-info">
    <!-- 投被保人信息 -->
    <div class="form">
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
  import insuranceInfo from './import-client-insure-info'
  import {MAKE_PLAN} from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  const ENROLL_SUBMMIT = ''
  const ENROLL_INTERSET = ''
  const QUERY_DICT = ''
  export default {
    name: 'baseInfo',
    components: {
      insuranceInfo,
      defaultBtn
    },
    data () {
      return {
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
      },
      onUnitChange (val) {
        console.log('onUnitChange', val)
        this.formGroupErrors = val.msg
        this.formGroupStatus = val.status
        this.formGroup = val.value
      },
      nextStep () {
        let insureInfo = Object.values(this.formGroup).map(i => Object.values(i))
        if (this.formGroupStatus === 'dirty') {
          this.__toast(this.formGroupErrors)
        } else if (this.formGroupStatus === 'valid') {
          this.Submit()
        }
      },
      Submit () {
        alert('提交成功！')
      },
      getData () {
        // this.axios.get(MAKE_PLAN).then((response) => {
        //   console.log(response)
        // }, (response) => {
        // }).catch((err) => {
        //   console.log(err)
        //   throw new Error(err)
        // })
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
