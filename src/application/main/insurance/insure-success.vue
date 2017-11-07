
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
      <div class="img-wrapper">
        <img src="~@/assets/image/success-icon.png" />
      </div>
      <div>投保成功</div>
      <div>您已成功購買：非步步保</div>
    </div>
    <div class="success-content">
        <div class="item">
          <span>保單號：</span>
          <span>220084145758097</span>
        </div>
        <div class="item">
          <span>被保險人：</span>
          <span>220084145758097</span>
        </div>
        <div class="item">
          <span>生效日期：</span>
          <span>2017/12/20</span>
        </div>
        <div class="item">
          <span>保單期間：</span>
          <span>2017/10/20 - 2017/11/26</span>
        </div>
        <div class="item">
          <span>繳費期間：</span>
          <span>一筆過繳付保費</span>
        </div>
        <div class="item">
          <span>保單金額：</span>
          <span>10萬元</span>
        </div>
        <div class="item">
          <span>首期保費：</span>
          <span>0.00</span>
        </div>
    </div>
    <div class="footer">
      <div>溫馨提示：</div>
      <p>電子保單將發送到投保人郵箱：wangxiaoming@163.com</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'insure-success',
    data: () => {
      return {

      }
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
        img {
          width: 100%;
          height: 100%;
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
