<template>
  <div class="page_applicant-info">
    <!-- 主、附险信息 -->
    <div class="form">
      <template v-for="(insItem, index) in $insureList" v-if="insItem.inputType">
        <insurance-unit
          :insItem="insItem"
          @formChange="onChange">
        </insurance-unit>
      </template>
    </div>
    <!-- 主、附险信息 -->
  </div>
</template>

<script>
  import insuranceUnit from '@/components/unit/insurance-unit'
  import epMixin from '@/components/mixins/enroll-page-mixin'
  //  import {ENROLL_SUBMMIT, ENROLL_INTERSET, QUERY_DICT} from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  export default {
    name: 'insurance-info',
    components: {
      insuranceUnit,
      defaultBtn
    },
    mixins: [epMixin],
    props: ['insureList'],
    computed: {
      $insureList: {
        get () {
          if (!this.insureList || this.insureList.length == 0) {
            return []
          }
        }
      }
    },
    data () {
      return {
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
