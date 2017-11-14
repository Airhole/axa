
<!--********************************************************************
 * Author			: zhouzhe
 * Email			:
 * Last modified	: 2017-11-06
 * Filename			: insure-success.vue
 * Description		:  投保成功

********************************************************************-->

<template>
  <div class="insure-success">
    <div class="success-header">
      <div class="img-wrapper" :class="{'success': status}">
        <div class="img_icon"></div>
      </div>
      <div>{{ status? $t('insureSuccess') : $t('insureFail') }}</div>
      <div>{{ $t('insureTips', {"type": '非步步保'}) }}</div>
    </div>
    <div class="success-content">
        <div class="item">
          <span>{{ $t('insureNum') }}</span>
          <span>{{ result.insureNum }}</span>
        </div>
        <div class="item">
          <span>{{ $t('insurant') }}</span>
          <span>{{ result.insurant }}</span>
        </div>
        <div class="item">
          <span>{{ $t('brithday') }}</span>
          <span>{{ result.brithday }}</span>
        </div>
        <div class="item">
          <span>{{ $t('insureTime') }}</span>
          <span>{{ result.insureTime }}</span>
        </div>
        <div class="item">
          <span>{{ $t('payTime') }}</span>
          <span>{{ result.payTime }}</span>
        </div>
        <div class="item">
          <span>{{ $t('insureMoney')}}</span>
          <span>{{ result.insureMoney }}</span>
        </div>
        <div class="item">
          <span>{{ $t('firstPay') }}</span>
          <span>{{ result.firstPay }}</span>
        </div>
    </div>
    <div class="footer">
      <div>{{ $t('insureWarn') }}</div>
      <p>{{ $t('insureEmail', {"email" : result.email})}}</p>
    </div>
  </div>
</template>

<script>
import { INSURE_RESULT } from '@/api'
export default {
  name: 'insure-success',
  data: () => {
    return {
      status: false,
      result: {}
    }
  },
  created: function () {
    this.axios.post(INSURE_RESULT).then(response => {
      this.result = response.data.data
      this.status = response.data.data.insureStatus
      this.isLoading = false
    }).catch(err => {
      console.log(err)
      throw new Error(err)
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .insure-success {
    .success-header {
      text-align: center;
      border-bottom: 1px solid #e6e6e6;
      padding-top: rem-calc(60px);
      padding-bottom: rem-calc(31px);
      margin: 0 rem-calc(25px);
      .img-wrapper {
        width: rem-calc(57px);
        height: rem-calc(57px);
        display: inline-block;
        & > .img_icon {
          width: 100%;
          height: 100%;
          background: url('~@/assets/image/fail-icon.png') no-repeat;
          background-size:100% 100%;
        }
        &.success > .img_icon{
          width: 100%;
          height: 100%;
          background: url('~@/assets/image/success-icon.png') no-repeat;
          background-size:100% 100%;
        }
      }
      > div:nth-child(2) {
        font-weight: 700;
        color: #333333;
        font-size: rem-calc(18px);
        margin-top: rem-calc(18px);
        margin-bottom: rem-calc(10px);
      }
      > div:nth-child(3) {
        color: #666666;
        font-size: rem-calc(13px);
      }
    }
    .success-content {
      margin-left: rem-calc(25px);
      .item {
        padding: rem-calc(16px) 0;
        display: flex;
        span:nth-child(1) {
          color: #999999;
          font-size: rem-calc(14px);
          flex: 1;
        }
        span:nth-child(2) {
          flex: 3;
          color: #666666;
          font-size: rem-calc(14px);
        }
      }
    }
    .footer {
      margin-left: rem-calc(25px);
      color: #475ab9;
      font-size: rem-calc(13px);
      line-height: 1.5;
    }
  }

</style>
