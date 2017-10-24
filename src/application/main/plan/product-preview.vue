<!--********************************************************************
 * Author        : rickyshin
 * Filename      : product-preview.vue
 * Description   : 计划书-产品预览
 * Time          : 2017/10/24
 *
********************************************************************-->
<template>
  <div class="page_plan-product-preview">
    <div class="content">
      <div class="img-wrapper">
        <img src="~@/assets/image/product-preview.jpg" alt="">

      </div>
      <div class="btn-wrapper">
        <div class="btn">亲启</div>
        <div class="detail">
          <p class="detail-title">敬呈 &nbsp;<span>xxx</span>&nbsp;女士</p>
          <p>以下是为你定制的定期寿险保障计划</p>
          <p>请您查阅</p>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import defaultBtn from '@/components/base/default-btn.vue'
  export default {
    data () {
      return {
      }
    },
    methods: {
      makePlan () {
      }
    },
    created () {
    },
    props: {
    },
    components: {
      defaultBtn
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .page_plan-product-preview {
    @include fullpage;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .content {
      /*width: 100%;*/
      z-index: -1;
      height: 100%;
      background: #B0D5F7;
    }
    .img-wrapper {
      z-index: 2;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        z-index: 2;
        margin-top: rem-calc(25);
        width: rem-calc(300);
        box-shadow: 3px 4px 5px grey;
      }
    }
    .btn-wrapper {
      z-index: 1;
      background: #fff;
      margin-top: rem-calc(-20);
      text-align: center;
      height: 100%;
      width: 100%;
      .btn {
        z-index: 3;
        position: absolute;
        left: 0;
        right: 0;
        top: rem-calc(240);
        bottom: 0;
        margin: auto;
        width: rem-calc(100);
        height: rem-calc(100);
        line-height: rem-calc(100);
        border-radius: 50%;
        border: 4px solid #e5e5e5;
        background: #00a4ff;
        color: #fff;
        font-size: rem-calc(18px);
      }
      .detail {
        padding-top: rem-calc(120);
        font-size: rem-calc(14);
        .detail-title {
          padding-bottom: rem-calc(16);
        }
        p {
          line-height: 2.4;
        }
      }
    }
  }
</style>
